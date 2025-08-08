import { connectDB } from "@/lib/db";
import { Tasks } from "@/db/schema/tasks";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import jwt from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: NextRequest, { params }: { params: { taskid: string } }) {
    try {
        const db = await connectDB()

        const token = await jwt.getToken({ req, secret });
        if (!token || !token.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const taskId = Number(params.taskid);

        if (isNaN(taskId)) {
            return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
        }

        const task = await db.select().from(Tasks).where(eq(Tasks.id, taskId));

        if (!task.length || task[0].userId !== Number(token.id)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await db.delete(Tasks).where(eq(Tasks.id, taskId));

        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Deleting Task error", error);
        return NextResponse.json(
            { error: "Failed to delete task" },
            { status: 400 }
        );
    }
}