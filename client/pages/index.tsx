

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
const db = getFirestore(app);


export default function Home() {

	const {user, googlesignin, logout} = useAuth();

	const [windowDefined, setWindowDefined] = useState(false);
	useEffect(() => {
		setWindowDefined(true);
	}, []);

	return (
		<>
			<Head>
				<title>BU Valentines</title>
				<meta name="description" content="Boston Universities Valentines Matcher" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={s.main}>
				<h1>bu valentines</h1>
				<button className={s.googlesignin}
					onClick={
						() => {
							googlesignin();
						}
					}
				>
					log in with Googles
				</button>
				<Background />
			</main>

		</>
	);
}
