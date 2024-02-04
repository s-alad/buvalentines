import React from "react";

import { useAuth } from "@/context/authcontext";

export default function Matchmaking() {
    const { user, googlesignin, logout } = useAuth();

    if (!user) {
        return (
            <div>
                unauthorized
            </div>
        );
    }

    return (
        <div>
            <h1
                onClick={async () => { await console.log(await user.getIdTokenResult()) }}
            >Matchmaking</h1>
            <div>{user?.email}</div>
            <button
                onClick={() => {
                    logout();
                }}
            >
                Logout
            </button>
        </div>
    );
}