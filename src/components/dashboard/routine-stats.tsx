import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Calendar, Target } from "lucide-react"

interface RoutineStatsProps {
  dailyTotal: number
  dailyCompleted: number
  weeklyTotal: number
  monthlyTotal: number
}

export function RoutineStats({ dailyTotal, dailyCompleted, weeklyTotal, monthlyTotal }: RoutineStatsProps) {
  const dailyProgress = dailyTotal > 0 ? (dailyCompleted / dailyTotal) * 100 : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Today's Progress</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {dailyCompleted}/{dailyTotal}
          </div>
          <Progress value={dailyProgress} className="mt-2 h-2" />
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">{dailyProgress.toFixed(0)}% completed today</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Daily Routines</CardTitle>
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{dailyTotal}</div>
          <p className="text-xs text-blue-600 dark:text-blue-400">Active daily habits</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Weekly Routines</CardTitle>
          <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{weeklyTotal}</div>
          <p className="text-xs text-purple-600 dark:text-purple-400">Weekly habits</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Monthly Goals</CardTitle>
          <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{monthlyTotal}</div>
          <p className="text-xs text-orange-600 dark:text-orange-400">Monthly objectives</p>
        </CardContent>
      </Card>
    </div>
  )
}
