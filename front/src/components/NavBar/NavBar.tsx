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

    const handleLinkClick = () => {
        setOpen(false);
    };
    
    return (
        <nav className={`fixed w-full z-30 top-0 start-0 transition-all duration-300 ${scrolled ? 'bg-black backdrop-blur-lg' : 'bg-transparent'}`}>
            <div className={`${isOpen ? 'w-full' : 'max-w-screen-xl'} flex flex-wrap items-center justify-between mx-auto p-4`}>
                <Logo handleLinkClick={handleLinkClick} />
                <NavButtons 
                    isOpen={isOpen}
                    setOpen={setOpen}
                />
                <NavMenu 
                    isOpen={isOpen}
                    navLinks={navLinks}
                    handleLinkClick={handleLinkClick}
                />
            </div>
        </nav>
    );
}

const Logo = ({ handleLinkClick }: { handleLinkClick: () => void }) => (
    <Link href="/" className="flex items-center" onClick={handleLinkClick}>
        <LogoImage />
        <LogoText />
    </Link>
);

const LogoImage = () => (
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
);

const LogoText = () => (
    <span className="ml-3 text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent">
        BrightFlow
    </span>
);

const NavButtons = ({ 
    isOpen, 
    setOpen 
}: { 
    isOpen: boolean, 
    setOpen: (value: boolean) => void 
}) => (
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <DesktopAuthButtons />
        <MobileMenuButton isOpen={isOpen} setOpen={setOpen} />
    </div>
);

const DesktopAuthButtons = () => (
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
);

const MobileMenuButton = ({ 
    isOpen, 
    setOpen 
}: { 
    isOpen: boolean, 
    setOpen: (value: boolean) => void 
}) => (
    <button 
        onClick={() => setOpen(!isOpen)} 
        className="inline-flex items-center md:hidden"
    >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
    </button>
);

const CloseIcon = () => (
    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MenuIcon = () => (
    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const NavMenu = ({ 
    isOpen, 
    navLinks, 
    handleLinkClick 
}: { 
    isOpen: boolean, 
    navLinks: Link[], 
    handleLinkClick: () => void 
}) => (
    <div className={`items-center justify-between transition-all duration-500 ${isOpen ? 'mobile:h-screen bg-black/95 backdrop-blur-lg fixed top-[72px] left-0 w-full' : 'mobile:h-0'} w-full md:flex md:w-auto md:order-1 md:relative md:top-0 md:bg-transparent`}>
        <ul className={`flex flex-col text-center items-center justify-center p-4 md:p-0 font-medium md:space-x-8 md:flex-row h-full`}>
            <NavLinks 
                navLinks={navLinks}
                isOpen={isOpen}
                handleLinkClick={handleLinkClick}
            />
            <MobileAuthButtons 
                isOpen={isOpen}
                handleLinkClick={handleLinkClick}
            />
        </ul>
    </div>
);

const NavLinks = ({ 
    navLinks, 
    isOpen, 
    handleLinkClick 
}: { 
    navLinks: Link[], 
    isOpen: boolean, 
    handleLinkClick: () => void 
}) => (
    <>
        {navLinks.map((link: Link, index: Key) => (
            <NavLink 
                key={index} 
                href={link.href} 
                description={link.description} 
                styles={`block py-2 px-3 text-gray-300 hover:text-white transition-colors ${isOpen ? 'mobile:text-xl' : 'mobile:text-[0px] mobile:hidden'}`}
                onClick={() => handleLinkClick()}
            />
        ))}
    </>
);

const MobileAuthButtons = ({ 
    isOpen, 
    handleLinkClick 
}: { 
    isOpen: boolean, 
    handleLinkClick: () => void 
}) => (
    <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
        <NavLink 
            href="/sign-up" 
            styles={`py-2 px-4 text-gray-300 hover:text-white transition-colors ${isOpen ? 'mobile:text-xl' : 'mobile:text-[0px] mobile:hidden'}`}
            description="Cadastro"
            onClick={() => handleLinkClick()}
        />
        <NavLink 
            href="/login" 
            styles={`px-6 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 ${isOpen ? 'mobile:text-xl' : 'mobile:text-[0px] mobile:hidden'}`}
            description="Login"
            onClick={() => handleLinkClick()}
        />
    </div>
);