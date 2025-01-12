import React from 'react';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>
            
            <div className="flex flex-col items-center justify-center space-y-8 relative z-10">
                <Image 
                    src="/logo.png"
                    width={80}
                    height={80}
                    alt="Biflux Logo"
                    className="animate-pulse"
                />
                
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#6B8AF9] animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#00A3FF] animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
            </div>
        </div>
    );
}
