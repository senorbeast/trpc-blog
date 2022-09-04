import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

function CreatePostPage() {
    const router = useRouter();
    const { handleSubmit, register } = useForm<CreatePostInput>();

    const { mutate, error } = trpc.useMutation(["posts.create-post"], {
        // User id from post schema, which is a uuid string
        onSuccess: ({ id }) => {
            router.push(`/posts/${id}`);
        },
    });

    function onSubmit(values: CreatePostInput) {
        mutate(values);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && <div>{error.message}</div>}

            <h1> Create posts </h1>
            <input
                type="text"
                placeholder="Your title"
                // register in useForm
                {...register("title")}
            />
            <textarea placeholder="Your title" {...register("body")} />
            <button type="submit">Create Post</button>
        </form>
    );
}

export default CreatePostPage;
