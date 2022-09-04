import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {
    createUserOutputSchema,
    createUserSchema,
} from "../../schema/user.schema";
import { trpc } from "../../utils/trpc";
import { createRouter } from "../createRouter";
import * as trpcS from "@trpc/server";

export const userRouter = createRouter().mutation("register-user", {
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
});
