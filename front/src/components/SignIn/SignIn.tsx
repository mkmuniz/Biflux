"use client"

import React from 'react';
import { useState, FormEvent } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, SignInResponse } from 'next-auth/react';

import ReCAPTCHA from "react-google-recaptcha";

import ButtonSubmit from '../Buttons/Submit';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface FormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [showPassword, setStatusPassword] = useState(true);
    const { register, handleSubmit, formState } = useForm<FormData>();
    const [error, setError] = useState('');
    const router = useRouter();
    const recaptchaRef = React.createRef<ReCAPTCHA>();

    const { errors } = formState;

    const handleSignIn: SubmitHandler<FormData> = async (data) => {
        const recaptchaValue = recaptchaRef.current?.getValue();

        if (!recaptchaValue) {
            return setError("Please complete the reCAPTCHA");
        } else {
            setError("");
        }

        const result: SignInResponse | undefined = await signIn('credentials', {
            ...data,
            recaptcha: recaptchaValue,
            redirect: false
        });

        if (result?.error) {
            return setError(result.error);
        }

        router.replace('/dashboard');
    };

    function togglePasswordVisibility(e: FormEvent) {
        e.preventDefault();
        setStatusPassword((showPassword) => !showPassword);
    }

    return (
        <div className="w-full h-screen flex items-center justify-center sm:mt-12 sm:bg-standard-dark bg-white">
            <div className="sm:min-w-[400px] sm:min-h-[500px] bg-white grid items-center justify-center rounded">
                <form className="px-8" onSubmit={handleSubmit(handleSignIn)}>
                    <div className="flex items-center justify-center h-32">
                        <span className="text-black font-bold text-center text-2xl">
                            Sign In
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
                            required: 'Email is required'
                        })} className={`shadow border-gray-500 sm:min-w-[300px] border appearance-none ${errors.email ? 'border-red-400' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="email" type="text" placeholder="example@mail.com" />
                        <p className="text-red-500 text-[12px]">{errors.email?.message}</p>
                    </div>
                    <div className="mb-6 relative container mx-auto">
                        <label className="block text-sm mb-2 text-black" htmlFor="password">
                            Password
                        </label>
                        <input {...register("password", {
                            required: 'Password is required'
                        })} className="shadow border-gray-500 border appearance-none rounded sm:min-w-[300px] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type={showPassword ? "password" : "text"} placeholder="*********" />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 mt-3"
                            onClick={(e) => togglePasswordVisibility(e)}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-6" />
                            ) : (
                                <EyeIcon className="w-6" />
                            )}
                        </button>
                    </div>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LdteAEqAAAAAIkIDGrBcU1q3Pz40mTwch-1x50I"
                    />
                    <p className="sm:text-xl font-bold text-red-500 mt-3 mb-3">{error}</p>
                    <div className="flex items-center justify-between flex-col">
                        <div className="w-full">
                            <ButtonSubmit styles="flex items-center font-bold justify-center w-full text-black relative h-[40px] overflow-hidden border border-black rounded px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellow-standard before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full" method="submit">
                                <span className="relative z-10">LOGIN</span>
                            </ButtonSubmit>
                        </div>
                        <div className="p-6">
                            <Link className="inline-block align-baseline font-bold hover:text-blue-gray-300 transition-all text-sm text-black hover:text-blue-hover" href="/sign-up">
                                Don't have an account?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
