import {connect} from '@/db/dbconfig';
import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        const {token} = await request.json();

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({message: 'Invalid or Expired token'}, {status: 400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message: 'Email verified successfully'}, {status: 200});

    } catch (error) {
        console.error("Email verification error:", error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
    }
}