import { createRouter } from "../createRouter";
import { userRouter } from "./user.router";

export const appRouter = createRouter().merge("users.", userRouter);

// This type is pass to many files so that they
//  can know what type of queries and mutations are used.
export type AppRouter = typeof appRouter;
// Passed to the client _app.tsx
// also to, `trpc` for Hooks Creation
