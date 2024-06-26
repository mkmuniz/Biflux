import React from "react";
import { nextAuthOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import ProfileForm from "@/components/Forms/Profile";

export default async function Profile() {
    const session: any = await getServerSession(nextAuthOptions);

    return <>
        <div className="p-4 sm:ml-64 bg-standard-dark">
            <div className="h-screen rounded shadow-xl">
                <ProfileForm session={session} />
            </div>
        </div>
    </>;
};