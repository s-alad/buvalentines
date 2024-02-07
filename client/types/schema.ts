import { z, ZodEnum, ZodType } from "zod"; // Add new import
import { formdata, Personality, Traits, OneToFive, College, Year, Personalities, Genders, IdealDate, IdealDates, LoveLanguages, Interests  } from "./form";

export const matchschema: ZodType<formdata> = z
    .object({
        email: z.string().email(),
        name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be between 2 and 50 characters"),
        age: z.number(
            { invalid_type_error: 'Enter a number' }
        ).int().min(18, "You must be at least 18 years old").max(25, "Too old get a job!!"),
        gender: z.enum(Genders, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your gender'};
            }
        }),
        year: z.nativeEnum(Year, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your year'};
            },
        }),
        personality: z.enum(Personalities, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one personality'};
            },
        }),
        traits: z.array(z.enum(Traits), {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one trait'};
            },
        }),
        idealdate: z.array(z.enum(IdealDates), {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one ideal date'};
            },
        }),
        lovelanguage: z.array(z.enum(LoveLanguages), {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one love language'};
            },
        }),
        interests: z.array(z.enum(Interests), {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one interest'};
            }
        }),

        preferred_age: z.array(z.enum(["18", "19", "20", "21", "22", "23", "24", "25"], {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one age'};
            }
        })),
        preferred_gender: z.enum(Genders, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your preference'};
            }
        }),
        preferred_personality: z.array(z.enum(Personalities), {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one personality'};
            },
        }),
        preferred_traits: z.array(z.enum(Traits), {
            errorMap: (issue, ctx) => {
                return {message: 'Please select at least one trait'};
            },
        }),
        preferred_intelligence: z.nativeEnum(OneToFive, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your preference'};
            },
        }),
        preferred_atractiveness: z.nativeEnum(OneToFive, {
            errorMap: (issue, ctx) => {
                return {message: 'Please select your preference'};
            },
        }), 

        message: z.string().max(500, "Message must be less than 500 characters"),
    })