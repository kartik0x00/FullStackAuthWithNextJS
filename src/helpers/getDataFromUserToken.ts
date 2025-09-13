import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

export const getDataFromUserToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        
        if (!token) {
            throw new Error("No token found");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as DecodedToken;
        return decodedToken.id;
        
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(errorMessage);
    }
}