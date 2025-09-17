import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const BookCardSkeleton = () => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-20 h-28 bg-muted rounded-md animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-5 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-3">
                <div className="flex gap-2">
                    <div className="h-6 w-12 bg-muted rounded animate-pulse" />
                    <div className="h-6 w-12 bg-muted rounded animate-pulse" />
                </div>

                <div className="flex gap-2">
                    <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                    <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                </div>

                <div className="mt-auto pt-3">
                    <div className="h-10 bg-muted rounded animate-pulse" />
                </div>
            </CardContent>
        </Card>
    )
}
export default BookCardSkeleton
