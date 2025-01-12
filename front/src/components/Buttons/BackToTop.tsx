"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className={`fixed bottom-8 right-8 z-[998] transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="relative">
                <button
                    onClick={scrollToTop}
                    className="relative bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-3 rounded-xl text-white 
                        hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
                    aria-label="Voltar ao topo"
                >
                    <ChevronUpIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
