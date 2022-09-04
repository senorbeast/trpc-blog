import Link from "next/link";
import { trpc } from "../../utils/trpc";

function PostListingPage() {
    const { data, isLoading } = trpc.useQuery(["posts.posts"]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {data?.map((post) => (
                <article key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <Link href={`/posts/${post.id}`}> Read Post</Link>
                </article>
            ))}
        </div>
    );
}

export default PostListingPage;
