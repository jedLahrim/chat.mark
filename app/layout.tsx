import "./globals.css";
import type {Metadata} from "next";
import {Inter, Manrope} from "next/font/google";
import {Providers} from "./providers";
import {APP_NAME} from "@/lib/constants";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

export const metadata: Metadata = {
    title: `${APP_NAME} - E-Commerce Marketing AI Assistant`,
    description: "The specialized marketing AI assistant that helps e-commerce businesses grow rapidly",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
