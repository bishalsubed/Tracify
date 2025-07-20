import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TaskListSkeleton() {
  return (
    <div className="space-y-4 mt-4">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-5 w-5 rounded-sm" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
