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
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

type GenreSalesChartProps<T> = {
    config: ChartConfig;
    data: T[];
};

export default function GenreSalesChart<T>({
    config,
    data,
}: GenreSalesChartProps<T>) {
    return (
        <ResponsiveContainer width="100%" height={300} className="mt-4">
            <ChartContainer config={config} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={data}>
                    <XAxis
                        dataKey="genre"
                        angle={70}
                        tickLine={false}
                        tickMargin={23}
                        height={70}
                        dx={7}
                        axisLine={false}
                        tickFormatter={(value) => {
                            return value;
                        }}
                    ></XAxis>
                    <YAxis
                        dataKey="sales"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        allowDecimals={false}
                        tickFormatter={(value) => value}
                    ></YAxis>
                    <CartesianGrid vertical={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                        dataKey="sales"
                        fill="var(--color-desktop)"
                        radius={4}
                    />
                </BarChart>
            </ChartContainer>
        </ResponsiveContainer>
    );
}
