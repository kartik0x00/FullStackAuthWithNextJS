import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/db/dbconfig";
import bcrypt from "bcryptjs";

connect()

export async function POST(request: NextRequest) {

    const {token, newpassword} = await request.json();

    const user = await User.findOne({forgotPasswordToken: token, forgotPasswordExpiry: {$gt: Date.now()}})

    if (!user){
        return NextResponse.json({error:"Invalid token"},{status:400})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);


    user.forgotPasswordToken = "";
    user.forgotPasswordExpiry = "";
    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({message:"Password reset successful"},{status:200})

    
}