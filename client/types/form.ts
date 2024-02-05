import { FieldError, UseFormRegister } from "react-hook-form";

export type formdata = {
    email: string;
    name: string;
    age: number;
    college: College;
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
};


export type ValidFieldNames =
    | "email"
    | "name"
    | "age"
    | "college";

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