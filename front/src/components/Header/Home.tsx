"use client"

import React, { useRef, MutableRefObject } from "react";

import { useIsVisible } from "@/hooks/useIsVisible";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Section from "../Section/Section";
import Container from "../Container/Container";

export default function Header() {
    const router = useRouter();
    const refHeaderTitle = useRef<HTMLDivElement>(null);
    const refHeaderSubtext = useRef<HTMLSpanElement | HTMLParagraphElement>(null);

    const isVisibleHeaderTitle = useIsVisible(refHeaderTitle);
    const isVisibleHeaderSubtext = useIsVisible(refHeaderSubtext);

    return (
        <Section styles="bg-black min-h-screen w-full relative overflow-hidden">
            <BackgroundEffects />
            <Container styles="relative">
                <HeaderContent 
                    refHeaderTitle={refHeaderTitle}
                    refHeaderSubtext={refHeaderSubtext}
                    isVisibleHeaderTitle={isVisibleHeaderTitle}
                    isVisibleHeaderSubtext={isVisibleHeaderSubtext}
                    router={router}
                />
            </Container>
        </Section>
    );
}

const BackgroundEffects = () => (
    <>
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>
    </>
);

const HeaderContent = ({ 
    refHeaderTitle, 
    refHeaderSubtext, 
    isVisibleHeaderTitle, 
    isVisibleHeaderSubtext,
    router
}: { 
    refHeaderTitle: React.RefObject<HTMLDivElement>,
    refHeaderSubtext: React.RefObject<HTMLSpanElement | HTMLParagraphElement>,
    isVisibleHeaderTitle: boolean,
    isVisibleHeaderSubtext: boolean,
    router: any
}) => (
    <div className="w-full text-white text-center font-outfit flex justify-center items-center h-screen flex-col select-none gap-8">
        <LogoSection 
            refHeaderTitle={refHeaderTitle}
            isVisibleHeaderTitle={isVisibleHeaderTitle}
        />
        <ContentSection 
            refHeaderSubtext={refHeaderSubtext}
            isVisibleHeaderSubtext={isVisibleHeaderSubtext}
            router={router}
        />
    </div>
);

const LogoSection = ({ 
    refHeaderTitle, 
    isVisibleHeaderTitle 
}: { 
    refHeaderTitle: React.RefObject<HTMLDivElement>,
    isVisibleHeaderTitle: boolean
}) => (
    <div ref={refHeaderTitle} className={`transition-all duration-700 ${isVisibleHeaderTitle ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] rounded-full blur-lg opacity-20"></div>
            <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="BrightFlow Logo"
                className="relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            />
        </div>
    </div>
);

const ContentSection = ({ 
    refHeaderSubtext, 
    isVisibleHeaderSubtext,
    router
}: { 
    refHeaderSubtext: React.RefObject<HTMLSpanElement | HTMLParagraphElement>,
    isVisibleHeaderSubtext: boolean,
    router: any
}) => (
    <div className="space-y-6">
        <BrandTitle 
            refHeaderSubtext={refHeaderSubtext}
            isVisibleHeaderSubtext={isVisibleHeaderSubtext}
        />
        <Description 
            refHeaderSubtext={refHeaderSubtext}
            isVisibleHeaderSubtext={isVisibleHeaderSubtext}
        />
        <CallToAction 
            isVisibleHeaderSubtext={isVisibleHeaderSubtext}
            router={router}
        />
    </div>
);

const BrandTitle = ({ 
    refHeaderSubtext, 
    isVisibleHeaderSubtext 
}: { 
    refHeaderSubtext: React.RefObject<HTMLSpanElement | HTMLParagraphElement>,
    isVisibleHeaderSubtext: boolean
}) => (
    <span
        ref={refHeaderSubtext as MutableRefObject<HTMLSpanElement>}
        className={`text-5xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent transition-all duration-700 
        ${isVisibleHeaderSubtext ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
    >
        BrightFlow
    </span>
);

const Description = ({ 
    refHeaderSubtext, 
    isVisibleHeaderSubtext 
}: { 
    refHeaderSubtext: React.RefObject<HTMLSpanElement | HTMLParagraphElement>,
    isVisibleHeaderSubtext: boolean
}) => (
    <p
        ref={refHeaderSubtext as MutableRefObject<HTMLParagraphElement>}
        className={`text-xl text-gray-400 max-w-lg mx-auto leading-relaxed transition-all duration-700 
        ${isVisibleHeaderSubtext ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
    >
        Transform your bill management into a modern and efficient experience.
        Monitor your energy consumption intelligently.
    </p>
);

const CallToAction = ({ 
    isVisibleHeaderSubtext,
    router
}: { 
    isVisibleHeaderSubtext: boolean,
    router: any
}) => (
    <div className={`transition-all duration-1000 delay-300 ${isVisibleHeaderSubtext ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <button
            onClick={() => router.push('/sign-up')}
            className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105"
        >
            Start Now
        </button>
    </div>
);
