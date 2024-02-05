import { z, ZodEnum, ZodType } from "zod"; // Add new import
import { formdata, Personality, Traits } from "./form";
import { College, Year } from "./form";

export const matchschema: ZodType<formdata> = z
    .object({
        email: z.string().email(),
        name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be between 2 and 50 characters"),
        age: z.number(
            { invalid_type_error: 'Enter a number' }
        ).int().min(18, "You must be at least 18 years old").max(25, "Too old get a job!!"),
        gender: z.enum(["male", "female", "nonbinary", "other"], {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your gender'};
            }
        }),
        preferredgender: z.enum(["male", "female", "nonbinary", "other"], {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your gender'};
            }
        }),
        /* preferredage: z.number(
            { invalid_type_error: 'Enter a number' }
        ).int().min(18).max(25), */
        /* college: z.nativeEnum(College , {
            required_error: "Please select a college",
            invalid_type_error: "Please select a valid college"
        }), */
        year: z.nativeEnum(Year, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your year'};
            },
        }),
        personality: z.nativeEnum(Personality, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your personality'};
            },
        }),
        traits: z.array(z.enum(Traits), {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one trait'};
            },
        })
    })