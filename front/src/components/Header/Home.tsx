"use client"

import React, { useRef, MutableRefObject } from "react";
import { useIsVisible } from "@/hooks/useIsVisible";

import Image from "next/image";

import Section from "../Section/Section";
import Container from "../Container/Container";

export default function Header() {
    const refHeaderTitle = useRef<HTMLSpanElement>(null);
    const refHeaderSubtext = useRef<HTMLSpanElement | HTMLParagraphElement>(null);

    const isVisibleHeaderTitle = useIsVisible(refHeaderTitle);
    const isVisibleHeaderSubtext = useIsVisible(refHeaderSubtext);

    return (
        <Section styles="bg-standard">
            <Container>
                <div className="w-full text-white text-center font-outfit flex justify-center items-center h-screen flex-col select-none">
                    <span ref={refHeaderTitle} className={`text-4xl transition-all duration-500 ${isVisibleHeaderTitle ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        <Image src="/logo.png" width={75} height={75} alt="teste" />
                    </span>
                    <span ref={refHeaderSubtext as MutableRefObject<HTMLSpanElement>} className={`text-white text-4xl transition-all duration-700 ${isVisibleHeaderSubtext ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                        Biflux
                    </span>
                    <p ref={refHeaderSubtext as MutableRefObject<HTMLParagraphElement>} className={`text-gray-200 transition-all duration-700 ${isVisibleHeaderSubtext ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                        Your personal billets dashboard
                    </p>
                </div>
            </Container>
        </Section>
    );
}
