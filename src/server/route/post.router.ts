import {
    createPostSchema,
    getSinglePostSchema,
} from "../../schema/post.schema";
import { createRouter } from "../createRouter";
import * as trpcS from "@trpc/server";

export const postRouter = createRouter()
    // Allow to Auth users to create posts
    // Can be done for with a middleware

    .mutation("create-post", {
        input: createPostSchema,
        async resolve({ ctx, input }) {
            // Allow only Auth users to create posts
            if (!ctx.user) {
                new trpcS.TRPCError({
                    code: "FORBIDDEN",
                    message: "Not authenticated",
                });
            }

            const post = await ctx.prisma.post.create({
                data: {
                    ...input,
                    user: {
                        connect: {
                            // connect?
                            id: ctx.user.id,
                        },
                    },
                },
            });
            return post;
        },
    })
    .query("posts", {
        resolve({ ctx }) {
            return ctx.prisma.post.findMany();
        },
    })
    .query("post", {
        input: getSinglePostSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.post.findUnique({
                where: {
                    id: input.postId,
                },
            });
        },
    });
