import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./email";

export const auth = betterAuth({
    // Plugins
    plugins: [admin()],
    // Database
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    // SIGNIN USING EMAIL AND PASSWORD
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword(data) {
            await sendEmail({
                to: data.user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${data.url}`,
            });
        },
    },
    // EMAIL VERIFICATION
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        async sendVerificationEmail(data) {
            await sendEmail({
                to: data.user.email,
                subject: "Verify your email",
                text: `Click the link to verify your email: ${data.url}`,
            });
        },
    },
    // Better Auth User updates
    user: {
        additionalFields: {
            role: {
                type: ["user", "admin"],
                required: false,
                defaultValue: "user",
                input: false, // Prevents users from setting their own role during signup
            }
        }
    },
    // SIGNIN USING SOCIAL PROVIDERS
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;