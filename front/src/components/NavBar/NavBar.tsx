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

interface NavLinks {
    list: Link[],
    isOpen: boolean,
};

export default function NavBar({ navLinks }: NavBar) {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);
    
    return <>
        <nav className="bg-standard fixed w-full z-20 top-0 start-0 border-b border-gray-200 font-bold">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
                <NavLink href="/" styles={"text-xl font-bold text-white"}>
                    <Image src="/logo.png" width={50} height={50} alt="logo" />
                </NavLink>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <NavLink href="/sign-up" styles="py-2 px-3 text-white hover:text-gray-100 transition-all" description="Sign Up" />
                    <NavLink href="/login" styles="flex items-center justify-center text-white relative h-[40px] w-20 overflow-hidden border rounded px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-standard hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10">LOGIN</span>
                    </NavLink>
                    <button onClick={() => setOpen(!isOpen)} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center md:hidden" aria-controls="navbar-sticky" aria-expanded="false">
                        {isOpen ? (
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
                <div className={`items-center justify-between transition-all duration-500 ${isOpen ? 'mobile:h-screen' : 'mobile:h-0'} w-full md:flex md:w-auto md:order-1 text-white`} id="navbar-sticky">
                    {<NavBarLinks list={navLinks} isOpen={isOpen} />}
                </div>
            </div>
        </nav>
    </>;
};

const NavBarLinks = ({ list, isOpen }: NavLinks) => {
    return <ul className={`flex flex-col text-center items-center justify-center p-4 md:p-0 font-medium md:space-x-8 md:flex-row h-full`}>
        {list.map((link: Link, index: Key) => {
            return <NavLink key={index} href={link.href} description={link.description} styles={`block py-2 px-3 hover:text-gray-100 transition-all duration-500 ${isOpen ? 'mobile:text-xl' : 'mobile:text-[0px] mobile:hidden'}`} />
        })}
    </ul>
};