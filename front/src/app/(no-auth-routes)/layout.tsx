import { ReactNode } from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/authOptions";

import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

interface PrivateLayoutProps {
    children: ReactNode
}

interface MenuItem {
    href: string;
    description: string;
}

const menuItems: MenuItem[] = [
    {
        href: "/",
        description: "Home"
    },
    {
        href: "/#solutions",
        description: "Nossas Soluções"
    },
    {
        href: "/#about",
        description: "Sobre Nós"
    },
];

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions);

    if (session) {
        redirect('/user/home')
    }

    return <>
        <NavBar navLinks={menuItems} />
        {children}
        <Footer />
    </>
};