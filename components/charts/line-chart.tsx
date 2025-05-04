"use client";

import { useTheme } from "next-themes";
import { LineChart as RechartLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/types";

interface LineChartProps {
  title: string;
  description?: string;
  data: ChartData[];
  dataKeys: { key: string; name: string; color?: string }[];
  className?: string;
}

export function LineChart({ title, description, data, dataKeys, className }: LineChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Default chart colors based on our theme
  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartLineChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "hsl(var(--muted))" : "hsl(var(--muted))"}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke={isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))"}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))"}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))",
                  borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))",
                }}
              />
              <Legend />
              {dataKeys.map((dataKey, index) => (
                <Line
                  key={dataKey.key}
                  type="monotone"
                  dataKey={dataKey.key}
                  name={dataKey.name}
                  stroke={dataKey.color || chartColors[index % chartColors.length]}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              ))}
            </RechartLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}