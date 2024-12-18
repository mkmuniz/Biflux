'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';

import Logo from "@/../public/logo.png";
import HomeIcon from '@/../public/assets/icons/home.svg';
import BilletsTable from '@/../public/assets/icons/table.svg';
import ProfileIcon from '@/../public/assets/icons/profile.svg';
import DashboardIcon from '@/../public/assets/icons/dashboard.svg';
import HamburgerIcon from '@/../public/assets/icons/hamburger.svg';
import CloseIcon from '@/../public/assets/icons/close.svg';

import LogoutButton from '@/app/(auth-routes)/logout/page';
import UserProfileCard from '../UserProfileCard/UserProfileCard';

const sideBarLinks = [
    {
        path: '/user/home',
        description: 'Home',
        icon: HomeIcon,
        alt: 'Biflux Home Icon',
    },
    {
        path: '/billets/table',
        description: 'Billets',
        icon: BilletsTable,
        alt: 'Biflux Billets Table Icon',
    },
    // {
    //     path: '/billets/dashboard',
    //     description: 'Dashboard',
    //     icon: DashboardIcon,
    //     alt: 'Biflux Dashboard Icon',
    // },
    {
        path: '/user/profile',
        description: 'Profile',
        icon: ProfileIcon,
        alt: 'Biflux Hamburger Icon',
    },
];

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return <>
        <div className={`fixed inset-0 z-[50] ${isOpen ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <div className="flex bg-standard min-w-screen fixed top-0 w-full z-[99]">
            <div className="flex justify-between p-2 w-full h-full">
                <div className="ml-3 z-[70]">
                    <a className="flex-none" href="#">
                        <Image src={Logo} className="w-10 h-10" alt="Biflux Logo" />
                    </a>
                </div>
                <div>
                    <button
                        type="button"
                        className="p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-standard text-white shadow-sm"
                        onClick={toggleSidebar}
                        aria-controls="sidebar-mini"
                        aria-label="Toggle navigation"
                    >
                        <span className="sr-only">Toggle Navigation</span>
                        <div className={`transition-transform duration-300 ease-in-out transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                            <Image src={isOpen ? CloseIcon : HamburgerIcon} className="w-6 h-6" alt="Toggle Icon" />
                        </div>
                    </button>
                </div>
            </div>
            <div className={`flex flex-col justify-between fixed top-0 left-0 bottom-0 min-h-screen mt-12 h-full z-[60] bg-standard transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}>
                <div className="flex flex-col justify-center items-center gap-y-2 py-4">
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        {sideBarLinks.map((link) => (
                            <SideBarLink key={link.path} path={link.path} description={link.description} alt={link.alt} />
                        ))}
                    </div>
                </div>
            </div>
            <div
                id="sidebar-mini"
                className={`flex flex-col justify-between hs-overlay transition-all duration-300 transform fixed top-0 left-0 bottom-0 z-[60] mt-12 bg-standard w-20`}
            >
                <div className="flex flex-col justify-center items-center gap-y-2 py-4">
                    {sideBarLinks.map((link) => (
                        <SideBarLink key={link.path} path={link.path} icon={link.icon} alt={link.alt} />
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center mb-6">
                    <LogoutButton />
                </div>
            </div>
        </div>
    </>
};

export default SideBar;

const SideBarLink = ({ path, description, icon, alt }: any) => {
    return (
        <div className="hs-tooltip inline-block">
            <a
                href={path}
                className="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white"
            >
                {icon && <Image src={icon} alt={alt} className="w-6 h-6" />}
                {description}
            </a>
        </div>
    );
};
