import React from "react";
import { useForm } from "react-hook-form";
import { formdata } from "@/types/form";
import { useAuth } from "@/context/authcontext";
import { zodResolver } from "@hookform/resolvers/zod";
import s from "./matchmaking.module.scss";
import Unauthorized from "@/components/unauthorized/unauthorized";

import MatchInput from "@/components/match-input/match-input";
import { matchschema } from "@/types/schema";

export default function Matchmaking() {
    const { user, googlesignin, logout } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<formdata>({
        resolver: zodResolver(matchschema),
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
                    placeholder="First Name"
                />
                <MatchInput
                    type="number"
                    name="age"
                    register={register}
                    error={errors.age}
                    placeholder="Age"
                    valueAsNumber={true}
                />
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
            
            <div>{user?.email}</div>
            <button onClick={() => {logout();}}>
                Logout
            </button>
        </main>
    );
}