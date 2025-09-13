import { NextRequest, NextResponse } from "next/server";
import path from "path";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const token = request.cookies.get("token")?.value || null;

    if(pathname === "/login" || pathname === "/signup"){
        if(token){
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
    }
    if(pathname === "/logout" || pathname === "/profile"){
        if(!token){
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        }
    }

    return NextResponse.next();
}



const config = {
    matcher: ["/profile", "/login", "/signup", "/logout",],
};