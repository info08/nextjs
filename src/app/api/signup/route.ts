import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
  try {
    await connectDB();
    const { username, email, password } = await request.json();


    console.log("Received data:", { username, email, password });
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password:hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isVerified: newUser.isVerified,
          isAdmin: newUser.isAdmin
        },
        status:201
      }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}