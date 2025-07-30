import { Users } from "@/db/schema/users";
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { InsertUser } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"
import { z } from "zod"


const userNameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username mustn't be more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Userame must not contain any special characters")

export const signUpSchema = z.object({
    name: userNameValidation,
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password Must be atleast 6 characters" })
})

export async function POST(request: NextRequest) {
    try {
        const db = await connectDB();

        const { name, email, password } = await request.json();

        const result = signUpSchema.safeParse({ name, email, password })

        if (!result.success) {
            return NextResponse.json(
                {
                    error: z.treeifyError(result.error)
                }, {
                status: 400
            })
        }

        const existingUser = await db.select().from(Users).where(eq(Users.email, email));

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        type NewUser = InsertUser;

        const newUser = await db.insert(Users).values({
            name,
            email,
            password: hashedPassword,
            avatar: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as NewUser).returning(
            {
                id: Users.id,
                name: Users.name,
                email: Users.email,
                avatar: Users.avatar,
                updatedAt: Users.updatedAt,
                createdAt: Users.createdAt,
            }
        )

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: newUser[0],
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Registration error", error);
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 400 }
        );
    }
}



// export function getTasksByUserId(userId: string): Task[] {
//     console.log("Getting tasks for user:", userId)
//     const userTasks = db.tasks.filter((task) => task.userId === userId)
//     console.log("Found tasks:", userTasks.length)
//     return userTasks
// }

// export function getRoutineTasksByUserId(userId: string): Task[] {
//     console.log("Getting routine tasks for user:", userId)
//     const routineTasks = db.tasks.filter((task) => task.userId === userId && task.isRoutine === true)
//     console.log("Found routine tasks:", routineTasks.length)
//     return routineTasks
// }

// export function getTaskById(taskId: string): Task | undefined {
//     return db.tasks.find((task) => task.id === taskId)
// }

// export function createTask(task: Partial<Task> & { userId: string }): Task {
//     const newTask: Task = {
//         ...task,
//         id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//         completed: false,
//         priority: task.priority || "medium",
//         attachments: task.attachments || [],
//         createdAt: new Date().toISOString(),
//     } as Task

//     console.log("Creating new task:", newTask)
//     db.tasks.push(newTask)
//     console.log("Total tasks in DB:", db.tasks.length)

//     return newTask
// }

// export function updateTask(taskId: string, updates: Partial<Task>): Task | null {
//     const taskIndex = db.tasks.findIndex((task) => task.id === taskId)
//     if (taskIndex === -1) {
//         console.log("Task not found for update:", taskId)
//         return null
//     }

//     db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...updates }
//     console.log("Updated task:", db.tasks[taskIndex])
//     return db.tasks[taskIndex]
// }

// export function deleteTask(taskId: string): boolean {
//     const initialLength = db.tasks.length
//     db.tasks = db.tasks.filter((task) => task.id !== taskId)
//     const deleted = db.tasks.length < initialLength
//     console.log("Deleted task:", taskId, "Success:", deleted)
//     return deleted
// }

// export function updateUser(userId: string, updates: Partial<User>): User | null {
//     const userIndex = db.users.findIndex((user) => user.id === userId)
//     if (userIndex === -1) {
//         console.log("User not found for update:", userId)
//         return null
//     }

//     db.users[userIndex] = { ...db.users[userIndex], ...updates }
//     console.log("Updated user:", db.users[userIndex])
//     return db.users[userIndex]
// }

// export function getCompletedTasksCount(userId: string, days = 7): { date: string; count: number }[] {
//     const now = new Date()
//     const result: { date: string; count: number }[] = []

//     for (let i = days - 1; i >= 0; i--) {
//         const date = new Date(now)
//         date.setDate(date.getDate() - i)
//         const dateStr = date.toISOString().split("T")[0]

//         const count = db.tasks.filter((task) => {
//             if (task.userId !== userId || !task.completed || !task.completedAt) return false
//             const completedDate = new Date(task.completedAt).toISOString().split("T")[0]
//             return completedDate === dateStr
//         }).length

//         result.push({ date: dateStr, count })
//     }

//     return result
// }

// export function getCurrentStreak(userId: string): number {
//     const userTasks = db.tasks.filter((task) => task.userId === userId)
//     if (!userTasks.length) return 0

//     // Get completed tasks sorted by completion date
//     const completedTasks = userTasks
//         .filter((task) => task.completed && task.completedAt)
//         .sort((a, b) => {
//             return new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
//         })

//     if (!completedTasks.length) return 0

//     let streak = 1
//     const currentDate = new Date(completedTasks[0].completedAt!)
//     currentDate.setHours(0, 0, 0, 0)

//     // Check if there's a completed task today
//     const today = new Date()
//     today.setHours(0, 0, 0, 0)

//     if (currentDate.getTime() !== today.getTime()) {
//         return 0 // Streak broken if no task completed today
//     }

//     // Count consecutive days with completed tasks
//     for (let i = 1; i < 100; i++) {
//         // Limit to 100 days to prevent infinite loop
//         const prevDate = new Date(today)
//         prevDate.setDate(today.getDate() - i)
//         prevDate.setHours(0, 0, 0, 0)

//         const hasCompletedTask = completedTasks.some((task) => {
//             const taskDate = new Date(task.completedAt!)
//             taskDate.setHours(0, 0, 0, 0)
//             return taskDate.getTime() === prevDate.getTime()
//         })

//         if (hasCompletedTask) {
//             streak++
//         } else {
//             break
//         }
//     }

//     return streak
// }

// export function getPriorityTasksCount(userId: string): { priority: string; count: number }[] {
//     const userTasks = db.tasks.filter((task) => task.userId === userId && !task.completed)

//     const priorities = ["urgent", "high", "medium", "low"]
//     return priorities.map((priority) => ({
//         priority,
//         count: userTasks.filter((task) => task.priority === priority).length,
//     }))
// }