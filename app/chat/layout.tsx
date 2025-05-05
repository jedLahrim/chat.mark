"use client";

import React, {useEffect, useState} from "react";
import {Header} from "@/components/layout/header";
import {Sidebar} from "@/components/layout/sidebar";

export default function ChatLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [hasAutoShown, setHasAutoShown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
        };

        // Initial check
        checkIfMobile();

        // Add resize listener
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Show sidebar automatically for 2 seconds on mobile only
    useEffect(() => {
        if (isMobile && !hasAutoShown) {
            setSidebarOpen(true);
            const timer = setTimeout(() => {
                setSidebarOpen(false);
                setHasAutoShown(true);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, [isMobile, hasAutoShown]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header onSidebarToggle={toggleSidebar}/>
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar}/>
                <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'md:pl-72' : ''}`}>
                    <div className="flex h-full flex-col">{children}</div>
                </main>
            </div>
        </div>
    );
}
