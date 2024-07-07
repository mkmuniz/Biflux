"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { signUp } from '@/requests/user.requests';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

import ButtonSubmit from '../Buttons/Submit';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import PopUpError from '../PopUps/Error';
import PopUpSuccess from '../PopUps/Success';

interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export default function SignUpForm() {
    const [showPassword, setStatusPassword] = useState(true);
    const [errorSignUp, setError] = useState<string>('');
    const [successSignUp, setSuccess] = useState<string>('');

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            if (data.status === 409) return setError('Email already exists');
            if (data.status === 500) return setError('Internal Server Error, Back Later!');

            setSuccess('Successfully signed up! Redirecting to login...');
            setTimeout(() => {
                router.replace('/login');
            }, 5000);
        },
        onError: (error: any) => {
            setError('Failed to sign up. Please try again.');
        }
    });

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStatusPassword((prevState) => !prevState);
    };

    const handleSignUp: SubmitHandler<SignUpData> = (data) => {
        if (!errors.email && !errors.name && !errors.password) {
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
                            className={`shadow min-w-[300px] appearance-none border ${errors.password ? 'border-red-400' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                            id="password"
                            type={showPassword ? "password" : "text"}
                            placeholder="*********"
                        />
                        {errors.password && <p className="text-red-500 text-[12px]">{errors.password.message}</p>}
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
                    <div className="flex items-center justify-between flex-col">
                        <div className="w-full">
                            <ButtonSubmit method="submit" styles="z-20 px-3 py-3 bg-standard text-white rounded shadow-standard shadow-[0_0_-15px_-15px_rgba(0,0,0,0.3)] w-full" shadow={true}>
                                <span className="relative z-10">SIGN UP</span>
                            </ButtonSubmit>
                        </div>
                        <div className="p-6">
                            <Link className="inline-block align-baseline font-bold hover:text-blue-gray-700 transition-all text-sm text-black" href="/login">
                                Have an account already?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            {errorSignUp && <PopUpError message={errorSignUp} onClose={() => setError('')} />}
            {successSignUp && <PopUpSuccess message={successSignUp} onClose={() => setSuccess('')} />}
        </div>
    );
}
