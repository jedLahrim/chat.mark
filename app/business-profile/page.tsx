"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "sonner";
import {BarChart, CircleDollarSign, Globe, LogOut, Store, Target, Users, X} from "lucide-react";
import {BUSINESS_GOALS, BUSINESS_TYPES, MARKETING_CHANNELS, REVENUE_RANGES} from "@/lib/constants";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function BusinessProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Acme E-Commerce",
        website: "https://acme-ecommerce.com",
        businessType: "dtc",
        revenueRange: "10k-50k",
        industry: "Fashion & Apparel",
        primaryGoal: "acquisition",
        primaryChannel: "social",
        targetAudience: "Women aged 25-45 interested in sustainable fashion and ethical shopping practices, primarily located in urban areas with disposable income.",
    });
    const router = useRouter();

    const handleSave = () => {
        toast.success("Business profile updated");
        setIsEditing(false);
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
        <div className="container mx-auto max-w-5xl p-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Business Profile</h1>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "outline" : "default"}
                    >
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="gap-2"
                    >
                        <LogOut className="h-4 w-4"/>
                        Logout
                    </Button>
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        className="gap-2"
                    >
                        <X className="h-6 w-6"/>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Store className="h-5 w-5 text-primary"/>
                            Business Details
                        </CardTitle>
                        <CardDescription>
                            Basic information about your business
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Business Name</Label>
                            {isEditing ? (
                                <Input
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                />
                            ) : (
                                <p className="text-base">{profile.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website">Website URL</Label>
                            {isEditing ? (
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        id="website"
                                        value={profile.website}
                                        onChange={(e) => setProfile({...profile, website: e.target.value})}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground"/>
                                    <a href={profile.website} target="_blank" rel="noopener noreferrer"
                                       className="text-primary hover:underline">
                                        {profile.website}
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessType">Business Type</Label>
                            {isEditing ? (
                                <Select
                                    value={profile.businessType}
                                    onValueChange={(value) => setProfile({...profile, businessType: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select business type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BUSINESS_TYPES.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="text-base">
                                    {BUSINESS_TYPES.find((type) => type.value === profile.businessType)?.label}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="revenueRange">Revenue Range</Label>
                            {isEditing ? (
                                <Select
                                    value={profile.revenueRange}
                                    onValueChange={(value) => setProfile({...profile, revenueRange: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select revenue range"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {REVENUE_RANGES.map((range) => (
                                            <SelectItem key={range.value} value={range.value}>
                                                {range.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <CircleDollarSign className="h-4 w-4 text-muted-foreground"/>
                                    <p className="text-base">
                                        {REVENUE_RANGES.find((range) => range.value === profile.revenueRange)?.label}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            {isEditing ? (
                                <Input
                                    id="industry"
                                    value={profile.industry}
                                    onChange={(e) => setProfile({...profile, industry: e.target.value})}
                                />
                            ) : (
                                <p className="text-base">{profile.industry}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary"/>
                            Marketing Strategy
                        </CardTitle>
                        <CardDescription>
                            Key information for marketing recommendations
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="primaryGoal">Primary Business Goal</Label>
                            {isEditing ? (
                                <Select
                                    value={profile.primaryGoal}
                                    onValueChange={(value) => setProfile({...profile, primaryGoal: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select primary goal"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BUSINESS_GOALS.map((goal) => (
                                            <SelectItem key={goal.value} value={goal.value}>
                                                {goal.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <BarChart className="h-4 w-4 text-muted-foreground"/>
                                    <p className="text-base">
                                        {BUSINESS_GOALS.find((goal) => goal.value === profile.primaryGoal)?.label}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="primaryChannel">Primary Marketing Channel</Label>
                            {isEditing ? (
                                <Select
                                    value={profile.primaryChannel}
                                    onValueChange={(value) => setProfile({...profile, primaryChannel: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select primary channel"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MARKETING_CHANNELS.map((channel) => (
                                            <SelectItem key={channel.value} value={channel.value}>
                                                {channel.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="text-base">
                                    {MARKETING_CHANNELS.find((channel) => channel.value === profile.primaryChannel)?.label}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience Description</Label>
                            {isEditing ? (
                                <Textarea
                                    id="targetAudience"
                                    value={profile.targetAudience}
                                    onChange={(e) => setProfile({...profile, targetAudience: e.target.value})}
                                    rows={4}
                                />
                            ) : (
                                <div className="flex gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground mt-1 shrink-0"/>
                                    <p className="text-base">{profile.targetAudience}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    {isEditing && (
                        <CardFooter>
                            <Button onClick={handleSave} className="ml-auto">
                                Save Profile
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    );
}
