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
            <form className="rounded h-screen sm:mt-0 mt-16">
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
            </form>
        </>
    );
}
