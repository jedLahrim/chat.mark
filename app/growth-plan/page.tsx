"use client";

import {useState} from "react";
import {MetricCard} from "@/components/charts/metric-card";
import {LineChart} from "@/components/charts/line-chart";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowUpRight, BarChart, Calendar, ChevronRight, ShoppingBag, Users} from "lucide-react";
import Link from "next/link";
import {ChartData, MetricData} from "@/types";

export default function GrowthPlanPage() {
    // Sample metrics data
    const [metrics] = useState<MetricData[]>([
        {
            name: "New Customers",
            value: 324,
            previousValue: 289,
            change: 12,
            goal: 500,
            unit: "number",
        },
        {
            name: "Conversion Rate",
            value: 3.2,
            previousValue: 2.8,
            change: 14,
            goal: 5,
            unit: "percentage",
        },
        {
            name: "Average Order Value",
            value: 86,
            previousValue: 82,
            change: 5,
            unit: "currency",
        },
        {
            name: "Revenue",
            value: 28650,
            previousValue: 24320,
            change: 18,
            goal: 30000,
            unit: "currency",
        },
    ]);

    // Sample chart data
    const [revenueData] = useState<ChartData[]>([
        {date: "Jan", revenue: 18000, visitors: 12000, orders: 420},
        {date: "Feb", revenue: 19800, visitors: 14000, orders: 460},
        {date: "Mar", revenue: 22400, visitors: 16500, orders: 520},
        {date: "Apr", revenue: 21300, visitors: 15800, orders: 490},
        {date: "May", revenue: 24800, visitors: 18200, orders: 580},
        {date: "Jun", revenue: 28650, visitors: 21000, orders: 680},
    ]);

    // Sample strategies
    const [strategies] = useState([
        {
            id: "1",
            title: "Email List Segmentation",
            description: "Create 3 customer segments based on purchase behavior and send targeted campaigns",
            type: "email",
            difficulty: "intermediate",
            impact: "high",
        },
        {
            id: "2",
            title: "Social Media Content Calendar",
            description: "Build a 30-day content plan focusing on product benefits and customer testimonials",
            type: "social",
            difficulty: "beginner",
            impact: "medium",
        },
        {
            id: "3",
            title: "Cart Abandonment Flow",
            description: "Implement a 3-email sequence with progressive discounts to recover abandoned carts",
            type: "email",
            difficulty: "beginner",
            impact: "high",
        },
    ]);

    return (
        <div className="container mx-auto max-w-7xl p-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Growth Plan</h1>
                    <p className="text-muted-foreground mt-1">Track your progress and optimize your marketing
                        efforts</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                        <Calendar className="h-4 w-4"/> Last 30 Days
                    </Button>
                    <Button size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-1"/> Export Report
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {metrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric}/>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
                <LineChart
                    className="lg:col-span-3"
                    title="Revenue Trend"
                    description="Monthly revenue growth over time"
                    data={revenueData}
                    dataKeys={[
                        {key: "revenue", name: "Revenue ($)"},
                    ]}
                />

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart className="h-5 w-5 text-primary"/>
                            Channel Performance
                        </CardTitle>
                        <CardDescription>
                            Revenue by marketing channel
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Social Media */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-medium">Social Media</div>
                                    <div className="text-muted-foreground text-sm">$9,840</div>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full"
                                        style={{width: "34%"}}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <div>34% of total</div>
                                    <div>+18% from last month</div>
                                </div>
                            </div>

                            {/* Email Marketing */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-medium">Email Marketing</div>
                                    <div className="text-muted-foreground text-sm">$7,450</div>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-secondary rounded-full"
                                        style={{width: "26%"}}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <div>26% of total</div>
                                    <div>+24% from last month</div>
                                </div>
                            </div>

                            {/* Paid Advertising */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-medium">Paid Advertising</div>
                                    <div className="text-muted-foreground text-sm">$6,320</div>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-destructive rounded-full"
                                        style={{width: "22%"}}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <div>22% of total</div>
                                    <div>+9% from last month</div>
                                </div>
                            </div>

                            {/* Organic Search */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-medium">Organic Search</div>
                                    <div className="text-muted-foreground text-sm">$5,040</div>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-chart-3 rounded-full"
                                        style={{width: "18%"}}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <div>18% of total</div>
                                    <div>+5% from last month</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Strategy Recommendations */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Recommended Growth Strategies</h2>
                    <Button variant="ghost" size="sm" className="gap-1">
                        View All <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {strategies.map((strategy) => (
                        <Card key={strategy.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <Badge variant={
                                        strategy.type === "email" ? "default" :
                                            strategy.type === "social" ? "secondary" :
                                                "outline"
                                    }>
                                        {strategy.type === "email" ? "Email Marketing" :
                                            strategy.type === "social" ? "Social Media" :
                                                strategy.type}
                                    </Badge>
                                    <Badge variant="outline" className="ml-auto">
                                        {strategy.impact === "high" ? "High Impact" :
                                            strategy.impact === "medium" ? "Medium Impact" :
                                                "Low Impact"}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg mt-2">{strategy.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <p className="text-muted-foreground text-sm">{strategy.description}</p>
                            </CardContent>
                            <CardContent className="pt-0">
                                <div className="flex justify-between items-center">
                                    <Badge variant="outline" className="bg-card">
                                        {strategy.difficulty === "beginner" ? "Beginner" :
                                            strategy.difficulty === "intermediate" ? "Intermediate" :
                                                "Advanced"}
                                    </Badge>
                                    <Link href={`/strategy/${strategy.id}`}>
                                        <Button size="sm" variant="ghost">
                                            View Strategy <ChevronRight className="h-4 w-4 ml-1"/>
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Customer Insights */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Customer Insights</h2>
                    <Button variant="ghost" size="sm" className="gap-1">
                        View Details <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Users className="h-5 w-5 text-primary"/>
                                Customer Segments
                            </CardTitle>
                            <CardDescription>
                                Distribution of your customer base
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-medium">Repeat Customers</div>
                                        <div className="text-muted-foreground text-sm">42%</div>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{width: "42%"}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-medium">One-time Buyers</div>
                                        <div className="text-muted-foreground text-sm">35%</div>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary rounded-full" style={{width: "35%"}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-medium">New Customers</div>
                                        <div className="text-muted-foreground text-sm">23%</div>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-destructive rounded-full"
                                             style={{width: "23%"}}></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <ShoppingBag className="h-5 w-5 text-primary"/>
                                Popular Products
                            </CardTitle>
                            <CardDescription>
                                Best-selling products this month
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="rounded-md bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                                            <span className="font-bold text-primary">1</span>
                                        </div>
                                        <div>
                                            <div className="font-medium">Premium T-Shirt</div>
                                            <div className="text-sm text-muted-foreground">SKU: TS-1001</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">$4,860</div>
                                        <div className="text-sm text-muted-foreground">124 units</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="rounded-md bg-secondary/10 p-2 w-10 h-10 flex items-center justify-center">
                                            <span className="font-bold text-secondary">2</span>
                                        </div>
                                        <div>
                                            <div className="font-medium">Slim Fit Jeans</div>
                                            <div className="text-sm text-muted-foreground">SKU: JN-2045</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">$3,920</div>
                                        <div className="text-sm text-muted-foreground">98 units</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="rounded-md bg-destructive/10 p-2 w-10 h-10 flex items-center justify-center">
                                            <span className="font-bold text-destructive">3</span>
                                        </div>
                                        <div>
                                            <div className="font-medium">Hoodie</div>
                                            <div className="text-sm text-muted-foreground">SKU: HD-3067</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">$3,240</div>
                                        <div className="text-sm text-muted-foreground">72 units</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
