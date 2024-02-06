

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import s from "@/pages/index.module.scss";
import * as THREE from "three";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Background from "@/components/background";

import app from "@/firebase/firebaseconfig";
import { getFirestore } from "firebase/firestore";
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/router";
const db = getFirestore(app);


export default function Home() {
	const router = useRouter();
	const { user, status, googlesignin, logout } = useAuth();

	console.log(user);
	return (
		<>
			<Head>
				<title>BU Valentines</title>
				<meta name="description" content="Boston Universities Valentines Matcher" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={s.main}>
				<h1 className={s.action}
					onClick={() => { console.log(user) }}
				>bu valentines</h1>
				{
					user ?
						<div className={s.welcomeback}>
							welcome back {user.displayName?.split(" ")[0]} {"💘"}
							<button className={s.googlesignin}
								onClick={() => {
									router.push("/matchmaking");
								}}
							>
								matchmaking
							</button>
						</div>
						:
						<button className={s.googlesignin}
							onClick={
								() => {
									googlesignin();
								}
							}
						>
							<img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
							Sign In with Google
						</button>
				}
				{status == "nonbu" ? <div className={s.nonbu}>That's not a bu email...</div> : null}
				<Background />
			</main>

		</>
	);
}
