import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {
    createUserOutputSchema,
    createUserSchema,
    requestOTPSchema,
    verifyOTPSchema,
} from "../../schema/user.schema";
import { trpc } from "../../utils/trpc";
import { createRouter } from "../createRouter";
import * as trpcS from "@trpc/server";
import { sendLoginEmail } from "../../utils/mailer";
import { baseUrl, url } from "../../constants";
import { decode, encode } from "../../utils/base64";
import { triggerAsyncId } from "async_hooks";
import { signJWT } from "../../utils/jwt";
import { serialize } from "cookie";

export const userRouter = createRouter()
    .mutation("register-user", {
        input: createUserSchema,
        // async resolve(){}  #This is valid too.
        resolve: async ({ ctx, input }) => {
            const { email, name } = input;

            try {
                const user = await ctx.prisma.user.create({
                    data: {
                        email,
                        name,
                    },
                });
                return user;
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === "P2002") {
                        throw new trpcS.TRPCError({
                            code: "CONFLICT",
                            message: "User already exists",
                        });
                    }
                }
                throw new trpcS.TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                });
            }
        },
    })
    // OTP is LoginToken
    .mutation("request-otp", {
        input: requestOTPSchema,
        async resolve({ ctx, input }) {
            const { email, redirect } = input;

            //  If user in DB
            const user = await ctx.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new trpcS.TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            // Create OTP(LogintToken) in DB
            const token = await ctx.prisma.loginToken.create({
                data: {
                    redirect,
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });

            // Send email to user
            sendLoginEmail({
                // need to pass email info and id info in token
                // base64 encode the token
                token: encode(`${token.id}:${user.email}`),
                url: baseUrl,
                email: user.email,
            });
            return true;
        },
    })
    .query("verify-otp", {
        input: verifyOTPSchema, //hashed token from email verification
        async resolve({ ctx, input }) {
            const decoded = decode(input.hash).split(":");
            const [id, email] = decoded;

            //  Checking from db
            const token = await ctx.prisma.loginToken.findFirst({
                where: {
                    id, //token id
                    user: {
                        email, //user relation in prisma (postgres db) email
                    },
                },
                // Include user relation
                include: {
                    user: true,
                },
            });

            if (!token) {
                throw new trpcS.TRPCError({
                    code: "FORBIDDEN",
                    message: "Invalid token",
                });
            }
            //  Add jwt token to cookie (header)
            const jwt = signJWT({
                email: token.user.email,
                id: token.user.id,
            });

            // Set header of set cookie, with jwt as value
            ctx.res.setHeader(
                "Set-Cookie",
                // Cookie
                serialize("token", jwt, { path: "/" })
            );

            return {
                redirect: token.redirect,
            };
        },
    })
    .query("me", {
        resolve({ ctx }) {
            return ctx.user;
        },
    });
