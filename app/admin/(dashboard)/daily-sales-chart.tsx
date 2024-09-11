"use client";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

type GenreSalesChartProps<T> = {
    config: ChartConfig;
    data: T[];
};

export default function DailySalesChart<T>({
    config,
    data,
}: GenreSalesChartProps<T>) {
    return (
        <ResponsiveContainer width="100%" height={300} className="mt-4">
            <ChartContainer config={config} className="min-h-[200px] w-full">
                <LineChart accessibilityLayer data={data}>
                    <CartesianGrid />
                    <XAxis
                        dataKey="date"
                        dx={7}
                        tickFormatter={(value) => {
                            return value;
                        }}
                    ></XAxis>
                    <YAxis
                        dataKey="sales"
                        allowDecimals={false}
                        tickFormatter={(value) => value}
                    ></YAxis>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line dataKey={"sales"} type="monotone"></Line>
                </LineChart>
            </ChartContainer>
        </ResponsiveContainer>
    );
}
