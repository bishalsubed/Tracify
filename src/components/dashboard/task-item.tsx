"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Calendar, Clock, Repeat } from "lucide-react"
import { updateTask, deleteTask } from "@/lib/task-actions"
import { TaskDialog } from "@/components/dashboard/task-dialog"
import { formatDistanceToNow } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface TaskProps {
  task: {
    id: string
    title: string
    description?: string
    completed: boolean
    priority: "low" | "medium" | "high" | "urgent"
    dueDate?: string
    createdAt: string
    completedAt?: string
    isRoutine?: boolean
    routineFrequency?: "daily" | "weekly" | "monthly"
    routineTime?: string
  }
  onUpdate: () => void
}

export function Task({ task, onUpdate }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const { toast } = useToast()

  const handleComplete = async () => {
    try {
      setIsCompleting(true)

      // Play sound if completing a task (with fallback)
      if (!task.completed) {
        try {
          // Simple beep sound using Web Audio API
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.1)
        } catch (audioError) {
          console.log("Audio playback not supported")
        }
      }

      await updateTask(task.id, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : undefined,
      })

      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed! 🎉",
        description: task.completed ? "The task has been reopened." : "Great job! Keep up the good work.",
      })

      onUpdate()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      })
    } finally {
      setIsCompleting(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteTask(task.id)

      toast({
        title: "Task deleted",
        description: "The task has been permanently removed.",
      })

      onUpdate()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const dueText = task.dueDate ? formatDistanceToNow(new Date(task.dueDate)) : null
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

  const getRoutineFrequencyText = (frequency?: string) => {
    switch (frequency) {
      case "daily":
        return "Every day"
      case "weekly":
        return "Every week"
      case "monthly":
        return "Every month"
      default:
        return ""
    }
  }

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "urgent":
        return {
          color: "bg-gradient-to-r from-red-500 to-pink-500",
          bgColor: "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
          borderColor: "border-red-300 dark:border-red-700",
          textColor: "text-red-700 dark:text-red-300",
          badge: "🔴 Urgent",
          badgeVariant: "destructive" as const,
        }
      case "high":
        return {
          color: "bg-gradient-to-r from-orange-500 to-amber-500",
          bgColor: "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
          borderColor: "border-orange-300 dark:border-orange-700",
          textColor: "text-orange-700 dark:text-orange-300",
          badge: "🟠 High",
          badgeVariant: "secondary" as const,
        }
      case "medium":
        return {
          color: "bg-gradient-to-r from-yellow-500 to-amber-500",
          bgColor: "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
          borderColor: "border-yellow-300 dark:border-yellow-700",
          textColor: "text-yellow-700 dark:text-yellow-300",
          badge: "🟡 Medium",
          badgeVariant: "outline" as const,
        }
      case "low":
        return {
          color: "bg-gradient-to-r from-green-500 to-emerald-500",
          bgColor: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
          borderColor: "border-green-300 dark:border-green-700",
          textColor: "text-green-700 dark:text-green-300",
          badge: "🟢 Low",
          badgeVariant: "outline" as const,
        }
      default:
        return {
          color: "bg-gradient-to-r from-gray-500 to-slate-500",
          bgColor: "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20",
          borderColor: "border-gray-300 dark:border-gray-700",
          textColor: "text-gray-700 dark:text-gray-300",
          badge: "Medium",
          badgeVariant: "outline" as const,
        }
    }
  }

  const priorityConfig = getPriorityConfig(task.priority)

  const getCardStyle = () => {
    if (task.completed) {
      return "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 opacity-75"
    }
    if (isOverdue) {
      return "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800"
    }
    return `${priorityConfig.bgColor} ${priorityConfig.borderColor} hover:shadow-md`
  }

  return (
    <>
      <Card className={`transition-all duration-300 relative overflow-hidden ${getCardStyle()}`}>
        {/* Priority indicator bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${priorityConfig.color}`} />

        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleComplete}
              disabled={isCompleting}
              className={`h-5 w-5 transition-all duration-200 ${
                task.completed
                  ? "bg-green-500 border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  : "border-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              }`}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`font-medium transition-all duration-200 ${
                    task.completed ? "line-through text-green-700 dark:text-green-300" : priorityConfig.textColor
                  }`}
                >
                  {task.title}
                </div>
                <Badge variant={priorityConfig.badgeVariant} className="text-xs">
                  {priorityConfig.badge}
                </Badge>
                {task.isRoutine && (
                  <Badge variant="outline" className="text-xs">
                    <Repeat className="h-3 w-3 mr-1" />
                    {task.routineFrequency}
                  </Badge>
                )}
              </div>

              {task.description && (
                <div
                  className={`text-sm transition-all duration-200 ${
                    task.completed ? "text-green-600 dark:text-green-400 line-through" : "text-muted-foreground"
                  }`}
                >
                  {task.description}
                </div>
              )}

              <div className="flex items-center gap-4 mt-2">
                {dueText && !task.isRoutine && (
                  <div
                    className={`text-xs flex items-center gap-1 ${
                      task.completed
                        ? "text-green-500 dark:text-green-400"
                        : isOverdue
                          ? "text-red-500 dark:text-red-400 font-medium"
                          : "text-blue-500 dark:text-blue-400"
                    }`}
                  >
                    <Calendar className="h-3 w-3" />
                    {task.completed ? "Was due" : isOverdue ? "Overdue" : "Due"} {dueText}
                  </div>
                )}

                {task.isRoutine && (
                  <div className="flex items-center gap-4">
                    <div className="text-xs flex items-center gap-1 text-purple-500 dark:text-purple-400">
                      <Repeat className="h-3 w-3" />
                      {getRoutineFrequencyText(task.routineFrequency)}
                    </div>

                    {task.routineTime && (
                      <div className="text-xs flex items-center gap-1 text-purple-500 dark:text-purple-400">
                        <Clock className="h-3 w-3" />
                        {task.routineTime}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              disabled={isDeleting || isCompleting}
              className="hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting || isCompleting}
              className="hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {isEditing && <TaskDialog open={isEditing} onOpenChange={setIsEditing} task={task} onTaskSaved={onUpdate} />}
    </>
  )
}
