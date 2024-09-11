"use client";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { currencyFormatter } from "@/lib/formats";
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
                <LineChart
                    accessibilityLayer
                    data={data}
                    margin={{ right: 30 }}
                >
                    <CartesianGrid />
                    <XAxis
                        tickMargin={10}
                        dataKey="date"
                        tickFormatter={(value) => {
                            return value;
                        }}
                    ></XAxis>
                    <YAxis
                        dataKey="sales"
                        width={100}
                        allowDecimals={false}
                        tickFormatter={(value) =>
                            currencyFormatter.format(value)
                        }
                    ></YAxis>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line dataKey={"sales"} type="monotone"></Line>
                </LineChart>
            </ChartContainer>
        </ResponsiveContainer>
    );
}
