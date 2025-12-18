import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);
const FROM_MAIL = process.env.RESEND_FROM_MAIL as string;

interface SendEmailValues {
    to: string;
    subject: string;
    text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailValues) {
    await resend.emails.send({
        from: FROM_MAIL,
        to,
        subject,
        text,
    });
}