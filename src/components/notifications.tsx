"use client"

import type React from "react"

import { useEffect } from "react"

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Request notification permission on app load
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }

    // Set up periodic task reminders
    const checkReminders = () => {
      // This would typically fetch upcoming tasks from your API
      // For demo purposes, we'll show a reminder every 30 minutes
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("TimeTrackr Reminder", {
          body: "Don't forget to check your tasks!",
          icon: "/favicon.ico",
        })
      }
    }

    // Check for reminders every 30 minutes
    const reminderInterval = setInterval(checkReminders, 30 * 60 * 1000)

    return () => clearInterval(reminderInterval)
  }, [])

  return <>{children}</>
}
