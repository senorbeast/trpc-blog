import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "../utils/jwt";
import { prisma } from "../utils/prisma";

interface CtxUser {
    id: string;
    email: string;
    name: string;
    iat: string;
    exp: number;
}

function getUserFromRequest(req: NextApiRequest): CtxUser | null {
    const token = req.cookies.token;
    if (token) {
        try {
            const verified = verifyJWT<CtxUser>(token);
            return verified;
        } catch (err) {
            return null;
        }
    }
    return null;
}

export function createContext({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    const user = getUserFromRequest(req);
    return { req, res, prisma, user };
}

// Extracting type of Context
export type Context = ReturnType<typeof createContext>;
