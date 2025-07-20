"use client"

import { useState, useEffect } from "react"
import { Task } from "@/components/dashboard/task-item"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskDialog } from "@/components/dashboard/task-dialog"
import { useRouter } from "next/navigation"

interface TaskListProps {
  tasks: any[]
  emptyMessage: string
  isRoutine?: boolean
}

export function TaskList({ tasks, emptyMessage, isRoutine = false }: TaskListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [localTasks, setLocalTasks] = useState(tasks)
  const router = useRouter()

  // Update local tasks when props change
  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  const refreshTasks = () => {
    // Force a router refresh to get the latest data
    router.refresh()

    // Add a small delay to ensure the server has time to update
    setTimeout(() => {
      router.refresh()
    }, 300)
  }

  const handleAddTask = () => {
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4 mt-4">
      {localTasks.length > 0 ? (
        <div className="space-y-2">
          {localTasks.map((task) => (
            <Task key={task.id} task={task} onUpdate={refreshTasks} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="text-muted-foreground">{emptyMessage}</div>
          <Button variant="outline" size="sm" className="mt-4" onClick={handleAddTask}>
            <Plus className="mr-2 h-4 w-4" />
            Add {isRoutine ? "Routine" : "Task"}
          </Button>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Add {isRoutine ? "Routine" : "Task"}
        </Button>
      </div>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            // Refresh tasks when dialog closes
            refreshTasks()
          }
        }}
        onTaskSaved={refreshTasks}
        defaultIsRoutine={isRoutine}
      />
    </div>
  )
}
