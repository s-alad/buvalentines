import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Ages, College, formdata, IdealDates, LoveLanguages, OneToFive, Personalities, Personality, Traits, Year } from "@/types/form";
import { useAuth } from "@/context/authcontext";
import { zodResolver } from "@hookform/resolvers/zod";
import s from "./matchmaking.module.scss";
import Unauthorized from "@/components/unauthorized/unauthorized";

import MatchInput from "@/components/match-input/match-input";
import { matchschema } from "@/types/schema";
import MatchSelect from "@/components/match-select/match-select";
import MatchCheck from "@/components/match-check/match-check";

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import Loader from "@/components/loader/loader";

export default function Matchmaking() {
    const { user, googlesignin, logout } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setError, formState: { errors } } = useForm<formdata>({
        resolver: zodResolver(matchschema),
        defaultValues: { email: user?.email || "", },
    });

    async function checkSubmitted() {
        const docRef = doc(db, "users", user?.email!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setSubmitted(docSnap.data().submitted);
        } else {
            console.log("No such document!");
        }
        setLoading(false);
    }

    async function onSubmit(data: formdata) {
        setLoading(true);
        console.log("SUCCESS", data);
        try {
            await setDoc(doc(db, "unmatched", user?.email!), { ...data, uid: user?.uid });
            setLoading(false);
            setSubmitted(true);
        } catch (err) {
            console.error("Error adding document: ", err);
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("CHECKING SUBMIT")
        setLoading(true);
        if (user) { checkSubmitted(); }
    }, [user]);

    if (!user) { return (<Unauthorized />); }

    return (
        <>
            <nav className={s.nav}>
                <h1 onClick={async () => { await console.log(await user.getIdTokenResult()) }}>
                    Matchmaking
                </h1>

                <div className={s.logout}>
                    {user?.email}
                    <button onClick={() => { logout(); }} >
                        Logout
                    </button>
                </div>
            </nav>

            <main className={s.matchmaking}>

                {
                    loading ? <Loader />:
                        submitted ? 
                            <p className={s.submitted}>
                                Thank you for submitting {user?.displayName?.split(" ")[0]}! <br />
                                BU Valentines will match you with your perfect terrier soon!
                            </p> :
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
                                <MatchSelect
                                    type="text"
                                    name="gender"
                                    register={register}
                                    error={errors.gender}
                                    options={["male", "female", "nonbinary", "other"]}
                                />
                                <MatchSelect
                                    type="text"
                                    name="year"
                                    register={register}
                                    error={errors.year}
                                    options={Object.values(Year)}
                                />
                                <MatchSelect
                                    type="text"
                                    name="personality"
                                    description="personality type"
                                    register={register}
                                    error={errors.personality}
                                    options={Object.values(Personalities)}
                                />
                                <MatchCheck
                                    type="checkbox"
                                    name="lovelanguage"
                                    register={register}
                                    error={errors.lovelanguage as any}
                                    options={Object.values(LoveLanguages)}
                                    description="select your love languages"
                                />
                                <MatchCheck
                                    type="checkbox"
                                    name="traits"
                                    register={register}
                                    error={errors.traits as any}
                                    options={Object.values(Traits)}
                                    description="select your traits"
                                />
                                <MatchCheck
                                    type="checkbox"
                                    name="idealdate"
                                    register={register}
                                    error={errors.idealdate as any}
                                    options={Object.values(IdealDates)}
                                    description="select your ideal dates"
                                />

                                <div className={s.matchdetails}>
                                    <div className={s.horizontal}></div>
                                    <div>match preferences</div>
                                    <div className={s.horizontal}></div>
                                </div>

                                <MatchSelect
                                    type="text"
                                    name="preferred_gender"
                                    register={register}
                                    error={errors.preferred_gender}
                                    options={["male", "female", "nonbinary", "other"]}
                                    description="select your preferred gender"
                                />
                                <MatchCheck
                                    type="checkbox"
                                    name="preferred_traits"
                                    register={register}
                                    error={errors.traits as any}
                                    options={Object.values(Traits)}
                                    description="select your preferred partner's traits"
                                />
                                <MatchCheck
                                    type="checkbox"
                                    name="preferred_age"
                                    register={register}
                                    error={errors.preferred_age as any}
                                    options={Object.values(Ages)}
                                    description="select your preferred partner's age"
                                />
                                <MatchCheck
                                    type="select"
                                    name="preferred_personality"
                                    register={register}
                                    error={errors.preferred_personality as any}
                                    options={Object.values(Personalities)}
                                    description="select your preferred partner personality type"
                                />
                                <MatchSelect
                                    type="select"
                                    name="preferred_atractiveness"
                                    register={register}
                                    error={errors.preferred_atractiveness}
                                    options={Object.values(OneToFive)}
                                    description="how important is physcial attractiveness to you? (1 least - 5 most)"
                                />
                                <MatchSelect
                                    type="select"
                                    name="preferred_intelligence"
                                    register={register}
                                    error={errors.preferred_intelligence}
                                    options={Object.values(OneToFive)}
                                    description="how important is intelligence to you? (1 least - 5 most)"
                                />

                                <div className={s.matchdetails}>
                                    <div className={s.horizontal}></div>
                                    <div>Send your future lover a note</div>
                                    <div className={s.horizontal}></div>
                                </div>
                                <MatchInput
                                    type="text"
                                    name="message"
                                    register={register}
                                    error={errors.message}
                                    description="be nice"
                                    inputstyle="textarea"
                                />


                                <div className={s.matchdetails}>
                                    <div className={s.horizontal}></div>
                                    <div>submit</div>
                                    <div className={s.horizontal}></div>
                                </div>
                                <button type="submit" className={s.submitmatch} onClick={() => console.log(
                                    errors
                                )}>
                                    Submit
                                </button>
                            </form>
                }
            </main>
        </>
    );
}