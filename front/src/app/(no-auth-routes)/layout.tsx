import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import NavBar from "@/ui/components/NavBar";
import Footer from "@/ui/components/Footer";

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