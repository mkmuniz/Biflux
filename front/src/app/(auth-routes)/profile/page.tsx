import { nextAuthOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Profile() {
    const session: any = await getServerSession(nextAuthOptions);

    return <>
        <div className="p-4 sm:ml-64 bg-standard-dark">
            <div className="h-screen rounded shadow-xl">
                <form className="rounded h-screen sm:mt-0 mt-16">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input disabled={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={session?.name} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input disabled={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={session?.email} />
                    </div>
                </form>
            </div>
        </div>
    </>;
};