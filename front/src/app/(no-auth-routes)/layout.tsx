import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
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
        href: "#about",
        description: "About"
    },
    {
        href: "#solutions",
        description: "Solutions"
    },
    {
        href: "/sign-up",
        description: "Sign Up"
    }
];

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions);

    if (session) {
        redirect('/dashboard')
    }

    return <>
        <NavBar navLinks={menuItems} />
        {children}
        <Footer />
    </>
};