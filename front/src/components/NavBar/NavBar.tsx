"use client"

import React, { Key, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

interface Link {
    href: string,
    description: string,
};

interface NavBar {
    navLinks: Link[]
};

export default function NavBar({ navLinks }: NavBar) {
    const [isOpen, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);
    
    return (
        <nav className={`fixed w-full z-20 top-0 start-0 transition-all duration-300 ${scrolled ? 'bg-black backdrop-blur-lg' : 'bg-transparent'}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] rounded-full blur-lg opacity-20"></div>
                        <Image 
                            src="/logo.png" 
                            width={50} 
                            height={50} 
                            alt="logo" 
                            className="relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        />
                    </div>
                    <span className="ml-3 text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent">
                        Biflux
                    </span>
                </Link>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className="hidden md:flex items-center">
                        <NavLink 
                            href="/sign-up" 
                            styles="py-2 px-4 text-gray-300 hover:text-white transition-colors mr-4" 
                            description="Cadastro" 
                        />
                        <NavLink 
                            href="/login" 
                            styles="px-6 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105"
                            description="Login"
                        />
                    </div>

                    <button 
                        onClick={() => setOpen(!isOpen)} 
                        className="inline-flex items-center md:hidden"
                    >
                        {isOpen ? (
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className={`items-center justify-between transition-all duration-500 ${isOpen ? 'mobile:h-screen bg-black/95 backdrop-blur-lg' : 'mobile:h-0'} w-full md:flex md:w-auto md:order-1`}>
                    <ul className={`flex flex-col text-center items-center justify-center p-4 md:p-0 font-medium md:space-x-8 md:flex-row h-full`}>
                        {navLinks.map((link: Link, index: Key) => (
                            <NavLink 
                                key={index} 
                                href={link.href} 
                                description={link.description} 
                                styles={`block py-2 px-3 text-gray-300 hover:text-white transition-colors ${isOpen ? 'mobile:text-xl' : 'mobile:text-[0px] mobile:hidden'}`} 
                            />
                        ))}
                        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
                            <NavLink 
                                href="/sign-up" 
                                styles={`py-2 px-4 text-gray-300 hover:text-white transition-colors ${isOpen ? 'mobile:text-xl' : 'mobile:text-[0px] mobile:hidden'}`}
                                description="Cadastro" 
                            />
                            <NavLink 
                                href="/login" 
                                styles={`px-6 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 ${isOpen ? 'mobile:text-xl' : 'mobile:text-[0px] mobile:hidden'}`}
                                description="Login"
                            />
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}