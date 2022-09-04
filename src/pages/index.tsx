import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
    const { data, error, isLoading } = trpc.useQuery(["users.me"]);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }

    return <div>{JSON.stringify(data)}</div>;
};

export default Home;
