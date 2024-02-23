import { email, object, string, minLength } from "valibot";
import type { Input } from "valibot";

export const ContactFormRequestSchema = object({
    email: string([email(), minLength(1)]),
    subject: string([minLength(1)]),
    message: string([minLength(1)]),
    token: string(),
    name: string([minLength(1)])
});

export type ContactFormRequest = Input<typeof ContactFormRequestSchema>;