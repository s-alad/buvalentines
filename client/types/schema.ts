import { z, ZodEnum, ZodType } from "zod"; // Add new import
import { formdata } from "./form";
import { College } from "./form";

export const matchschema: ZodType<formdata> = z
    .object({
        email: z.string().email(),
        name: z.string(),
        age: z.number().int().positive(),
        college: z.nativeEnum(College)
    })
    .refine((data) => {}, {

    });