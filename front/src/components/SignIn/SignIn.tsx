'use client'

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import PopUpError from '../PopUps/Error';
import LoadingSpinner from '../Loading/LoadingSpinner';

interface SignInData {
    email: string;
    password: string;
}

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<SignInData>();

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    };

    const handleSignIn: SubmitHandler<SignInData> = async (data) => {
        try {
            setIsSubmitting(true);
            const response = await signIn('user-login', {
                ...data,
                redirect: false
            });

            if (response?.error) {
                setError(response.error);
                return;
            }

            router.replace('/user/home');
        } catch (err) {
            setError('Failed to sign in. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-500">Sign in to manage your energy bills</p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                } focus:outline-none focus:ring-2 ${
                                    errors.email ? 'focus:ring-red-200' : 'focus:ring-blue-200'
                                } transition-colors`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register("password", { required: 'Password is required' })}
                                    type={showPassword ? "password" : "text"}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2 ${
                                        errors.password ? 'focus:ring-red-200' : 'focus:ring-blue-200'
                                    } transition-colors`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg text-white font-medium 
                                ${isSubmitting 
                                    ? 'bg-standard-dark cursor-not-allowed' 
                                    : 'bg-standard hover:bg-standard-hover active:bg-standard-dark'} 
                                transition-colors duration-200 flex items-center justify-center`}
                        >
                            {isSubmitting ? (
                                <>
                                    <LoadingSpinner />
                                    <span className="ml-2">Signing in...</span>
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
                                Create one
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {error && (
                <div className="fixed bottom-4 right-4">
                    <PopUpError message={error} onClose={() => setError('')} />
                </div>
            )}
        </div>
    );
}
