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
    password: z.string().min(8, { message: "Password Must be atleast 8 characters" })
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