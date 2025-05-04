'use client'
import {FormEventHandler, useState} from "react";
import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Eye, EyeOff} from "lucide-react";
import {SignType} from "@/app/common/enums/auth.enum";

export function AuthModal({isOpen, onOpenChange, initialMode = SignType.SIGN_UP}: {
    isOpen: boolean,
    onOpenChange: (open: boolean) => void,
    initialMode: SignType
}) {
    const [mode, setMode] = useState<SignType>(initialMode);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("google", {callbackUrl: "/chat"});
        } catch (error) {
            setError("An error occurred with Google sign in");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: PointerEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (mode === SignType.SIGN_IN) {
                // Handle sign in
                const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });

                if (result?.error) {
                    setError("Invalid email or password");
                } else {
                    window.location.href = "/chat";
                }
            } else {
                // Handle sign up - implement this based on your backend
                // This is a placeholder - you'll need to implement your signup logic
                // For example, a call to your API endpoint that handles registration
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({name, email, password}),
                });

                if (response.ok) {
                    // Auto sign in after successful signup
                    await signIn("credentials", {
                        redirect: true,
                        callbackUrl: "/chat",
                        email,
                        password,
                    });
                } else {
                    const data = await response.json();
                    setError(data.message || "Failed to create account");
                }
            }
        } catch (error) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(mode === SignType.SIGN_UP ? SignType.SIGN_IN : SignType.SIGN_UP);
        setError("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{mode === SignType.SIGN_UP ? "Create an Account" : "Sign In"}</DialogTitle>
                    <DialogDescription>
                        {mode === SignType.SIGN_UP
                            ? "Join today to access all features."
                            : "Welcome back! Sign in to your account."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit as FormEventHandler<HTMLFormElement> | any} className="space-y-4 py-4">
                    {mode === SignType.SIGN_UP && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={mode === SignType.SIGN_UP}
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-destructive">{error}</div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Please wait..." : mode === SignType.SIGN_UP ? "Create Account" : "Sign In"}
                    </Button>
                </form>

                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                </div>

                <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={isLoading}>
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#fbc02d"
                              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#e53935"
                              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4caf50"
                              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1565c0"
                              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Continue with Google
                </Button>

                <DialogFooter className="flex flex-col items-center md:mr-[54px]">
                    <p className="text-sm text-center">
                        {mode === SignType.SIGN_UP ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            type="button"
                            className="text-primary hover:underline font-medium"
                            onClick={toggleMode}
                        >
                            {mode === SignType.SIGN_UP ? "Sign In" : "Create Account"}
                        </button>
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
