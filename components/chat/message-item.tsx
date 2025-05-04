"use client";

import {cn} from "@/lib/utils";
import {Message} from "@/types";
import ReactMarkdown from "react-markdown";
import {Sparkles, User} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import {useEffect} from "react";

interface MessageItemProps {
    message: Message;
    isLoading?: boolean;
}

export function MessageItem({message, isLoading = false}: MessageItemProps) {
    useEffect(() => {
        Prism.highlightAll();
    }, [message]);

    return (
        <div
            className={cn(
                "group relative py-6 first:pt-0 transition-opacity",
                message.role === "assistant" ? "bg-muted/50" : "bg-background",
                isLoading && "opacity-50"
            )}
        >
            <div className="container mx-auto flex max-w-3xl gap-4 px-4">
                <div className="flex flex-col items-center mt-1">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback
                            className={cn(
                                message.role === "assistant"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                            )}
                        >
                            {message.role === "assistant" ? (
                                <Sparkles className="h-4 w-4"/>
                            ) : (
                                <User className="h-4 w-4"/>
                            )}
                        </AvatarFallback>
                        <AvatarImage
                            src={message.role === "user" ? "/user-avatar.png" : "/assistant-avatar.png"}
                            alt={message.role === "user" ? "User" : "Assistant"}
                        />
                    </Avatar>
                </div>
                <div className="flex-1 space-y-2 overflow-hidden">
                    <div className="text-sm font-medium leading-none">
                        {message.role === "user" ? "You" : "Mark 2"}
                    </div>
                    <div className="prose dark:prose-invert max-w-none break-words">
                        <ReactMarkdown
                            className="markdown-content"
                            components={{
                                pre: ({node, ...props}) => (
                                    <pre className="p-4 rounded bg-muted overflow-x-auto" {...props} />
                                ),
                                code: ({node, inline, className, children, ...props}) => {
                                    const match = /language-(\w+)/.exec(className || "");
                                    if (inline) {
                                        return (
                                            <code className="px-1 py-0.5 rounded bg-muted text-sm font-mono" {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                    return (
                                        <code
                                            className={cn(match ? `language-${match[1]}` : "", "text-sm font-mono")}
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                },
                                table: ({children, ...props}) => (
                                    <div className="overflow-x-auto">
                                        <table className="border-collapse w-full" {...props}>
                                            {children}
                                        </table>
                                    </div>
                                ),
                                th: ({children, ...props}) => (
                                    <th className="border px-4 py-2 bg-muted text-left" {...props}>
                                        {children}
                                    </th>
                                ),
                                td: ({children, ...props}) => (
                                    <td className="border px-4 py-2" {...props}>
                                        {children}
                                    </td>
                                ),
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
