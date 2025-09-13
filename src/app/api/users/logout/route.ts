import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
        response.cookies.set("token", "", { httpOnly: true, maxAge: 0 });
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}