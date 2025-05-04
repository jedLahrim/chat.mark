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
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div ref={containerRef} className="flex-1 overflow-y-auto">
            <div className="flex flex-col divide-y">
                {messages.map((message, index) => (
                    <MessageItem
                        key={`${message.id || index}`}
                        message={message}
                    />
                ))}
                {uploadedFile && (
                    <div className="p-4">
                        <FilePreview file={uploadedFile}/>
                    </div>
                )}
                {isLoading && loadingMessage && (
                    <MessageItem
                        message={loadingMessage}
                        isLoading={true}
                    />
                )}
            </div>
            <div ref={ref} className="h-px"/>
        </div>
    );
}
