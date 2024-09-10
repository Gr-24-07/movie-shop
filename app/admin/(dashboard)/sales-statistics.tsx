import prisma from "@/lib/db";
import { currencyFormatter } from "@/lib/formats";
import { type ChartConfig } from "@/components/ui/chart";
import GenreSalesChart from "./genre-sales-chart";

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

    // const genreSales = await prisma.genre.findMany({
    //     select: {
    //         name: true,
    //         _count: {
    //             select: {
    //                 movies: {
    //                     where: {
    //                         OrderItem: {
    //                             some: {}
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //     },
    // });

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

    // const chartData = genreSales.map((item) => {
    //     return { genre: item.name, sales: item._count.movies };
    // });

    console.log(chartData);

    const chartConfig = {
        genre: {
            label: "Genre",
            color: "#FFFFFF",
        },
    } satisfies ChartConfig;

    return (
        <div>
            <div>
                <h1 className="text-xl font-semibold">Statistics</h1>
                <p>Order Count: {orderCount}</p>
                <p>Total all orders: {currencyFormatter.format(totalAmount)}</p>
                <p>
                    Average total:{" "}
                    {currencyFormatter.format(totalAmount / orderCount)}
                </p>
            </div>
            <div>
                <h1 className="text-xl font-semibold text-center">
                    Sales by Genre
                </h1>
                <GenreSalesChart
                    config={chartConfig}
                    data={chartData}
                ></GenreSalesChart>
            </div>
        </div>
    );
}
