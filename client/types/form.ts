import { FieldError, UseFormRegister } from "react-hook-form";

export type formdata = {
    email: string;
    name: string;
    age: number;
    /* college: College; */
    year: Year;
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
    options?: string[];
};


export type ValidFieldNames =
    | "email"
    | "name"
    | "age"
    /* | "college" */
    | "year";

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