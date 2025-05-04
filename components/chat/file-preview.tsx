"use client";

import {useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {FileText, X} from "lucide-react";
import Image from "next/image";

interface FilePreviewProps {
    file: File;
    onRemove?: () => void;
}

export function FilePreview({file, onRemove}: FilePreviewProps) {
    const [preview, setPreview] = useState<string | null>(null);

    // Generate preview for images
    if (file.type.startsWith('image/') && !preview) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    return (
        <Card className="relative">
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    {preview ? (
                        <div className="relative h-20 w-20 rounded overflow-hidden">
                            <Image
                                src={preview}
                                alt={file.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                            <FileText className="h-6 w-6 text-muted-foreground"/>
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="font-medium truncate">{file.name}</div>
                        <div className="text-sm text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                        </div>
                    </div>
                    {onRemove && (
                        <button
                            onClick={onRemove}
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted"
                        >
                            <X className="h-4 w-4"/>
                        </button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
