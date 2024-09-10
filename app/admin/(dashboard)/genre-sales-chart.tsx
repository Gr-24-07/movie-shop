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
        <ResponsiveContainer width="100%" height={400}>
            <ChartContainer
                config={config}
                className="min-h-[200px] w-full py-4"
            >
                <BarChart accessibilityLayer data={data}>
                    <XAxis
                        dataKey="genre"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => {
                            if (typeof value === "string" && value.length) {
                            }
                            return value;
                        }}
                    >
                        <Label
                            className="text-xl font-bold"
                            value="Genre"
                            offset={10}
                            position="bottom"
                        />
                    </XAxis>
                    <YAxis
                        dataKey="sales"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        allowDecimals={false}
                        tickFormatter={(value) => value}
                    >
                        <Label
                            angle={-90}
                            className="text-xl font-bold"
                            value="Sales"
                            position="insideLeft"
                        />
                    </YAxis>
                    <CartesianGrid vertical={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
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
