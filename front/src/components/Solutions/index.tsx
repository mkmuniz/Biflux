"use client"

import { useIsVisible } from "@/hooks/useIsVisible";
import { ChartBarSquareIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";

export default function Solutions() {
    const refSolutions: any = useRef();
    const isVisible = useIsVisible(refSolutions);

    return <>
        <div id="solutions" className="h-screen grid bg-standard">
            <div className="grid sm:grid-cols-3 items-center justify-items-center h-screen font-outfit">
                <div className="flex flex-col items-center text-center">
                    <div ref={refSolutions}>
                        <ArrowUpOnSquareIcon className={`w-20 text-white transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`} />
                    </div>
                    <span className="text-yellow-standard font-bold">
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
                    <span className="text-yellow-standard font-bold">
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
                    <span className="text-yellow-standard font-bold">
                        DASHBOARD
                    </span>
                    <p className="text-white">
                        A dashboard personalized for your informations
                    </p>
                </div>
            </div>
        </div>
    </>;
};