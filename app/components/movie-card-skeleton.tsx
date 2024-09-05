import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCardSkeleton() {
    return (
        <div className="flex flex-col aspect-[9/16] gap-1 w-40 space-y-1">
            <Skeleton className="relative aspect-[9/16] w-full"></Skeleton>
            <div className="flex flex-col justify-between flex-grow space-y-1">
                <Skeleton className="h-5 w-32"></Skeleton>
                <Skeleton className="h-5 w-24"></Skeleton>
                <Skeleton className="h-5 w-16"></Skeleton>
                <Skeleton className="h-5 w-12"></Skeleton>
                <Skeleton className="w-full h-8"></Skeleton>
            </div>
        </div>
    );
}
