import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "next-auth/jwt"
import { Tasks } from "@/db/schema/tasks";
import { eq } from "drizzle-orm";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
    try {
        const db = await connectDB()
        const token = await jwt.getToken({ req, secret })
        if (!token || !token.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 })
        }
        const tasks = await db.select().from(Tasks).where(eq(Tasks.userId, Number(token?.id)))
        if (!tasks.length) {
            return NextResponse.json(
                {
                    message: "No Tasks found",
                    tasks: []
                },
                { status: 400 })
        }
        return NextResponse.json(
            {
                message: "Tasks Obtained Successfully",
                tasks
            },
            { status: 400 })
    } catch (error) {
        console.log("Error getting tasks", error)
        return NextResponse.json(
            { error: "Error getting tasks" },
            { status: 400 })
    }
}