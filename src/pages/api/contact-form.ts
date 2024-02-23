import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { ContactFormRequestSchema, type ContactFormRequest } from '@/schemas/contact-from-request.schema';
import { parse } from 'valibot';

export const POST: APIRoute = async (context) => {


    const responseData = await context.request.json();

    let data: ContactFormRequest;
    try {
        data = parse(ContactFormRequestSchema, responseData);
    } catch(ex) {
        return new Response(JSON.stringify(ex), { status: 400 });
    }

    const { token, email, subject, message, name } = data;

    // create reusable transporter object using the default SMTP transport
    try {
        const isCaptchaValid = await captchaValidator(token);

        if (!isCaptchaValid) {
            return new Response(JSON.stringify({ message: "hCaptcha token is not valid" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const transporter = nodemailer.createTransport({
            host: "mail.mpesteban.dev",
            port: 587,
            secure: false,
            auth: {
                user: import.meta.env.MAIL_USER ?? process.env.MAIL_USER, // generated ethereal user
                pass: import.meta.env.MAIL_PASSWORD ?? process.env.MAIL_PASSWORD, // generated ethereal password
            },
        });

        await transporter.sendMail({
            from: `"${name}" <no-reply@mpesteban.dev>`, // sender address
            replyTo: email,
            to: "contacto@mpesteban.dev", // list of receivers
            subject,
            text: message,
        });

    } catch (ex) {
        console.error("Unexpected error when sending the email.", ex);
        return new Response(JSON.stringify({ message: "Unexpected error when sending the email." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(
        JSON.stringify({ message: 'Message sent!' }), { headers: { 'Content-Type': 'application/json' } }
    );

}


async function captchaValidator(responseKey: string) {

    if (!responseKey) {
        return false;
    }

    // Put secret key here, which we get from google console
    const secretKey = (import.meta.env.CAPTCHA_SECRET_KEY ?? process.env.CAPTCHA_SECRET_KEY) as string;

    // Hitting POST request to the URL, Google will
    // respond with success or error scenario.

    const urlParams = new URLSearchParams({
        secret: secretKey,
        response: responseKey,
    });

    const url = `https://hcaptcha.com/siteverify?` + urlParams.toString();

    // Making POST request to verify captcha

    const response = await fetch(url, {
        method: "POST",
    });

    const jsonResponse: { success: boolean } = await response.json();
    return jsonResponse.success;
}
