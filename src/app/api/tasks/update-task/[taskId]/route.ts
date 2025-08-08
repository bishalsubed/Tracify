import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Tasks } from "@/db/schema/tasks";
import { eq } from "drizzle-orm";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {
    try {
        const db = await connectDB();

        const token = await getToken({ req, secret })
        if (!token || !token.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 })
        }

        const taskID = Number(params.taskId);
        if (!taskID) {
            return NextResponse.json(
                { message: "Error getting taskId" },
                { status: 400 })
        }
        const task = await db.select().from(Tasks).where(eq(Tasks.id, taskID))
        if (!task.length) {
            return NextResponse.json(
                { message: "Error getting task" },
                { status: 400 })
        }
        if (task[0].userId !== Number(token?.id)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const fields = ["title", "description", "completed", "priority", "dueDate", "completedAt", "isRoutine", "RoutineFrequency", "routineTime"] as const;

        type TaskField = typeof fields[number];

        const data = await req.json()
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: "No data provided" }, { status: 400 });
        }
        const updatingValues: Partial<Record<TaskField, any>> = {}
        for (const key of fields) {
            if (data[key] !== undefined) {
                if (key == "isRoutine" && data[key] === false) {
                    updatingValues[key] = data[key];
                    updatingValues.RoutineFrequency = null;
                    updatingValues.routineTime = null;
                    break;
                }
                updatingValues[key] = data[key]
            }
        }
        if (Object.keys(updatingValues).length === 0) {
            return NextResponse.json(
                { error: "No valid fields to update" },
                { status: 400 }
            );
        }

        const updatedTask = await db.update(Tasks).set(updatingValues).where(
            eq(Tasks.id, taskID)
        ).returning()

        return NextResponse.json(
            {
                message: "Successfully Updated",
                task: updatedTask
            },
            { status: 200 }
        )

    } catch (error) {
        console.log("Error updating task", error)
        return NextResponse.json(
            { error: "Error updating task" },
            { status: 400 })
    }
}