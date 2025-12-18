import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({
    plugins: [adminClient()]
});

export const signUpWithEmail = async ({ name, email, password, image, callbackURL }: {
    name: string;
    email: string;
    password: string;
    image?: string | undefined;
    callbackURL?: string | undefined;
    rememberMe?: boolean | undefined;
}) => {
    return await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL,
    });
}

export const signInWithEmail = async ({ email, password, callbackURL, rememberMe }: {
    email: string;
    password: string;
    callbackURL?: string | undefined;
    rememberMe?: boolean | undefined;
}) => {
    return await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL,
    });
}

export const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
        provider: "google",
    });
    return data;
}

export const signInWithGithub = async () => {
    const data = await authClient.signIn.social({
        provider: "github",
    });
    return data;
}