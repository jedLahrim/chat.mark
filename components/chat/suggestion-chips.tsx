"use client";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {SUGGESTION_CHIPS} from "@/lib/constants";

interface SuggestionChipsProps {
    onSelect: (suggestion: string) => void;
    className?: string;
    suggestions?: string[];
}

export function SuggestionChips({
                                    onSelect,
                                    className,
                                    suggestions = SUGGESTION_CHIPS,
                                }: SuggestionChipsProps) {
    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {suggestions.map((suggestion) => (
                <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() => onSelect(suggestion)}
                >
                    {suggestion}
                </Button>
            ))}
        </div>
    );
}
