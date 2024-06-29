"use client"

import React, { useRef } from "react";

import { useIsVisible } from "@/hooks/useIsVisible";

import { ChartBarSquareIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

import Container from "../Container/Container";
import Section from "../Section/Section";

export default function Solutions() {
    const refSolutions = useRef<HTMLDivElement>(null);
    const isVisible: boolean = useIsVisible(refSolutions);

    return (
        <Section styles="bg-standard">
            <Container>
                <div id="solutions" className="h-screen grid">
                    <div className="grid sm:grid-cols-3 items-center justify-items-center h-screen font-outfit">
                        <div className="flex flex-col items-center text-center">
                            <div ref={refSolutions}>
                                <ArrowUpOnSquareIcon className={`w-20 text-white transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`} />
                            </div>
                            <span className="text-yellow-standard font-bold text-2xl">
                                UPLOAD
                            </span>
                            <p className="text-white">
                                Store your billets in a safe way
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div ref={refSolutions}>
                                <CircleStackIcon className={`w-20 text-white transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`} />
                            </div>
                            <span className="text-yellow-standard font-bold text-2xl">
                                EXTRACTION
                            </span>
                            <p className="text-white">
                                Extract all informations from your billets stored
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div ref={refSolutions}>
                                <ChartBarSquareIcon className={`w-20 text-white transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`} />
                            </div>
                            <span className="text-yellow-standard font-bold text-2xl">
                                DASHBOARD
                            </span>
                            <p className="text-white">
                                A dashboard personalized for your informations
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
