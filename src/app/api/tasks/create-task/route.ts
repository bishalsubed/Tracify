import { connectDB } from "@/lib/db";
import { Tasks, InsertTask } from "@/db/schema/tasks";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET;

const titleNameValidation = z
    .string()
    .min(5, "Title must be atleast 2 characters")
    .max(30, "Username mustn't be more than 30 characters")

export const createTaskSchema = z.object({
    title: titleNameValidation,
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    dueDate: z.iso.datetime(),
    isRoutine: z.boolean(),
    routineFrequency: z.enum(["daily", "weekly", "monthly"]).optional(),
    routineTime: z.string().optional(),
})

export async function POST(req: NextRequest) {
    try {
        const { title, description, priority, dueDate, isRoutine, routineFrequency, routineTime } = await req.json()
        const result = createTaskSchema.safeParse({
            title,
            description,
            priority,
            dueDate,
            isRoutine,
            routineFrequency,
            routineTime
        });
        if (!result.success) {
            return NextResponse.json(
                {
                    error: z.treeifyError(result.error)
                }, {
                status: 400
            })
        }
        const db = await connectDB();

        const token = await jwt.getToken({ req, secret })
        if (!token || !token.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        type NewTask = InsertTask
        const newTask = await db.insert(Tasks).values({
            userId: Number(token?.id),
            title,
            description,
            completed: false,
            priority,
            dueDate,
            createdAt: new Date(),
            completedAt: null,
            isRoutine,
            routineFrequency,
            routineTime,
        } as NewTask).returning({
            id: Tasks.id,
            title: Tasks.title,
            createdAt: Tasks.createdAt,
            dueDate: Tasks.dueDate,
        })
        return NextResponse.json(
            {
                message: "Task registered successfully",
                user: newTask,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Creating Task error", error);
        return NextResponse.json(
            { error: "Failed to create task" },
            { status: 400 }
        );
    }
}