"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "sonner";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        notifications: true,
        emailUpdates: true,
        darkMode: false,
        voiceAssistant: true,
        language: "english",
        emailFrequency: "weekly"
    });

    const handleSave = () => {
        toast.success("Settings saved successfully");
    };

    return (
        <div className="container mx-auto max-w-4xl p-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Manage how you receive notifications and updates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Push Notifications</Label>
                                <div className="text-sm text-muted-foreground">
                                    Receive notifications about new marketing opportunities
                                </div>
                            </div>
                            <Switch
                                checked={settings.notifications}
                                onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Email Updates</Label>
                                <div className="text-sm text-muted-foreground">
                                    Get marketing insights and reports via email
                                </div>
                            </div>
                            <Switch
                                checked={settings.emailUpdates}
                                onCheckedChange={(checked) => setSettings({...settings, emailUpdates: checked})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email Frequency</Label>
                            <Select
                                value={settings.emailFrequency}
                                onValueChange={(value) => setSettings({...settings, emailFrequency: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select frequency"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                        <CardDescription>Customize your experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Voice Assistant</Label>
                                <div className="text-sm text-muted-foreground">
                                    Enable voice greetings and notifications
                                </div>
                            </div>
                            <Switch
                                checked={settings.voiceAssistant}
                                onCheckedChange={(checked) => setSettings({...settings, voiceAssistant: checked})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Language</Label>
                            <Select
                                value={settings.language}
                                onValueChange={(value) => setSettings({...settings, language: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="spanish">Spanish</SelectItem>
                                    <SelectItem value="french">French</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
}
