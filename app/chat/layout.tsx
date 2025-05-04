"use client";

import React, {useState} from "react";
import {Header} from "@/components/layout/header";
import {Sidebar} from "@/components/layout/sidebar";

export default function ChatLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header onSidebarToggle={toggleSidebar}/>
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar}/>
                <main className="flex-1 overflow-y-auto md:pl-72">
                    <div className="flex h-full flex-col">{children}</div>
                </main>
            </div>
        </div>
    );
}
