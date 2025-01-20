"use client"

import React, { useRef } from "react";

import { useIsVisible } from "@/hooks/useIsVisible";
import { ArrowUpOnSquareIcon, ChartBarSquareIcon, CircleStackIcon } from "@heroicons/react/24/outline";

import Section from "../Section/Section";
import Container from "../Container/Container";

export default function Solutions() {
    const refSolutions = useRef<HTMLDivElement>(null);
    const isVisible: boolean = useIsVisible(refSolutions);

    return (
        <Section styles="bg-black min-h-screen w-full relative overflow-hidden mobile:px-8 px-20">
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>
            
            <Container styles="relative">
                <div id="solutions" className="min-h-screen flex items-center">
                    <div className="w-full">
                        <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent text-center">
                            Our Solutions
                        </h2>
                        
                        <div ref={refSolutions} className="grid sm:grid-cols-3 gap-8">
                            <div className={`bg-zinc-900/80 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] border border-zinc-800
                                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] p-4 rounded-xl mb-6">
                                    <ArrowUpOnSquareIcon className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Upload
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Store your bank slips securely and organized in our platform.
                                </p>
                            </div>

                            <div className={`bg-zinc-900/80 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-700 delay-150 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] border border-zinc-800
                                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] p-4 rounded-xl mb-6">
                                    <CircleStackIcon className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Extraction
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    We automatically extract all important information from your bank slips.
                                </p>
                            </div>

                            <div className={`bg-zinc-900/80 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-700 delay-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] border border-zinc-800
                                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] p-4 rounded-xl mb-6">
                                    <ChartBarSquareIcon className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Dashboard
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    View your data in a personalized and intuitive dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
