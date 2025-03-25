import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcryptjs"; // Import bcryptjs for password hashing
import { prisma } from "@/lib/prisma"; // Import Prisma for database access

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User created successfully", email: newUser.email },
            { status: 201 }
        );
    } catch (error) {
        console.error("Server Error:", error);

        return NextResponse.json(
            { error: "Internal Server Error"},
            { status: 500 }
        );
    }
}
