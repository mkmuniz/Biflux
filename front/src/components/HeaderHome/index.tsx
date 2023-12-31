"use client"

import { useIsVisible } from "@/hooks/useIsVisible";
import Image from "next/image";
import React, { useRef } from "react";

export default function Header() {
    const refHeaderTitle: any = useRef();
    const refHeaderSubtext: any = useRef();
    const isVisibleHeaderTitle = useIsVisible(refHeaderTitle);
    const isVisibleHeaderSubtext = useIsVisible(refHeaderSubtext);

    return <>
        <div className="bg-standard w-full text-white text-center font-outfit flex justify-center items-center h-screen flex-col">
            <span ref={refHeaderTitle} className={`text-4xl transition-all duration-500 ${isVisibleHeaderTitle ? 'translate-y-0 opacity-100' :  'translate-y-20 opacity-0'}`}>
                <Image src="/logo.png" width={75} height={75} alt="teste" />
            </span>
            <span ref={refHeaderSubtext} className={`text-white text-4xl transition-all duration-700 ${isVisibleHeaderSubtext ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                Biflux
            </span>
            <p ref={refHeaderSubtext} className={`text-gray-400 transition-all duration-700 ${isVisibleHeaderSubtext ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                Your personal billets dashboard
            </p>
        </div>
    </>;
};