import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { ok } from "assert";
import {NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    // Clear the session or token here if applicable
    // For example, if using cookies:
    const response = NextResponse.json({ message: "Logout successful" , ok:true , status: 200 });
    response.cookies.set("token", "", {httpOnly:true,expires:new Date(0) }); // Clear the token cookie
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}