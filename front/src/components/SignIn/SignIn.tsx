'use client'

import ReCAPTCHA from "react-google-recaptcha";
import React, { useState, FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, SignInResponse } from 'next-auth/react';

import ButtonSubmit from '../Buttons/Submit';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import PopUpError from '../PopUps/Error';
import PopUpSuccess from '../PopUps/Success';
import LoadingSpinner from '../LoadingSpinner';

interface FormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setStatusPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const recaptchaRef = React.createRef<ReCAPTCHA>();
    const { register, handleSubmit, formState } = useForm<FormData>();

    const { errors } = formState;

    const googleRecaptchaKey: string = String(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY);

    const handleSignIn: SubmitHandler<FormData> = async (data) => {
        const recaptchaValue = recaptchaRef.current?.getValue();

        if (!recaptchaValue) {
            return setError("Please complete the reCAPTCHA");
        } else {
            setError("");
        }

        setLoading(true);

        const result: SignInResponse | undefined = await signIn('user-login', {
            ...data,
            recaptcha: recaptchaValue,
            redirect: false
        });

        setLoading(false);

        if (result?.error) {
            return setError(result.error);
        }

        setSuccess("Successfully logged in!");
        setTimeout(() => {
            router.replace('/user/home');
        }, 5000);
    };

    function togglePasswordVisibility(e: FormEvent) {
        e.preventDefault();
        setStatusPassword((showPassword) => !showPassword);
    }

    return (
        <div className="w-full h-screen flex items-center justify-center sm:mt-12 bg-white">
            <div className="sm:min-w-[400px] sm:min-h-[500px] bg-white grid items-center justify-center rounded sm:shadow-md">
                <form className="px-8" onSubmit={handleSubmit(handleSignIn)}>
                    <div className="flex items-center justify-center h-32">
                        <span className="text-black font-bold text-center text-2xl">
                            Welcome Back!
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
                        })} className={`shadow border-gray-500 border appearance-none rounded sm:min-w-[300px] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-400' : ''}`} id="password" type={showPassword ? "password" : "text"} placeholder="*********" />
                        <p className="text-red-500 text-[12px]">{errors.password?.message}</p>
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
                        sitekey={googleRecaptchaKey}
                    />
                    <div className="flex items-center justify-between flex-col">
                        <div className="w-full pt-6">
                            <ButtonSubmit styles={`z-20 px-3 py-3 bg-standard text-white rounded shadow-standard shadow-[0_0_-15px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-standard-hover w-full`} method="submit" shadow={true} disabled={loading}>
                                <span className="relative z-10">
                                    {loading ? <LoadingSpinner /> : <div className="relative z-10 font-bold">LOGIN</div>}
                                </span>
                            </ButtonSubmit>
                        </div>
                        <div className="p-6">
                            <Link className="inline-block align-baseline font-bold hover:text-blue-gray-100 transition-all text-sm text-black hover:text-blue-hover" href="/sign-up">
                                Dont have an account?
                            </Link>
                        </div>
                    </div>
                </form>
                {error && <PopUpError message={error} onClose={() => setError('')} />}
                {success && <PopUpSuccess message={success} onClose={() => setSuccess('')} />}
            </div>
        </div>
    );
}
