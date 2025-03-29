import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Input validation schema
const CreateUserSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = CreateUserSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.clerkUser.findUnique({
      where: { clerkId: validatedData.clerkId },
    });

    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 });
    }

    // Create new user
    const newUser = await prisma.clerkUser.create({
      data: {
        ...validatedData,
        settings: {},
        publicMetadata: {},
        privateMetadata: {},
        unsafeMetadata: {},
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}