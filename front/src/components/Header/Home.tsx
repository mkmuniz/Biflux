"use client"

import React, { useRef, MutableRefObject } from "react";
import { useIsVisible } from "@/hooks/useIsVisible";
import Image from "next/image";
import Section from "../Section/Section";
import Container from "../Container/Container";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const refHeaderTitle = useRef<HTMLDivElement>(null);
    const refHeaderSubtext = useRef<HTMLSpanElement | HTMLParagraphElement>(null);

    const isVisibleHeaderTitle = useIsVisible(refHeaderTitle);
    const isVisibleHeaderSubtext = useIsVisible(refHeaderSubtext);

    return (
        <Section styles="bg-black min-h-screen w-full relative overflow-hidden">
            <div className="absolute top-1/4 -left-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>

            <Container styles="relative">
                <div className="w-full text-white text-center font-outfit flex justify-center items-center h-screen flex-col select-none gap-8">
                    <div ref={refHeaderTitle} className={`transition-all duration-700 ${isVisibleHeaderTitle ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] rounded-full blur-lg opacity-20"></div>
                            <Image
                                src="/logo.png"
                                width={100}
                                height={100}
                                alt="Biflux Logo"
                                className="relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <span
                            ref={refHeaderSubtext as MutableRefObject<HTMLSpanElement>}
                            className={`text-5xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent transition-all duration-700 
                            ${isVisibleHeaderSubtext ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
                        >
                            Biflux
                        </span>

                        <p
                            ref={refHeaderSubtext as MutableRefObject<HTMLParagraphElement>}
                            className={`text-xl text-gray-400 max-w-lg mx-auto leading-relaxed transition-all duration-700 
                            ${isVisibleHeaderSubtext ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
                        >
                            Transforme a gestão dos seus boletos em uma experiência moderna e eficiente.
                            Monitore seu consumo de energia de forma inteligente.
                        </p>

                        <div className={`transition-all duration-1000 delay-300 ${isVisibleHeaderSubtext ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <button
                                onClick={() => router.push('/sign-up')}
                                className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105"
                            >
                                Comece Agora
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
