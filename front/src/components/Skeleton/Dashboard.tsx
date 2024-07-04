import React from "react";

export default function DashboardSkeleton({ id }: any) {
    return <>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 w-full justify-content-center ml-24">
            <div role="status" className="flex items-center justify-center">
                <div className="h-56 max-w-[500px] w-full bg-blue-gray-400 rounded-lg animate-pulse mr-4"></div>
            </div>
            <div role="status" className="flex items-center justify-center">
                <div className="h-56 max-w-[500px] w-full bg-blue-gray-400 rounded-lg animate-pulse mr-4"></div>
            </div>
            <div role="status" className="flex items-center justify-center">
                <div className="h-56 max-w-[500px] w-full bg-blue-gray-400 rounded-lg animate-pulse mr-4"></div>
            </div>
            <div role="status" className="flex items-center justify-center">
                <div className="h-56 max-w-[500px] w-full bg-blue-gray-400 rounded-lg animate-pulse mr-4"></div>
            </div>
        </div>
    </>;
};