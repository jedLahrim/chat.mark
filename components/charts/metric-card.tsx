import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricData } from "@/types";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";

interface MetricCardProps {
  metric: MetricData;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const showChange = metric.change !== undefined;
  const isPositive = metric.change && metric.change > 0;
  const isNegative = metric.change && metric.change < 0;
  const isNeutral = metric.change === 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">
            {metric.unit === "percentage" ? `${metric.value}%` : metric.unit === "currency" ? `$${metric.value.toLocaleString()}` : metric.value.toLocaleString()}
          </div>
          {showChange && (
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                isPositive && "text-green-500",
                isNegative && "text-red-500",
                isNeutral && "text-muted-foreground"
              )}
            >
              {isPositive && <ArrowUpIcon className="mr-1 h-3 w-3" />}
              {isNegative && <ArrowDownIcon className="mr-1 h-3 w-3" />}
              {isNeutral && <MinusIcon className="mr-1 h-3 w-3" />}
              <span>
                {isPositive ? "+" : ""}
                {metric.change}%
              </span>
            </div>
          )}
        </div>
        {metric.goal && (
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full",
                metric.value >= metric.goal ? "bg-secondary" : "bg-primary"
              )}
              style={{
                width: `${Math.min(100, (metric.value / metric.goal) * 100)}%`,
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}