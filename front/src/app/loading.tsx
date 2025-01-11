import React from 'react';
import Image from 'next/image';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm z-50">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] rounded-full blur-lg opacity-20"></div>
                <Image 
                    src="/logo.png" 
                    width={80} 
                    height={80} 
                    alt="logo" 
                    className="relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                />
            </div>
            <div className="flex gap-2 mt-6">
                <div className="w-2 h-2 bg-white rounded-full animate-[bounce_1s_infinite_0ms]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-[bounce_1s_infinite_400ms]"></div>
            </div>
        </div>
    );
};

export default Loading;
