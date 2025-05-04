"use client";

import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Bot, Paperclip, Plus, Send} from "lucide-react";
import {SuggestionChips} from "./suggestion-chips";
import {cn} from "@/lib/utils";

interface InputAreaProps {
    onSend: (message: string) => string | void;
    onUpload?: (file: File) => void;
    onNewChat?: () => void;
    isLoading?: boolean;
    className?: string;
}

export function InputArea({
                              onSend,
                              onUpload,
                              onNewChat,
                              isLoading = false,
                              className,
                          }: InputAreaProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;
        const result = onSend(input);
        if (result !== undefined) {
            setInput(result as string);
        } else {
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onUpload) {
            onUpload(file);
        }
    };

    const handleSuggestionSelect = (suggestion: string) => {
        setInput(suggestion);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                200
            )}px`;
        }
    }, [input]);

    return (
        <div className={cn("pt-4", className)}>
            {!input && !isFocused && (
                <div className="mb-4 fade-in">
                    <SuggestionChips onSelect={handleSuggestionSelect}/>
                </div>
            )}
            <div className="relative">
                <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Ask about marketing strategies..."
                    className="pr-24 resize-none min-h-[60px] max-h-[200px] py-4"
                    disabled={isLoading}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    {onNewChat && (
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full"
                            onClick={onNewChat}
                            disabled={isLoading}
                        >
                            <Plus className="h-4 w-4"/>
                            <span className="sr-only">New Chat</span>
                        </Button>
                    )}
                    {!isLoading && onUpload && (
                        <>
                            <input
                                type="file"
                                id="file-upload"
                                className="sr-only"
                                accept=".pdf,.doc,.docx,.csv,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                disabled={isLoading}
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full"
                                asChild
                                disabled={isLoading}
                            >
                                <label htmlFor="file-upload">
                                    <Paperclip className="h-4 w-4"/>
                                    <span className="sr-only">Attach file</span>
                                </label>
                            </Button>
                        </>
                    )}
                    <Button
                        type="button"
                        className="rounded-full h-8 w-8"
                        size="icon"
                        disabled={!input.trim() || isLoading}
                        onClick={handleSend}
                    >
                        <Send className="h-4 w-4"/>
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Bot className="h-3 w-3"/>
                <span>Mark 2 | Specialized Marketing Assistant</span>
            </div>
        </div>
    );
}
