"use client"

import { signUp } from '@/requests/user.requests';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignUpForm() {
    const [showPassword, setStatusPassword] = useState(true);
    const [errorSignUp, setError] = useState('');
    const { register, handleSubmit, formState } = useForm();
    const router = useRouter();
    const { errors }: any = formState;

    const { mutate } = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            if (data.status === 409) return setError('Email already exists');

            router.replace('/login');
        }
    });

    function togglePasswordVisibility(e: any) {
        e.preventDefault();
        setStatusPassword((showPassword) => !showPassword);
    };

    function handleSignUp(data: any) {
        if (!errors.email.message && !errors.name.message) {
            mutate(data);
        }
    };

    return <>
        <div className="h-screen flex items-center justify-center sm:mt-12 sm:bg-standard-dark bg-white">
            <div className="flex w-3/7 h-4/5 bg-white rounded shadow-sm items-center justify-center">
                <form className="px-8" onSubmit={handleSubmit(handleSignUp)}>
                    <span className="text-black font-bold text-center text-2xl w-full">
                        Not signed up yet?
                    </span>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-black" htmlFor="email">
                            Name
                        </label>
                        <input {...register("name", {
                            pattern: {
                                value: /^[a-zA-Z ]{2,30}$/,
                                message: 'Just use a-z/A-Z characters'
                            },
                            required: true
                        })} className={`${errors.name?.message ? 'border border-red-400' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="name" type="text" placeholder="Full Name" />
                        <p className="text-red-500 text-[12px]">{errors.name?.message}</p>
                    </div>
                    <div className="mb-4">
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
                        <input {...register("password", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type={showPassword ? "password" : "text"} placeholder="*********" />
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
                    <p className="text-xl font-bold text-red-500 mb-10">{errorSignUp}</p>
                    <div className="flex flex-col items-center justify-between">
                        <div className="w-full">
                            <button className="flex items-center font-bold justify-center w-full text-black relative h-[40px] overflow-hidden border border-black rounded px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellow-standard before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full" formMethod="submit">
                                <span className="relative z-10">SIGN UP</span>
                            </button>
                        </div>
                        <div className="mt-6">
                            <Link className="inline-block align-baseline font-bold hover:text-blue-gray-300 transition-all text-sm text-black hover:text-blue-hover" href="/login">
                                Have account already?
                            </Link>
                        </div>
                    </div>
                </form >
            </div>
        </div >
    </>
};