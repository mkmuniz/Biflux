import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex gap-1 py-2.5 px-4">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_infinite_0ms]"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_infinite_200ms]"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_infinite_400ms]"></div>
        </div>
    );
};

export default LoadingSpinner; 