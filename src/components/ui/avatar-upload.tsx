"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, Loader2 } from "lucide-react"
import { uploadFile, deleteFile } from "@/lib/blob"
import { useToast } from "@/hooks/use-toast"

interface AvatarUploadProps {
  currentAvatar?: string
  userName: string
  onAvatarChange?: (avatarUrl: string | null) => void
  size?: "sm" | "md" | "lg"
}

export function AvatarUpload({ currentAvatar, userName, onAvatarChange, size = "md" }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar)
  const { toast } = useToast()

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    try {
      setUploading(true)

      // Delete old avatar if exists
      if (avatarUrl) {
        try {
          await deleteFile(avatarUrl)
        } catch (error) {
          console.log("Failed to delete old avatar:", error)
        }
      }

      // Upload new avatar
      const result = await uploadFile(file, `avatars/${Date.now()}-${file.name}`)

      setAvatarUrl(result.url)
      onAvatarChange?.(result.url)

      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }

    // Reset input
    event.target.value = ""
  }

  const handleRemoveAvatar = async () => {
    if (!avatarUrl) return

    try {
      await deleteFile(avatarUrl)
      setAvatarUrl(undefined)
      onAvatarChange?.(null)

      toast({
        title: "Avatar removed",
        description: "Your profile picture has been removed.",
      })
    } catch (error) {
      toast({
        title: "Remove failed",
        description: "Failed to remove avatar. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={userName} />
          <AvatarFallback className="text-lg font-semibold">{userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {uploading ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Camera className="h-6 w-6 text-white" />
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => document.getElementById("avatar-upload")?.click()}
        >
          {uploading ? "Uploading..." : "Change Avatar"}
        </Button>

        {avatarUrl && (
          <Button variant="outline" size="sm" onClick={handleRemoveAvatar} disabled={uploading}>
            Remove
          </Button>
        )}
      </div>

      <input id="avatar-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
