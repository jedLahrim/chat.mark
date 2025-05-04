import Image from "next/image";
import Link from "next/link";
import {ThemeToggle} from "@/components/ui/theme-toggle";
import {Button} from "@/components/ui/button";
import {
    ArrowRight,
    BarChart3,
    BarChartHorizontal,
    Brain,
    MessageSquareText,
    Rocket,
    Sparkles,
    Target
} from "lucide-react";
import {APP_NAME} from "@/lib/constants";
import {ScrollReveal} from "@/components/animations/scroll-reveal";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="h-8 w-8 text-primary"/>
                        <span className="text-xl font-bold">{APP_NAME}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle/>
                        <Link href="/chat">
                            <Button>Try for Free</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
                <ScrollReveal>
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                    Your AI <span className="text-primary">Marketing</span> Expert
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    {APP_NAME} helps e-commerce businesses create winning marketing strategies,
                                    optimize campaigns, and drive explosive growth in record time.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/chat">
                                        <Button size="lg" className="w-full sm:w-auto">
                                            Start Chatting <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Button>
                                    </Link>
                                    <Link href="#features">
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                            See Features
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl border">
                                <Image
                                    src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"
                                    alt="E-commerce marketing dashboard"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-primary/10"></div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Supercharge Your Marketing</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Get expert guidance on every aspect of your marketing strategy with AI-powered insights.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ScrollReveal>
                            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Rocket className="h-6 w-6 text-primary"/>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Growth Strategies</h3>
                                <p className="text-muted-foreground">
                                    Get tailored marketing strategies designed specifically for your business
                                    type and growth stage.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                                    <MessageSquareText className="h-6 w-6 text-secondary"/>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Content Generation</h3>
                                <p className="text-muted-foreground">
                                    Create high-converting email sequences, social media posts, and ad copy tailored to
                                    your brand voice.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                                    <BarChart3 className="h-6 w-6 text-destructive"/>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Data Analysis</h3>
                                <p className="text-muted-foreground">
                                    Upload your marketing data and get actionable insights on what's working and what
                                    needs improvement.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6 text-primary"/>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Campaign Planning</h3>
                                <p className="text-muted-foreground">
                                    Plan complete marketing campaigns with timelines, content calendars, and performance
                                    metrics.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                                    <Brain className="h-6 w-6 text-secondary"/>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Competitive Analysis</h3>
                                <p className="text-muted-foreground">
                                    Get strategies to outperform your competitors with unique positioning and marketing
                                    approaches.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                                    <BarChartHorizontal className="h-6 w-6 text-destructive"/>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
                                <p className="text-muted-foreground">
                                    Track your marketing performance with visual dashboards and get recommendations for
                                    improvement.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-primary/5">
                <ScrollReveal>
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of e-commerce businesses that are using {APP_NAME} to accelerate their growth
                            and outperform competitors.
                        </p>
                        <Link href="/chat">
                            <Button size="lg" className="px-8">
                                Start Free Trial <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="mt-auto border-t">
                <div className="container mx-auto py-8 px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <Sparkles className="h-6 w-6 text-primary"/>
                            <span className="font-bold">{APP_NAME}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">About</Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy</Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">Terms</Link>
                            <ThemeToggle/>
                        </div>
                    </div>
                    <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
