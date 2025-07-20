import { Card, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

interface StreakTrackerProps {
  streak: number
}

export function StreakTracker({ streak }: StreakTrackerProps) {
  // Determine flame size and color based on streak
  const getFlameSize = (streak: number) => {
    if (streak >= 30) return "h-20 w-20"
    if (streak >= 14) return "h-16 w-16"
    if (streak >= 7) return "h-14 w-14"
    return "h-12 w-12"
  }

  const getFlameColor = (streak: number) => {
    if (streak >= 30) return "text-red-500 drop-shadow-lg"
    if (streak >= 14) return "text-orange-500 drop-shadow-md"
    if (streak >= 7) return "text-yellow-500 drop-shadow-sm"
    if (streak >= 3) return "text-amber-400"
    return "text-gray-400"
  }

  const getBackgroundGradient = (streak: number) => {
    if (streak >= 30)
      return "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800"
    if (streak >= 14)
      return "bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200 dark:border-orange-800"
    if (streak >= 7)
      return "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200 dark:border-yellow-800"
    if (streak >= 3)
      return "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800"
    return "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20 border-gray-200 dark:border-gray-800"
  }

  const getMessage = (streak: number) => {
    if (streak === 0) return "Start your streak today!"
    if (streak >= 30) return "Legendary! You're unstoppable! 🔥🔥🔥"
    if (streak >= 14) return "Amazing streak! You're on fire! 🔥🔥"
    if (streak >= 7) return "Great job! Building momentum! 🔥"
    if (streak >= 3) return "You're building a streak! 💪"
    return "You've started your journey! ⭐"
  }

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return "🏆 LEGEND"
    if (streak >= 14) return "🔥 ON FIRE"
    if (streak >= 7) return "⚡ MOMENTUM"
    if (streak >= 3) return "💪 BUILDING"
    if (streak >= 1) return "⭐ STARTED"
    return ""
  }

  return (
    <Card className={`mt-4 transition-all duration-300 hover:shadow-lg ${getBackgroundGradient(streak)}`}>
      <CardContent className="p-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
          <div
            className="absolute top-8 right-6 w-1 h-1 bg-orange-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-red-400/30 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-4 right-4 w-1 h-1 bg-pink-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="relative group">
            {/* Glow effect behind flame */}
            <div
              className={`absolute inset-0 ${getFlameSize(streak)} ${getFlameColor(streak)} opacity-20 blur-xl scale-150 group-hover:scale-175 transition-all duration-500`}
            ></div>

            {/* Main flame with enhanced effects */}
            <div className="relative">
              <Flame
                className={`${getFlameSize(streak)} ${getFlameColor(streak)} transition-all duration-300 drop-shadow-2xl group-hover:scale-110 animate-pulse`}
              />

              {/* Sparkle effects for higher streaks */}
              {streak >= 7 && (
                <>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                  <div
                    className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </>
              )}

              {/* Extra sparkles for legendary streaks */}
              {streak >= 30 && (
                <>
                  <div
                    className="absolute top-1 left-1 w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                  <div
                    className="absolute -top-1 left-3 w-1 h-1 bg-pink-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.8s" }}
                  ></div>
                </>
              )}
            </div>
          </div>

          <div className="text-center space-y-3">
            {/* Enhanced streak number with gradient text */}
            <div className="relative">
              <div className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                {streak}
              </div>
              <div className="text-lg font-semibold text-muted-foreground mt-1">{streak === 1 ? "day" : "days"}</div>

              {/* Animated underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></div>
            </div>

            {/* Enhanced badge with animation */}
            {getStreakBadge(streak) && (
              <div className="relative">
                <div className="inline-block px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse">
                  {getStreakBadge(streak)}
                </div>
                {/* Badge glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full blur-lg opacity-30 scale-110"></div>
              </div>
            )}

            {/* Enhanced message with better styling */}
            <div className="relative">
              <p className="text-muted-foreground font-medium text-center max-w-xs leading-relaxed">
                {getMessage(streak)}
              </p>

              {/* Motivational progress bar for visual feedback */}
              {streak > 0 && (
                <div className="mt-4 w-full max-w-xs mx-auto">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{Math.min(streak, 30)}/30</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating achievement icons for milestones */}
          {streak >= 7 && <div className="absolute top-2 right-2 text-yellow-500 animate-bounce">⭐</div>}
          {streak >= 14 && (
            <div className="absolute top-2 left-2 text-orange-500 animate-pulse" style={{ animationDelay: "0.5s" }}>
              🔥
            </div>
          )}
          {streak >= 30 && (
            <div className="absolute bottom-2 right-2 text-red-500 animate-bounce" style={{ animationDelay: "1s" }}>
              🏆
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
