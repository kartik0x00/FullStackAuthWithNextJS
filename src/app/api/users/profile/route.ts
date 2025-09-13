import {NextRequest, NextResponse} from "next/server";  
import { connect } from "@/db/dbconfig";
import User from "@/models/userModel";
import { getDataFromUserToken } from "@/helpers/getDataFromUserToken";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromUserToken(request);
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "User profile fetched", 
            data: user 
        }, { status: 200 });

    } catch (error: unknown) {
        console.error("Error in fetching user profile:", error);
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}