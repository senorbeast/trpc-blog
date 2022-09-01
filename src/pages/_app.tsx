import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import type { AppRouter } from "../server/route/app.router";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
    config({ ctx }) {
        const url = process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
            : "http://localhost:3000/api/trpc";

        const links = [
            loggerLink(), // good for debugging
            httpBatchLink({
                // Makes app faster
                maxBatchSize: 10,
                url,
            }),
        ];

        return {
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        staleTime: 60,
                    },
                },
                headers() {
                    if (ctx?.req) {
                        return {
                            // add headers  to the req into the server,
                            // then get copies from the headers
                            ...ctx.req.headers,
                            "x-ssr": "1",
                        };
                    }
                    return {};
                },
            },

            links,
            transformer: superjson, // allows to just native dates, maps
        };
    },
    ssr: false, // try it out with `true`
})(MyApp);
