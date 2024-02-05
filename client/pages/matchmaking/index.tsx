import React from "react";
import { useForm } from "react-hook-form";
import { College, formdata, Year } from "@/types/form";
import { useAuth } from "@/context/authcontext";
import { zodResolver } from "@hookform/resolvers/zod";
import s from "./matchmaking.module.scss";
import Unauthorized from "@/components/unauthorized/unauthorized";

import MatchInput from "@/components/match-input/match-input";
import { matchschema } from "@/types/schema";
import MatchSelect from "@/components/match-select/match-select";

export default function Matchmaking() {
    const { user, googlesignin, logout } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<formdata>({
        resolver: zodResolver(matchschema),
        defaultValues: {
            email: user?.email || "",
        },
    });

    const onSubmit = async (data: formdata) => {
        console.log("SUCCESS", data);
    }

    if (!user) { return ( <Unauthorized /> );}

    return (
        <main className={s.matchmaking}>
            <h1 onClick={async () => { await console.log(await user.getIdTokenResult()) }}>
                Matchmaking
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className={s.matchform}>
                <div className={s.matchdetails}>
                    <div className={s.horizontal}></div>
                    <div>your details</div>
                    <div className={s.horizontal}></div>
                </div>
                <MatchInput
                    type="email"
                    name="email"
                    register={register}
                    error={errors.email}
                    defaultvalue={user.email || ""}
                    disabled={true}
                />
                <MatchInput
                    type="text"
                    name="name"
                    register={register}
                    error={errors.name}
                    placeholder="Terrier"
                />
                <MatchInput
                    type="number"
                    name="age"
                    register={register}
                    error={errors.age}
                    placeholder="69"
                    valueAsNumber={true}
                />
                {/* <MatchSelect
                    type="text"
                    name="college"
                    register={register}
                    error={errors.college}
                    options={Object.values(College)}
                />  */}
                <MatchSelect
                    type="text"
                    name="year"
                    register={register}
                    error={errors.year}
                    options={Object.values(Year)}
                />
                <div className={s.matchdetails}>
                    <div className={s.horizontal}></div>
                    <div>match preferences</div>
                    <div className={s.horizontal}></div>
                </div>

                

                <button type="submit" className={s.submitmatch} onClick={()=>console.log("submit")}>
                    Submit
                </button>
            </form>
            
            <div>{user?.email}</div>
            <button onClick={() => {logout();}} >
                Logout
            </button>
        </main>
    );
}