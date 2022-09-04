import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

function SinglePostPage() {
    const router = useRouter();
    const postId = router.query.postId as string;

    //  Checks the db for the post with the id of postId
    // TODO: If its not a valid uuid, it stucks on loading
    // If valid uuid, and not found returns 404
    const { data, isLoading } = trpc.useQuery(["posts.post", { postId }]);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!data) {
        return <Error statusCode={404} />;
    }
    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.body}</p>
        </div>
    );
}

export default SinglePostPage;
