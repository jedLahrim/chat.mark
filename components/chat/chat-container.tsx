"use client";
import {useEffect, useRef, useState} from "react";
import {MessageList} from "./message-list";
import {InputArea} from "./input-area";
import {Message} from "@/types";
import {toast} from "sonner";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CircularAudioSpectrum} from "@/components/chat/circular-audio-spectrum";
import {Constant} from "@/app/common/constants/constant";

export function ChatContainer() {
    // const {data: session, status} = useSession();
    // const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState<Message | null>(null);
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Audio greeting states
    const [showGreeting, setShowGreeting] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // Determine which audio to play based on localStorage
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/");
    //     }
    // }, [status, router]);
    //
    // if (status === "loading") {
    //     return <div>Loading...</div>;
    // }
    //
    // if (!session) {
    //     return null;
    // }
    // Check for user interaction
    useEffect(() => {
        const handleInteraction = () => {
            setHasInteracted(true);
            // Remove all listeners after first interaction
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };

        // Set up event listeners
        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('scroll', handleInteraction);

        // Cleanup
        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };
    }, []);

    // Determine which audio to play based on visit history
    useEffect(() => {
        // Check if this is running in the browser (not during SSR)
        if (typeof window !== 'undefined') {
            const isFirstVisit = localStorage.getItem(Constant.FIRST_VISIT_KEY) === null;
            const lastGreetingTimestamp = localStorage.getItem(Constant.LAST_GREETING_TIMESTAMP_KEY);
            const currentTime = Date.now();

            // Determine if we should play any greeting
            let shouldPlayGreeting = false;
            let audioToPlay = null;

            if (isFirstVisit) {
                // First time user - play first visit greeting
                shouldPlayGreeting = true;
                audioToPlay = Constant.FIRST_VISIT_AUDIO_URL;

                // Mark first visit as completed
                localStorage.setItem(Constant.FIRST_VISIT_KEY, 'true');
                localStorage.setItem(Constant.LAST_GREETING_TIMESTAMP_KEY, currentTime.toString());
            } else if (!lastGreetingTimestamp || (currentTime - parseInt(lastGreetingTimestamp)) > Constant.TWELVE_HOURS) {
                // It's been more than 12 hours since last greeting - play recurring greeting
                shouldPlayGreeting = true;
                audioToPlay = Constant.RECURRING_AUDIO_URL;

                // Update last greeting timestamp
                localStorage.setItem(Constant.LAST_GREETING_TIMESTAMP_KEY, currentTime.toString());
            } else {
                // Less than 12 hours since last greeting - don't play anything
                shouldPlayGreeting = false;
                // setShowGreeting(false);
            }

            if (shouldPlayGreeting) {
                setAudioUrl(audioToPlay);
            }
        }
    }, []);

    // Initialize and play audio greeting if needed
    useEffect(() => {
        if (!hasInteracted || !audioUrl) return;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        const handlePlay = () => setIsPlaying(true);
        const handleEnd = () => {
            setIsPlaying(false);
            // Hide greeting animation a bit before audio ends
            setTimeout(() => setShowGreeting(false));
        };
        const handleError = (e: any) => {
            console.error('Audio error:', e);
            setIsPlaying(false);
            setShowGreeting(false);
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('ended', handleEnd);
        audio.addEventListener('error', handleError);

        // Play audio after short delay
        const playTimer = setTimeout(() => {
            audio.play().catch(e => {
                console.error('Audio playback failed:', e);
                setShowGreeting(false);
            });
        }, 500);

        // Auto-hide after 10 seconds (fallback)
        const hideTimer = setTimeout(() => {
            setShowGreeting(false);
        }, 10000);

        return () => {
            clearTimeout(playTimer);
            clearTimeout(hideTimer);
            audio.pause();
            audio.currentTime = 0;
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('ended', handleEnd);
            audio.removeEventListener('error', handleError);
        };
    }, [hasInteracted, audioUrl]);

    const handleCloseGreeting = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setShowGreeting(false);
    };

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    const handleSendMessage = (content: string): string | void => {
        if (messages.length >= 5) {
            setShowUpgradeDialog(true);
            return content; // Return the content so InputArea can keep it
        }

        if (isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content,
            createdAt: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setIsLoading(true);

        setLoadingMessage({
            role: "assistant",
            content: "Thinking...",
        });

        try {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `Thank you for your message about "${content}". Let me help you with that...`,
                createdAt: new Date(),
            };

            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        } catch (error) {
            toast.error("Failed to get response. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
            setLoadingMessage(null);
        }

        return ""; // Return empty string to clear input when successful
    };
    const handleFileUpload = (file: File) => {
        setUploadedFile(file);
        toast.success(`File uploaded: ${file.name}`);
    };

    const handleNewChat = () => {
        setMessages([]);
        setUploadedFile(null);
    };

    return (
        <div className="flex flex-col h-full relative">
            <MessageList
                messages={messages}
                isLoading={isLoading}
                loadingMessage={loadingMessage || undefined}
                uploadedFile={uploadedFile}
            />

            {/* Audio greeting animation - only shown if there's an audio to play */}
            {showGreeting && (
                <CircularAudioSpectrum
                    isPlaying={isPlaying}
                    audioElement={audioRef.current}
                    onClose={handleCloseGreeting}
                    size={280}
                />
            )}

            <div className="border-t mt-auto">
                <div className="container mx-auto max-w-3xl px-4 py-4">
                    <InputArea
                        onSend={handleSendMessage}
                        onUpload={handleFileUpload}
                        onNewChat={handleNewChat}
                        isLoading={isLoading}
                    />
                </div>
            </div>
            <div ref={bottomRef}/>

            <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upgrade to Pro</DialogTitle>
                        <DialogDescription>
                            Get unlimited messages, priority support, and advanced features.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="text-lg font-semibold">Pro Features:</div>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Unlimited messages</li>
                            <li>Advanced marketing strategies</li>
                            <li>Priority support</li>
                            <li>Custom templates</li>
                        </ul>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                                Maybe Later
                            </Button>
                            <Button onClick={() => {
                                toast.success("Redirecting to upgrade page...");
                                setShowUpgradeDialog(false);
                            }}>
                                Upgrade Now
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
