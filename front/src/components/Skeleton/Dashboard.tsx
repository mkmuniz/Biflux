import React from "react";

export default function DashboardSkeleton({ id }: any) {
    return <>
        <div className="grid grid-cols-2 gap-4 mb-4 w-full justify-content-center ml-24">
            <div role="status" className="flex items-center justify-center">
                <div className="h-56 w-[500px] bg-blue-gray-400 rounded-lg animate-pulse"></div>
            </div>
            <div role="status" className="flex items-center justify-center">
                <div className="h-56 w-[500px] bg-blue-gray-400 rounded-lg animate-pulse"></div>
            </div>
            <div role="status" className="flex items-center justify-center">
                <div className="h-56 w-[500px] bg-blue-gray-400 rounded-lg animate-pulse"></div>
            </div>
            <div role="status" className="flex items-center justify-center">
                <div className="h-56 w-[500px] bg-blue-gray-400 rounded-lg animate-pulse"></div>
            </div>
        </div>
    </>;
};