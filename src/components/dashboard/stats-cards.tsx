import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Clock, Flame, ListTodo } from "lucide-react"

interface StatsCardsProps {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  streak: number
}

export function StatsCards({ totalTasks, completedTasks, pendingTasks, streak }: StatsCardsProps) {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Tasks</CardTitle>
          <ListTodo className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalTasks}</div>
          <p className="text-xs text-blue-600 dark:text-blue-400">All time tasks created</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Completed</CardTitle>
          <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">{completedTasks}</div>
          <p className="text-xs text-green-600 dark:text-green-400">{completionRate}% completion rate</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Pending</CardTitle>
          <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{pendingTasks}</div>
          <p className="text-xs text-orange-600 dark:text-orange-400">Tasks awaiting completion</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Current Streak</CardTitle>
          <Flame className="h-4 w-4 text-red-600 dark:text-red-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900 dark:text-red-100">{streak} days</div>
          <p className="text-xs text-red-600 dark:text-red-400">Keep it up!</p>
        </CardContent>
      </Card>
    </div>
  )
}
