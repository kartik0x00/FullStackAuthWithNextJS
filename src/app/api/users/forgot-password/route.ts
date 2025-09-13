import { NextRequest,NextResponse } from "next/server";
import {connect} from "@/db/dbconfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();


export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        const userId = user._id;

        await sendEmail({ email, emailType: "RESET", userId });

        return new Response(JSON.stringify({ message: "Password reset email sent" }), { status: 200 });        
        
    } catch (error) {
        console.error("Error in forgot password:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }


}