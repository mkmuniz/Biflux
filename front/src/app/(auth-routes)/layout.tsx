import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import SideBar from "@/ui/components/SideBar";

interface PrivateLayoutProps {
    children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect('/home')
    }

    return <>
        <SideBar />
        {children}
    </>
};