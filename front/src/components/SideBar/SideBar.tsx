'use client'

import { useState } from 'react';

import Image from 'next/image';
import Logo from "@/../public/logo.png";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex bg-standard min-w-screen fixed top-0 w-full z-[99]">
            <div className="flex justify-between p-2 w-full">
                <div className="ml-3 z-[70]">
                    <a className="flex-none" href="#">
                        <Image src={Logo} alt="Biflux Logo" className="w-10 h-10" />
                    </a>
                </div>
                <div>
                    <button
                        type="button"
                        className="p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-standard text-white shadow-sm hover:bg-blue-700"
                        onClick={toggleSidebar}
                        aria-controls="sidebar-mini"
                        aria-label="Toggle navigation"
                    >
                        <span className="sr-only">Toggle Navigation</span>
                        <svg
                            className="flex-shrink-0 size-4"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                className="text-white"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`fixed top-0 left-0 bottom-0 min-h-screen mt-12 h-full z-[60] bg-standard transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}>
                <div className="flex flex-col justify-center items-center gap-y-2 py-4">
                    <div className="hs-tooltip inline-block">
                        <a
                            href="/dashboard"
                            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white"
                        >
                            Billets
                        </a>
                    </div>

                    <div className="hs-tooltip inline-block">
                        <a
                            href="/profile"
                            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white"
                        >
                            Perfil
                        </a>
                    </div>
                </div>
            </div>
            <div
                id="sidebar-mini"
                className={`hs-overlay transition-all duration-300 transform fixed top-0 left-0 bottom-0 z-[60] mt-12 bg-standard w-20`}
            >
                <div className="flex flex-col justify-center items-center gap-y-2 py-4">
                    <div className="hs-tooltip inline-block">
                        <a
                            href="/dashboard"
                            className="hs-tooltip-toggle w-[32px] h-[32px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white"
                        >
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 7H8.2C7.0799 7 6.51984 7 6.09202 7.21799C5.71569 7.40973 5.40973 7.71569 5.21799 8.09202C5 8.51984 5 9.0799 5 10.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H11.8C12.9201 21 13.4802 21 13.908 20.782C14.2843 20.5903 14.5903 20.2843 14.782 19.908C15 19.4802 15 18.9201 15 17.8V17M19 8V13.8C19 14.9201 19 15.4802 18.782 15.908C18.5903 16.2843 18.2843 16.5903 17.908 16.782C17.4802 17 16.9201 17 15.8 17H12.2C11.0799 17 10.5198 17 10.092 16.782C9.71569 16.5903 9.40973 16.2843 9.21799 15.908C9 15.4802 9 14.9201 9 13.8V6.2C9 5.0799 9 4.51984 9.21799 4.09202C9.40973 3.71569 9.71569 3.40973 10.092 3.21799C10.5198 3 11.0799 3 12.2 3H14M19 8L14 3M19 8H15.6C15.0399 8 14.7599 8 14.546 7.89101C14.3578 7.79513 14.2049 7.64215 14.109 7.45399C14 7.24008 14 6.96005 14 6.4V3" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                    <div className="hs-tooltip inline-block">
                        <a
                            href="/profile"
                            className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white "
                        >
                            <svg
                                className="flex-shrink-0 size-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
