import React from "react";

interface Session {
    name?: string;
    email?: string;
}

interface ProfileFormProps {
    session: Session;
}

export default function ProfileForm({ session }: ProfileFormProps) {
    return (
        <>
            <form className="rounded h-full sm:mt-0 mt-16 md:shadow-lg p-6 xl:w-2/5 lg:w-3/5 w-full mobile:h-screen">
                <div className="mb-4 w-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-standard rounded-full">

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
                        placeholder={session?.name}
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
                        placeholder={session?.email}
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
                    <button className="z-20 px-3 py-3 bg-standard text-white rounded shadow-standard shadow-[0_0_-15px_-15px_rgba(0,0,0,0.3)] w-full">
                        Save Changes
                    </button>
                    <span className="z-10 bg-standard-dark absolute w-full px-3 py-6 rounded inset-1 inset-x-1" />
                </div>
            </form>
        </>
    );
}
