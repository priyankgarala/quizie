import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "All fields are required!" },
                { status: 400 }
            );
        }

        // Validate email format and password length
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format!" },
                { status: 400 }
            );
        }
        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters long!" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "User not found!" }, { status: 404 });
        }

        if (!user.password) {
            return NextResponse.json(
                { error: "Invalid credentials!" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid credentials!" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user.id,
                    password: user.password,
                    email: user.email,
                    name: user.name, // Include only necessary fields
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during login:", error); // Log the error
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Ensure connection is closed
    }
}
