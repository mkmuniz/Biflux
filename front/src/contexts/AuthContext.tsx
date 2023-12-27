"use client"

import { createContext } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: any) {
    const isAuthenticated = false;

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};