import { useContext, createContext, useState, useEffect } from "react";
import {
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
} from "firebase/auth";

import { User } from "firebase/auth";
import { auth } from "@/firebase/firebaseconfig";
import { useRouter } from "next/router";

interface IAuthContext {
	user: User | null;
	googlesignin: () => void;
	logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
	user: null,
	googlesignin: () => { },
	logout: () => { },
});

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	let router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	function googlesignin() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((result) => {
		}).catch((error) => {
			console.log(error);
		});
	};
	function logout() { signOut(auth); };

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			// check if its a login or logout
			// if its a login then redirect to the main page
			console.log(currentUser?.toJSON());
			if (currentUser) { router.push("/matchmaking");}
			else { router.push("/");}
		});
		return () => unsubscribe();
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, googlesignin, logout }}>
			{children}
		</AuthContext.Provider>
	);
};