import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import type { AppRouter } from "../server/route/app.router";
import { url } from "../constants";
import { UserContextProvider } from "../context/user.context";
import { trpc } from "../utils/trpc";

function MyApp({ Component, pageProps }: AppProps) {
    const { data, error, isLoading } = trpc.useQuery(["users.me"]);

    if (isLoading) {
        return <div>Loading user...</div>;
    }

    return (
        <UserContextProvider value={data}>
            <main>
                <Component {...pageProps} />
            </main>
        </UserContextProvider>
    );
}

export default withTRPC<AppRouter>({
    config({ ctx }) {
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
