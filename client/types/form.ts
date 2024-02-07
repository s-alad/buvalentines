import { FieldError, UseFormRegister } from "react-hook-form";

export type formdata = {
    email: string;
    name: string;
    age: number;
    year: Year;
    gender: Gender;
    personality: Personality;
    traits: Trait[];
    idealdate: IdealDate[];
    lovelanguage: LoveLanguage[];
    interests: Interest[];
    preferred_traits: Trait[];
    preferred_gender: Gender;
    preferred_age: Age[];
    preferred_intelligence: OneToFive;
    preferred_atractiveness: OneToFive;
    preferred_personality: Personality[];
    message: string;
};

export type formfield = {
    register: UseFormRegister<formdata>;
    type: string;
    placeholder?: string;
    name: ValidFieldNames;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    disabled?: boolean;
    defaultvalue?: string | undefined;
    description?: string;
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
    | "idealdate"
    | "lovelanguage"
    | "interests"
    | "preferred_gender"
    | "preferred_traits"
    | "preferred_age"
    | "preferred_intelligence"
    | "preferred_atractiveness"
    | "preferred_personality"
    | "message"; 

export enum OneToFive {
    "least" = "1",
    "two" = "2",
    "three" = "3",
    "four" = "4",
    "most" = "5",
}

export const Ages = [ "18", "19", "20", "21", "22", "23", "24", "25"] as const;
export type Age = typeof Ages[number];

export const Genders = [ "male", "female", "nonbinary", "other"] as const;
export type Gender = typeof Genders[number];

export const Personalities = [ "Introvert", "Extrovert", "Ambivert", ] as const;
export type Personality = typeof Personalities[number];

export const LoveLanguages = [ "Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"] as const;
export type LoveLanguage = typeof LoveLanguages[number];

export const Interests = [
    "Art",
    "Books",
    "Cooking",
    "Dancing",
    "Gaming",
    "Hiking",
    "Movies",
    "Music",
    "Photography",
    "Sports",
    "Traveling",
    "Writing",
] as const;
export type Interest = typeof Interests[number];

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

export const IdealDates = [
    "Amusement Park",
    "Art Gallery",
    "Arcade",
    "Bar",
    "Beach",
    "Bookstore",
    "Cafe",
    "Concert",
    "Dinner",
    "Hiking",
    "Museum",
    "Netflix and Chill",
    "Picnic",
    "Theater",
    "Zoo",
] as const;
export type IdealDate = typeof IdealDates[number];

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