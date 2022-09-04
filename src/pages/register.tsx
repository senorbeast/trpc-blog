import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const RegisterPage = () => {
    const { handleSubmit, register } = useForm<CreateUserInput>();
    const router = useRouter();

    const { mutate, error } = trpc.useMutation(["users.register-user"], {
        onError: (err) => {},
        onSuccess: () => {
            router.push("/login");
        },
    });

    function onSubmit(values: CreateUserInput) {
        mutate(values);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <p>{error.message}</p>}
                <h1>Register</h1>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                <br />
                <input type="text" placeholder="Tom" {...register("name")} />
                <button type="submit">Register</button>
            </form>
            <Link href="/login">Login</Link>
        </>
    );
};

export default RegisterPage;
