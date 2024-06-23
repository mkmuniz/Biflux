"use client"

import React, { createContext, ReactNode } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export default function AuthProvider({ children }: AuthProviderProps) {
    const isAuthenticated = false;

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
