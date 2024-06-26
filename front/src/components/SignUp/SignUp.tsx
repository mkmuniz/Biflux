"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/requests/user.requests';

import ButtonSubmit from '../Buttons/Submit';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export default function SignUpForm() {
    const [showPassword, setStatusPassword] = useState(true);
    const [errorSignUp, setError] = useState<string>();
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            if (data.status === 409) return setError('Email already exists');
            router.replace('/login');
        }
    });

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStatusPassword((prevState) => !prevState);
    };

    const handleSignUp: SubmitHandler<SignUpData> = (data) => {
        if (!errors.email && !errors.name) {
            mutate(data);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center sm:mt-12 bg-white">
            <div className="sm:min-w-[400px] flex bg-white rounded items-center justify-center sm:shadow-md">
                <form className="px-8" onSubmit={handleSubmit(handleSignUp)}>
                    <div className="flex items-center justify-center h-32">
                        <span className="text-black font-bold text-center text-2xl w-full">
                            Sign Up
                        </span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-black" htmlFor="name">
                            Name
                        </label>
                        <input
                            {...register("name", {
                                pattern: {
                                    value: /^[a-zA-Z ]{2,30}$/,
                                    message: 'Just use a-z/A-Z characters'
                                },
                                required: 'Name is required'
                            })}
                            className={`shadow appearance-none min-w-[300px] ${errors.name ? 'border-red-400' : ''} border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                            id="name"
                            type="text"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500 text-[12px]">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-black" htmlFor="email">
                            E-mail
                        </label>
                        <input
                            {...register("email", {
                                pattern: {
                                    value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email format'
                                },
                                required: 'Email is required'
                            })}
                            className={`shadow appearance-none ${errors.email ? 'border-red-400' : ''} border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                            id="email"
                            type="text"
                            placeholder="example@mail.com"
                        />
                        {errors.email && <p className="text-red-500 text-[12px]">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-sm mb-2 text-black" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: 'Password is required' })}
                            className="shadow min-w-[300px] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type={showPassword ? "password" : "text"}
                            placeholder="*********"
                        />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 mt-3"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-6" />
                            ) : (
                                <EyeIcon className="w-6" />
                            )}
                        </button>
                    </div>
                    {errorSignUp && <p className="text-xl font-bold text-red-500 mb-10">{errorSignUp}</p>}
                    <div className="flex flex-col items-center justify-between">
                        <ButtonSubmit method="submit" styles="flex items-center font-bold justify-center w-full text-black relative h-[40px] overflow-hidden border border-gray-300 rounded px-3 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-standard before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full">
                            <span className="relative z-10">SIGN UP</span>
                        </ButtonSubmit>
                        <Link className="m-6 inline-block align-baseline font-bold hover:text-blue-gray-700 transition-all text-sm text-black" href="/login">
                            Have an account already?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
