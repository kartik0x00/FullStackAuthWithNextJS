import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromUserToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        
        if (!token) {
            throw new Error("No token found");
        }

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_TOKEN!);
        return decodedToken.id;
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}