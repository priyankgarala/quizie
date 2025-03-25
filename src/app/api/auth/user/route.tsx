import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch authenticated user details
export async function GET(req: Request) {
  try {
    // Parse Authorization header to retrieve email
    const authHeader = req.headers.get("Authorization");
    const email = authHeader?.split(" ")[1]; // Assuming the email is sent as "Bearer <email>"

    if (!email) {
      console.error("Email not provided in Authorization header");
      return NextResponse.json({ error: "Missing email in Authorization header" }, { status: 401 });
    }

    // Fetch user details from Prisma DB using email
    const dbUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!dbUser) {
      console.error(`User not found for email: ${email}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user details
    console.log("User fetched from Prisma:", dbUser);
    return NextResponse.json({ user: dbUser }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/auth/user:");
    return NextResponse.json(
      { error: "Something went wrong"},
      { status: 500 }
    );
  }
}
