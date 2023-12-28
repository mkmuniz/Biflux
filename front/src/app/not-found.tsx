"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
    const router = useRouter();

    setTimeout(() => {
        router.push('/home');
    }, 1500);

    return <>
        <div className="h-screen bg-standard flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <Image src="/logo.png" width={100} height={100} alt="logo" />
                <span className="text-3xl font-bold text-white">
                    ERROR 404
                </span>
            </div>
        </div>
    </>;
};