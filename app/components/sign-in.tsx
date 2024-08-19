import { signIn } from "@/auth";

export default function SignIn() {
    return (
        <form
            onSubmit={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    );
}
