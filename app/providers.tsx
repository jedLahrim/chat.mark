"use client";

import {ThemeProvider} from "next-themes";
import {Toaster} from "@/components/ui/sonner";
import React from "react";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({children}: ProvidersProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster position="bottom-right"/>
            {children}
        </ThemeProvider>
    );
}
