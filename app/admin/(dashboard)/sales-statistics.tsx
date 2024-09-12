import prisma from "@/lib/db";
import { currencyFormatter } from "@/lib/formats";
import { type ChartConfig } from "@/components/ui/chart";
import GenreSalesChart from "./genre-sales-chart";
import DailySalesChart from "./daily-sales-chart";

export default async function SalesStatistics() {
    const orderTotal = await prisma.order.aggregate({
        _sum: {
            totalAmount: true,
        },
        _count: {
            _all: true,
        },
    });

    const orderCount = orderTotal._count._all;

    const totalAmount = Number(
        orderTotal._sum.totalAmount !== null ? orderTotal._sum.totalAmount : 0
    );

    //movies sold by genre stats
    const result = await prisma.genre.findMany({
        include: {
            movies: {
                include: {
                    OrderItem: true,
                },
            },
        },
    });

    const chartData = result.map((genre) => {
        const totalQuantity = genre.movies.reduce((total, movie) => {
            return (
                total +
                movie.OrderItem.reduce((sum, item) => {
                    return sum + item.quantity;
                }, 0)
            );
        }, 0);

        return {
            genre: genre.name,
            sales: totalQuantity,
        };
    });

    console.log(chartData);

    const chartConfig = {
        genre: {
            label: "Genre",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    //order by day stats
    const orders = await prisma.order.findMany({
        select: {
            orderDate: true,
            totalAmount: true,
        },
        orderBy: {
            orderDate: "asc",
        },
    });

    type SalesData = {
        date: string;
        sales: number;
    }[];

    const dailySales = orders.reduce<SalesData>((acc, order) => {
        const date = order.orderDate.toISOString().split("T")[0];

        const existingDate = acc.find((item) => item.date === date);

        if (existingDate) {
            existingDate.sales += order.totalAmount.toNumber();
        } else {
            acc.push({ date, sales: order.totalAmount.toNumber() });
        }

        return acc;
    }, []);

    const chartConfigDailySales = {
        genre: {
            label: "date",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-xl font-semibold">Statistics</h1>
                <p>Total number of orders: {orderCount}</p>
                <p>Revenue: {currencyFormatter.format(totalAmount)}</p>
                <p>
                    Average revenue per order:{" "}
                    {currencyFormatter.format(totalAmount / orderCount)}
                </p>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                    <h1 className="text-xl font-semibold text-center">
                        Movies Sold by Genre
                    </h1>
                    <GenreSalesChart
                        config={chartConfig}
                        data={chartData}
                    ></GenreSalesChart>
                </div>
                <div className="w-full lg:w-1/2">
                    <h1 className="text-xl font-semibold text-center">
                        Revenue by Day
                    </h1>
                    <DailySalesChart
                        config={chartConfigDailySales}
                        data={dailySales}
                    ></DailySalesChart>
                </div>
            </div>
        </div>
    );
}
