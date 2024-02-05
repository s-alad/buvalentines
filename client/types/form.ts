import { FieldError, UseFormRegister } from "react-hook-form";

export type formdata = {
    email: string;
    name: string;
    age: number;
    year: Year;
    gender: "male" | "female" | "nonbinary" | "other";
    personality: Personality;
    traits: Trait[];
    preferredgender: "male" | "female" | "nonbinary" | "other";
    /* preferredage: number; */
};

export type formfield = {
    type: string;
    placeholder?: string;
    name: ValidFieldNames;
    register: UseFormRegister<formdata>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    disabled?: boolean;
    defaultvalue?: string | undefined;
    options?: string[] | number[];
};


export type ValidFieldNames =
    | "email"
    | "name"
    | "age"
    | "gender"
    | "year"
    | "personality"
    | "traits"
    | "preferredgender";
    /* | "preferredage"; */

export enum Personality {
    "Introvert" = "Introvert",
    "Extrovert" = "Extrovert",
    "Ambivert" = "Ambivert",
}

export const Traits = [
    "Adventurous",
    "Artistic",
    "Athletic",
    "Bookish",
    "Caring",
    "Creative",
    "Curious",
    "Energetic",
    "Funny",
    "Generous",
    "Honest",
    "Kind",
    "Loyal",
    "Optimistic",
    "Patient",
    "Reliable",
    "Responsible",
    "Silly",
    "Smart",
    "Spontaneous",
    "Thoughtful",
    "Trustworthy",
] as const;

export type Trait = typeof Traits[number];

export enum Year {
    "Freshman" = "2024",
    "Sophmore" = "2025",
    "Junior" = "2026",
    "Senior" = "2027",
    "Alumni" = "Alumni",
}

export enum College {
    CAS = "CAS",
    QST = "QST",
    CGS = "CGS",
    COM = "COM",
    ENG = "ENG",
    CFA = "CFA",
    SHA = "SHA",
    SAR = "SAR",
    SED = "SED",
    LAW = "LAW",
    MET = "MET",
    SSW = "SSW",
    SPH = "SPH",
    STH = "STH",
    Wheelock = "Wheelock",
    GRS = "GRS",
    Questrom = "Questrom",
    KHC = "KHC",
    Kilachand = "Kilachand",
    Other = "Other",
    Undecided = "Undecided",
}