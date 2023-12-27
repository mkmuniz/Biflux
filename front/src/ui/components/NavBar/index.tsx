"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function NavBar() {
    const [isOpen, setOpen] = useState(false);

    return <>
        <nav className="bg-standard fixed w-full z-20 top-0 start-0 border-b border-gray-200 font-bold">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
                <Link href="/home">
                    <Image src="https://uploads-ssl.webflow.com/62f9249c43126cafce10bc33/62fd12497ffcb83b28ea3309_logo-lumi-white.svg" width={100} height={100} alt="Logo" />
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link href="/sign-up" className="sm:block hidden py-2 px-3 text-white hover:text-blue-gray-200 transition-all">Sign Up</Link>
                    <Link href="/login" className="flex items-center justify-center text-white relative h-[40px] w-20 overflow-hidden border rounded px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellow-standard before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10">LOGIN</span>
                    </Link>
                    <button onClick={() => setOpen(!isOpen)} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between transition-all duration-500 ${isOpen ? 'visible' : 'hidden'} w-full md:flex md:w-auto md:order-1 text-white`} id="navbar-sticky">
                    <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0`}>
                        <li>
                            <Link href="/home" className="block py-2 px-3 hover:text-blue-gray-200 transition-all" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/home#about" className="block py-2 px-3 hover:text-blue-gray-200 transition-all">About</Link>
                        </li>
                        <li>
                            <Link href="#solutions" className="block py-2 px-3 hover:text-blue-gray-200 transition-all">Services</Link>
                        </li>
                        <li className="sm:hidden">
                            <Link href="/sign-up" className="block py-2 px-3 hover:text-blue-gray-200 transition-all">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>;
};