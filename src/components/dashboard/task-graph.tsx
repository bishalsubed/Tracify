"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskGraphProps {
  data: {
    date: string
    count: number
  }[]
}

export function TaskGraph({ data }: TaskGraphProps) {
  // Format dates for display
  const formattedData = data.map((item) => ({
    ...item,
    name: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
  }))

  const maxCount = Math.max(...formattedData.map((d) => d.count), 1)

  return (
    <Card className="mt-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Last 7 Days</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-[200px] flex items-end justify-between gap-2">
          {formattedData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end justify-center mb-2" style={{ height: "160px" }}>
                <div
                  className="w-full max-w-8 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-md transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${(item.count / maxCount) * 100}%`,
                    minHeight: item.count > 0 ? "4px" : "0px",
                  }}
                  title={`${item.count} tasks completed`}
                />
              </div>
              <div className="text-xs text-muted-foreground font-medium">{item.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">
            Total: {formattedData.reduce((sum, item) => sum + item.count, 0)} tasks completed
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
