import {connect} from "@/db/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        // Extract email and password from the request body
        const {email, password } = await request.json();
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        //token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        // Generate a JWT token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN as string, { expiresIn: '1h' });

        const response = NextResponse.json({ message: "Login successful", token }, { status: 200 });
        // Set the token in an HttpOnly cookie
        response.cookies.set('token', token,
            { httpOnly: true, maxAge: 3600 }
            );

        return response;



    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
