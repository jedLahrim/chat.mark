"use client";
import {useEffect, useRef, useState} from "react";
import {MessageList} from "./message-list";
import {InputArea} from "./input-area";
import {Message} from "@/types";
import {toast} from "sonner";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CircularAudioSpectrum} from "@/components/chat/circular-audio-spectrum"; // Import the circular audio spectrum

// Path to your greeting audio file (place this in your public folder)
const GREETING_AUDIO_URL = '/audio/welcome-greeting.mp3';

export function ChatContainer() {
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

    // Initialize and play audio greeting
    useEffect(() => {
        if (!hasInteracted) return;

        const audio = new Audio(GREETING_AUDIO_URL);
        audioRef.current = audio;

        const handlePlay = () => setIsPlaying(true);
        const handleEnd = () => {
            setIsPlaying(false);
            // Hide greeting animation a bit before audio ends
            setTimeout(() => setShowGreeting(false), 1000);
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
    }, [hasInteracted]);

    const handleCloseGreeting = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setShowGreeting(false);
    };

    // Show upgrade dialog after 5 messages
    useEffect(() => {
        if (messages.length >= 5) {
            setShowUpgradeDialog(true);
        }
    }, [messages]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    const handleSendMessage = async (content: string) => {
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

            {/* Audio greeting animation */}
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
