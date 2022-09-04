import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const LoginPage = () => {
    const { handleSubmit, register } = useForm<CreateUserInput>();
    const router = useRouter();

    // const { mutate, error } = trpc.useMutation(["users.register-user"], {
    //     onError: (err) => {},
    //     onSuccess: () => {
    //         router.push("/login");
    //     },
    // });

    function onSubmit(values: CreateUserInput) {
        // mutate(values);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* {error && <div>{error.message}</div>} */}
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                <br />
                <input type="text" placeholder="Tom" {...register("name")} />
                <button type="submit">Login</button>
            </form>
            <Link href="/register">Register</Link>
        </>
    );
};

export default LoginPage;
