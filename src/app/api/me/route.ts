import {getDataFromToken} from '@/helpers/getDataFromToken';
import {connectDB} from '@/dbConfig/dbConfig';
import { NextRequest , NextResponse } from 'next/server';
import User from '@/models/userModel';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const userId = request.cookies.get("token")?.value || "";
    
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch user data from the database
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}