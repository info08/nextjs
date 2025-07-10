import { NextRequest } from "next/server";

export function getDataFromToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  if (!token) {
    return null; // No token found
  }

  try {
    // Assuming the token is a simple string, you can decode it or parse it as needed
    //const userData = JSON.parse(atob(token)); // Example of decoding a base64 encoded token
    return token;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null if there's an error in decoding
  }
}