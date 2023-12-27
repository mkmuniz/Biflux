import { ChartBarSquareIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Solutions() {
    return <>
        <div id="solutions" className="h-screen grid bg-standard">
            <div className="grid sm:grid-cols-3 items-center justify-items-center h-screen font-outfit">
                <div className="flex flex-col items-center text-center">
                    <div>
                        <ArrowUpOnSquareIcon className="w-20 text-white" />
                    </div>
                    <span className="text-yellow-standard font-bold">
                        UPLOAD
                    </span>
                    <p className="text-white">
                        Store your billets in a safe way
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div>
                        <CircleStackIcon className="w-20 text-white" />
                    </div>
                    <span className="text-yellow-standard font-bold">
                        EXTRACTION
                    </span>
                    <p className="text-white">
                        Extract all informations from your billets stored
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div>
                        <ChartBarSquareIcon className="w-20 text-white" />
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