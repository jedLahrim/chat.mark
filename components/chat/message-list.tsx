"use client";

import {useEffect, useRef} from "react";
import {Message} from "@/types";
import {MessageItem} from "./message-item";
import {useInView} from "react-intersection-observer";
import {FilePreview} from "./file-preview";

interface MessageListProps {
    messages: Message[];
    isLoading?: boolean;
    loadingMessage?: Message;
    uploadedFile?: File | null;
}

export function MessageList({
                                messages,
                                isLoading = false,
                                loadingMessage,
                                uploadedFile
                            }: MessageListProps) {
    const {ref, inView} = useInView();
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto" ref={containerRef}>
            <div className="container mx-auto max-w-3xl px-4 py-4 space-y-4">
                {messages.map((message, index) => (
                    <div key={message.id} className="space-y-2">
                        <MessageItem message={message}/>
                        {message.file && (
                            <FilePreview
                                file={message.file}
                                onRemove={() => {
                                    // Handle file removal if needed
                                    const updatedMessages = [...messages];
                                    updatedMessages[index].file = undefined;
                                    // You would need a way to update the messages state here
                                    // Maybe pass a callback prop to handle this
                                }}
                            />
                        )}
                    </div>
                ))}
                {isLoading && loadingMessage && (
                    <MessageItem message={loadingMessage}/>
                )}
            </div>
            <div ref={ref}/>
        </div>
    );
}
