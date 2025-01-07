import Image from "next/image";
import React from "react";

interface Session {
    user?: {
        name?: string;
        email?: string;
    }
}

interface ProfileFormProps {
    session: Session;
}

export default function ProfileForm({ session }: ProfileFormProps) {
    return (
        <>
            <form className="rounded h-full sm:mt-0 mt-16 md:shadow-lg p-6 xl:w-2/5 lg:w-3/5 w-full mobile:h-screen">
                <div className="mb-4 w-full flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full">
                        <Image src={"/assets/icons/profile-default-placeholder.png"} width={128} height={128} alt="Profile default picture" className="h-full w-full" />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        disabled={true}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder={session?.user?.name}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        disabled={true}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder={session?.user?.email}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Password
                    </label>
                    <input
                        disabled={true}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="text"
                        placeholder="**********"
                    />
                </div>
                <div className="flex items-center justify-center relative">
                    <button className="z-20 px-3 py-3 bg-standard text-white rounded shadow-standard shadow-[0_0_-15px_-15px_rgba(0,0,0,0.3)] transition-colors duration-500 hover:bg-standard-hover w-full">
                        Save Changes
                    </button>
                </div>
            </form>
        </>
    );
}
