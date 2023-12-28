import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { nextAuthOptions } from "@/lib/authOptions";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface PrivateLayoutProps {
    children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions);

    if (session) {
        redirect('/dashboard')
    }

    return <>
        <NavBar />
        {children}
        <Footer />
    </>
};