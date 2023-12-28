"use client"

import { updateUser } from "@/requests/user.requests";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm({ session }: any) {
    const { mutate } = useMutation({
        mutationFn: updateUser,
    });
    const { register, handleSubmit, formState } = useForm();

    return <>
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
    </>;
};