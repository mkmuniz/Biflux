"use client"

import React from "react";
import Link from "next/link";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function logout() {
        await signOut({
            redirect: false
        });

        router.replace('/');
    };

    return <>
        <li>
            <Link onClick={logout} href="/logout" className="flex items-center p-2 text-white rounded-lg group">
                <svg className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                </svg>
            </Link>
        </li>
    </>;
};