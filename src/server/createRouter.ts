import { router } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./createContext";

//  Just passing the types info to the router + no need to call transformer again
export function createRouter() {
    return router<Context>().transformer(superjson);
}
