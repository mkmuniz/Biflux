"use client"

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
    const [showPassword, setStatusPassword] = useState(true);
    const { register, handleSubmit, formState } = useForm();
    const [error, setError] = useState('');
    const { errors }: any = formState;

    const router = useRouter();

    async function handleSignIn(data: any) {
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        });

        if (result?.error) {
            return setError(result?.error);
        };

        router.replace('/dashboard');
    };

    function togglePasswordVisibility(e: any) {
        e.preventDefault();
        setStatusPassword((showPassword) => !showPassword);
    };

    return <>
        <div className="h-screen flex items-center justify-center sm:mt-12 sm:bg-standard-dark bg-white w-full">
            <div className=" bg-white grid items-center justify-center rounded shadow-md">
                <form className="px-8" onSubmit={handleSubmit(handleSignIn)}>
                    <div className="flex items-center justify-center h-32">
                        <span className="text-black font-bold text-center text-2xl">
                            Sign in to your account
                        </span>
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-sm mb-2 text-black" htmlFor="email">
                            E-mail
                        </label>
                        <input {...register("email", {
                            pattern: {
                                value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email format'
                            },
                            required: true
                        })} className={`${errors.email?.message ? 'border border-red-400' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="email" type="text" placeholder="example@mail.com" />
                        <p className="text-red-500 text-[12px]">{errors.email?.message}</p>
                    </div>
                    <div className="mb-6 relative container mx-auto">
                        <label className="block text-sm mb-2 text-black" htmlFor="password">
                            Password
                        </label>
                        <input {...register("password", {
                            required: true
                        })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type={showPassword ? "password" : "text"} placeholder="*********" />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 mt-3"
                            onClick={(e: any) => togglePasswordVisibility(e)}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-6" />
                            ) : (
                                <EyeIcon className="w-6" />
                            )}
                        </button>
                    </div>
                    <p className="text-xl font-bold text-red-500 mb-10">{error}</p>
                    <div className="flex items-center justify-between flex-col">
                        <div className="w-full">
                            <button className="flex items-center font-bold justify-center w-full text-black relative h-[40px] overflow-hidden border border-black rounded px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellow-standard before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full" formMethod="submit">
                                <span className="relative z-10">LOGIN</span>
                            </button>
                        </div>
                        <div className="m-2">
                            <Link className="inline-block align-baseline font-bold hover:text-blue-gray-300 transition-all text-sm text-black hover:text-blue-hover" href="/sign-up">
                                Dont have account?
                            </Link>
                        </div>
                    </div>
                </form >
            </div>
        </div >
    </>
};