"use client";

import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Bot, File, FileText, ImageIcon, Paperclip, Plus, Send, X} from "lucide-react";
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
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleSend = () => {
        if ((!input.trim() && !uploadedFile) || isLoading) return;
        const result = onSend(input);

        // Clear input and file preview regardless of the result
        setInput("");
        setUploadedFile(null);
        setFilePreview(null);

        // If there's a result (like when hitting message limit), restore the input
        if (result !== undefined) {
            setInput(result as string);
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
            setUploadedFile(file);
            onUpload(file);

            // Generate preview based on file type
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFilePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFilePreview(reader.result as string);
                };
                reader.readAsText(file);
            } else {
                setFilePreview(null);
            }

            e.target.value = '';
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setFilePreview(null);
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

    const getFileIcon = () => {
        if (!uploadedFile) return null;
        if (uploadedFile.type.startsWith('image/')) return <ImageIcon className="h-4 w-4"/>;
        if (uploadedFile.type === 'text/plain' || uploadedFile.name.endsWith('.txt')) return <FileText
            className="h-4 w-4"/>;
        return <File className="h-4 w-4"/>;
    };

    return (
        <div className={cn("pt-4", className)}>
            {!input && !isFocused && !uploadedFile && (
                <div className="mb-4 fade-in">
                    <SuggestionChips
                        suggestions={[
                            "How can I get more customers?",
                            "Create an email campaign",
                            "Optimize my product pages",
                            "Instagram strategy",
                            "Reduce cart abandonment",
                            "Scale my Facebook ads"
                        ]}
                        onSelect={handleSuggestionSelect}
                    />
                </div>
            )}

            {uploadedFile && (
                <div className="mb-4 rounded-lg border overflow-hidden bg-muted/50">
                    <div className="p-3 flex items-center justify-between bg-background">
                        <div className="flex items-center gap-2 overflow-hidden">
                            {getFileIcon()}
                            <span className="truncate text-sm">{uploadedFile.name}</span>
                            <span className="text-xs text-muted-foreground">
                                {(uploadedFile.size / 1024).toFixed(1)} KB
                            </span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleRemoveFile}
                            disabled={isLoading}
                        >
                            <X className="h-3 w-3"/>
                            <span className="sr-only">Remove file</span>
                        </Button>
                    </div>

                    {filePreview && (
                        <div className="overflow-auto p-3 border-t">
                            {uploadedFile.type.startsWith('image/') ? (
                                <img
                                    src={filePreview}
                                    alt="Preview"
                                    className="w-[90px] h-auto rounded"
                                />
                            ) : uploadedFile.type === 'text/plain' || uploadedFile.name.endsWith('.txt') ? (
                                <pre className="text-sm whitespace-pre-wrap bg-background p-2 rounded">
                                    {filePreview.length > 1000
                                        ? `${filePreview.substring(0, 1000)}...`
                                        : filePreview}
                                </pre>
                            ) : null}
                        </div>
                    )}
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
                        disabled={(!input.trim() && !uploadedFile) || isLoading}
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
