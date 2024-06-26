import React from "react";

export default function DashboardSkeleton({ id }: any) {    
    return <>
        <div className="p-4 sm:ml-64 bg-standard-dark">
            <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4 items-center content-center h-screen">
                    <div role="status" className="flex items-center justify-center h-56 max-w-sm bg-blue-gray-400 rounded-lg animate-pulse">
                    </div>
                    <div role="status" className="flex items-center justify-center h-56 max-w-sm bg-blue-gray-400 rounded-lg animate-pulse">
                    </div>
                    <div role="status" className="flex items-center justify-center h-56 max-w-sm bg-blue-gray-400 rounded-lg animate-pulse">
                    </div>
                    <div role="status" className="flex items-center justify-center h-56 max-w-sm bg-blue-gray-400 rounded-lg animate-pulse">
                    </div>
                </div>
            </div>
        </div >
    </>;
};