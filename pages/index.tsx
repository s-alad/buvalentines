import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import s from "@/pages/index.module.scss";

export default function Home() {
	return (
		<>
			<Head>
				<title>BU Valentines</title>
				<meta name="description" content="Boston Universities Valentines Matcher" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${s.main}`}>
				<h1>BU VALENTINES</h1>
			</main>
		</>
	);
}
