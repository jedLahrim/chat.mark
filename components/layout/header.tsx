"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sparkles, Menu } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

interface HeaderProps {
  onSidebarToggle: () => void;
}

export function Header({ onSidebarToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onSidebarToggle}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      {/*<div className="hidden md:block">*/}
      {/*  <Link href="/" className="flex items-center gap-2">*/}
      {/*    <Sparkles className="h-6 w-6 text-primary" />*/}
      {/*    <span className="font-bold text-xl">{APP_NAME}</span>*/}
      {/*  </Link>*/}
      {/*</div>*/}
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Button size="sm" variant="secondary" className="hidden md:flex">
          Upgrade Plan
        </Button>
      </div>
    </header>
  );
}
