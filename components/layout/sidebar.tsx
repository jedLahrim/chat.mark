"use client";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    LucideProps,
    Mail,
    MessageSquare,
    Plus,
    Settings,
    Sparkles,
    User,
    X
} from "lucide-react";
import Link from "next/link";
import {APP_NAME} from "@/lib/constants";
import {usePathname} from "next/navigation";
import * as react from "react";
import React, {useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {signOut} from "next-auth/react";
import {toast} from "sonner";
import {Conversation} from "@/types";

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function Sidebar({isOpen, onToggle}: SidebarProps) {
    const pathname = usePathname();
    const [conversations, setConversations] = useState<Array<Conversation>>([
        {id: '1', title: "Marketing Strategy", createdAt: new Date()},
        {id: '2', title: "Email Campaign Ideas", createdAt: new Date()},
        {id: '3', title: "Social Media Plan", createdAt: new Date()},
    ]);
    const [collapsed, setCollapsed] = useState(false);
    const bottomFeatures: Array<{
        href: string,
        icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>,
        label: string,
    }> = [
        {href: "/settings", icon: Settings, label: "Settings"},
    ];

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        if (collapsed) {
            e.preventDefault();
            toggleCollapse();
        }
    };

    const handleLogout = async () => {
        try {
            await signOut({callbackUrl: '/'});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Failed to log out");
            console.error(error);
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300 md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    collapsed ? "w-16" : "w-64"
                )}
            >
                {/* Header with collapse button */}
                <div className="flex h-16 items-center justify-between px-4 border-b">
                    {!collapsed ? (
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-primary"/>
                            <span className="font-bold text-xl">{APP_NAME}</span>
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogoClick}
                            className="flex items-center justify-center w-full"
                        >
                            <Sparkles className="h-6 w-6 text-primary"/>
                        </button>
                    )}

                    <div className="flex items-center gap-2">
                        {!collapsed && <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hidden md:flex"
                            onClick={toggleCollapse}
                        >
                            {collapsed ? <ChevronRight className="h-4 w-4"/> : <ChevronLeft className="h-4 w-4"/>}
                        </Button>}

                        <Button variant="ghost" size="icon" onClick={onToggle} className="md:hidden">
                            <X className="h-5 w-5"/>
                        </Button>
                    </div>
                </div>

                {/* New Chat Button */}
                <div className="p-3">
                    {!collapsed ? (
                        <Link href="/chat">
                            <Button className="w-full justify-start gap-2">
                                <Plus className="h-4 w-4"/>
                                New Chat
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/chat">
                            <Button variant="ghost" size="icon" className="w-full">
                                <Plus className="h-4 w-4"/>
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Collapse button (moved under New Chat) */}
                {collapsed && <div className="px-3 pb-3 hidden md:block">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-full"
                        onClick={toggleCollapse}
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4"/> : <ChevronLeft className="h-4 w-4"/>}
                    </Button>
                </div>}

                {/* Conversations */}
                {!collapsed && <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                    <div className="flex items-center justify-between mb-2 px-2 text-sm text-muted-foreground">
                        <span>Recent conversations</span>
                    </div>
                    {conversations.map((conversation) => (
                        <Button
                            key={conversation.id}
                            variant={pathname === `/chat/${conversation.id}` ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start text-left overflow-hidden h-auto py-2",
                                collapsed ? "px-2 justify-center" : ""
                            )}
                            asChild
                        >
                            <Link href={`/chat/${conversation.id}`}>
                                <MessageSquare className="h-4 w-4 shrink-0"/>
                                {!collapsed && (
                                    <span className="truncate ml-2">{conversation.title}</span>
                                )}
                            </Link>
                        </Button>
                    ))}
                </nav>}

                {/* Bottom Navigation */}
                <div className={cn("mt-auto p-2 border-t space-y-1", collapsed ? "flex flex-col items-center" : "")}>
                    {bottomFeatures.map((item) => (
                        <Button
                            key={item.href}
                            variant="ghost"
                            className={cn("w-full justify-start", collapsed ? "justify-center" : "")}
                            asChild
                        >
                            <Link href={item.href}>
                                <item.icon className="h-4 w-4"/>
                                {!collapsed && <span className="ml-2">{item.label}</span>}
                            </Link>
                        </Button>
                    ))}

                    {/* Business Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn("w-full justify-start", collapsed ? "justify-center" : "")}
                            >
                                <User className="h-4 w-4"/>
                                {!collapsed && <span className="ml-2">Account</span>}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="center" className="w-48">
                            <DropdownMenuItem asChild>
                                <Link href="/business-profile" className="flex items-center gap-2">
                                    <User className="h-4 w-4"/>
                                    Business Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/contact-us" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4"/>
                                    Contact Us
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}
                                              className="flex items-center gap-2 text-destructive">
                                <LogOut className="h-4 w-4"/>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>

            {/* Mobile toggle button */}
            {!isOpen && (
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed left-4 top-4 z-40 md:hidden"
                    onClick={onToggle}
                >
                    <ChevronRight className="h-4 w-4"/>
                </Button>
            )}
        </>
    );
}
