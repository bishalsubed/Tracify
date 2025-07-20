"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createTask, updateTask } from "@/lib/task-actions"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "@/lib/utils"

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: {
    id: string
    title: string
    description?: string
    completed: boolean
    priority: "low" | "medium" | "high" | "urgent"
    dueDate?: string
    isRoutine?: boolean
    routineFrequency?: "daily" | "weekly" | "monthly"
    routineTime?: string
    attachments?: string[]
  }
  onTaskSaved: () => void
  defaultIsRoutine?: boolean
}

export function TaskDialog({ open, onOpenChange, task, onTaskSaved, defaultIsRoutine = false }: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [isRoutine, setIsRoutine] = useState(defaultIsRoutine)
  const [routineFrequency, setRoutineFrequency] = useState<"daily" | "weekly" | "monthly">("daily")
  const [routineTime, setRoutineTime] = useState("09:00")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      setTitle(task?.title || "")
      setDescription(task?.description || "")
      setPriority(task?.priority || "medium")
      setDueDate(task?.dueDate ? new Date(task.dueDate) : undefined)
      setIsRoutine(task?.isRoutine || defaultIsRoutine)
      setRoutineFrequency(task?.routineFrequency || "daily")
      setRoutineTime(task?.routineTime || "09:00")
    }
  }, [open, task, defaultIsRoutine])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      const taskData = {
        title,
        description,
        priority,
        dueDate: dueDate?.toISOString(),
        isRoutine,
        routineFrequency: isRoutine ? routineFrequency : undefined,
        routineTime: isRoutine ? routineTime : undefined,
        attachments: [],
      }

      if (task) {
        // Update existing task
        await updateTask(task.id, taskData)
        toast({
          title: "Task updated",
          description: "Your task has been updated successfully.",
        })
      } else {
        // Create new task
        await createTask(taskData)
        toast({
          title: isRoutine ? "Routine created" : "Task created",
          description: isRoutine
            ? `Your new ${routineFrequency} routine has been created successfully.`
            : "Your new task has been created successfully.",
        })
      }

      // Close dialog and refresh tasks
      onOpenChange(false)
      setTimeout(() => {
        onTaskSaved()
      }, 100)
    } catch (error) {
      console.error("Task operation error:", error)
      toast({
        title: "Error",
        description: task ? "Failed to update task" : "Failed to create task",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{task ? "Edit Task" : isRoutine ? "Create Routine" : "Create Task"}</DialogTitle>
            <DialogDescription>
              {task
                ? "Make changes to your task here."
                : isRoutine
                  ? "Add a new routine to build consistent habits."
                  : "Add a new task to your list."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isRoutine ? "Routine title" : "Task title"}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isRoutine ? "Add details about your routine" : "Add details about your task"}
                className="resize-none"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(value: "low" | "medium" | "high" | "urgent") => setPriority(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="text-green-600 dark:text-green-400">
                    🟢 Low Priority
                  </SelectItem>
                  <SelectItem value="medium" className="text-yellow-600 dark:text-yellow-400">
                    🟡 Medium Priority
                  </SelectItem>
                  <SelectItem value="high" className="text-orange-600 dark:text-orange-400">
                    🟠 High Priority
                  </SelectItem>
                  <SelectItem value="urgent" className="text-red-600 dark:text-red-400">
                    🔴 Urgent
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="routine" checked={isRoutine} onCheckedChange={setIsRoutine} />
              <Label htmlFor="routine">Make this a routine task</Label>
            </div>

            {isRoutine && (
              <div className="grid gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="grid gap-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={routineFrequency}
                    onValueChange={(value: "daily" | "weekly" | "monthly") => setRoutineFrequency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input id="time" type="time" value={routineTime} onChange={(e) => setRoutineTime(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {!isRoutine && (
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date (optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!dueDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? task
                  ? "Updating..."
                  : "Creating..."
                : task
                  ? "Update Task"
                  : isRoutine
                    ? "Create Routine"
                    : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
