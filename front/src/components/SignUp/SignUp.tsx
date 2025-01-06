"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/requests/user.requests';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import ButtonSubmit from '../Buttons/Submit';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import PopUpError from '../PopUps/Error';
import PopUpSuccess from '../PopUps/Success';
import LoadingSpinner from '../Loading/LoadingSpinner';

interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface PasswordStrength {
    score: number;
    feedback: string;
}

export default function SignUpForm() {
    const [showPassword, setStatusPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [errorSignUp, setError] = useState<string>('');
    const [successSignUp, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, feedback: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpData>();
    const router = useRouter();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    useEffect(() => {
        if (password) {
            const strength = evaluatePasswordStrength(password);
            setPasswordStrength(strength);
        }
    }, [password]);

    const evaluatePasswordStrength = (password: string): PasswordStrength => {
        let score = 0;
        let feedback = '';

        if (password.length >= 8) score += 1;
        if (password.match(/[A-Z]/)) score += 1;
        if (password.match(/[a-z]/)) score += 1;
        if (password.match(/[0-9]/)) score += 1;
        if (password.match(/[^A-Za-z0-9]/)) score += 1;

        switch (score) {
            case 0:
            case 1:
                feedback = 'Very weak password';
                break;
            case 2:
                feedback = 'Weak password';
                break;
            case 3:
                feedback = 'Medium strength password';
                break;
            case 4:
                feedback = 'Strong password';
                break;
            case 5:
                feedback = 'Very strong password';
                break;
        }

        return { score, feedback };
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength.score) {
            case 0:
            case 1:
                return 'bg-red-500';
            case 2:
                return 'bg-orange-500';
            case 3:
                return 'bg-yellow-500';
            case 4:
                return 'bg-green-500';
            case 5:
                return 'bg-green-600';
            default:
                return 'bg-gray-200';
        }
    };

    const { mutate } = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            setIsSubmitting(false);
            if (data.status === 409) return setError('Email already exists');
            if (data.status === 500) return setError('Internal error, we are working on it!');
            if (data.status === 404) return setError('Not found, try again!');
            if (data.status === 200) {
                setSuccess('Successfully signed up! Redirecting to login...');
                setTimeout(() => {
                    router.replace('/login');
                }, 5000);
            };
        },
        onError: (error: any) => {
            setIsSubmitting(false);
            setError('Failed to sign up. Please try again.');
        }
    });

    const togglePasswordVisibility = (field: 'password' | 'confirm') => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (field === 'password') {
            setStatusPassword(prev => !prev);
        } else {
            setShowConfirmPassword(prev => !prev);
        }
    };

    const handleSignUp: SubmitHandler<SignUpData> = (data) => {
        if (passwordStrength.score < 3) {
            setError('Password needs to be stronger');
            return;
        }

        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!errors.email && !errors.name && !errors.password) {
            setIsSubmitting(true);
            mutate(data);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center sm:mt-12 bg-white relative">
            <div className="sm:min-w-[400px] flex bg-white rounded items-center justify-center sm:shadow-md">
                <form className="px-8" onSubmit={handleSubmit(handleSignUp)}>
                    <div className="flex items-center justify-center h-32">
                        <span className="text-black font-bold text-center text-2xl w-full">
                            Create an account
                        </span>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm mb-2 text-black" htmlFor="name">
                            Name
                        </label>
                        <input
                            {...register("name", { required: 'Name is required' })}
                            className={`shadow min-w-[300px] appearance-none border ${errors.name ? 'border-red-400' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                            id="name"
                            type="text"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-[12px]">{errors.name.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm mb-2 text-black" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className={`shadow min-w-[300px] appearance-none border ${errors.email ? 'border-red-400' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                            id="email"
                            type="email"
                            placeholder="john@example.com"
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
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 mt-3"
                            onClick={togglePasswordVisibility('password')}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-6" />
                            ) : (
                                <EyeIcon className="w-6" />
                            )}
                        </button>
                        {password && (
                            <div className="mb-2">
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <p className={`text-sm mt-1 ${passwordStrength.score >= 3 ? 'text-green-600' : 'text-red-500'}`}>
                                    {passwordStrength.feedback}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-sm mb-2 text-black" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            {...register("confirmPassword", {
                                required: 'Please confirm your password',
                                validate: value => value === password || "Passwords do not match"
                            })}
                            className={`shadow min-w-[300px] appearance-none border ${errors.confirmPassword ? 'border-red-400' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                            id="confirmPassword"
                            type={showConfirmPassword ? "password" : "text"}
                            placeholder="*********"
                        />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 mt-3"
                            onClick={togglePasswordVisibility('confirm')}
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="w-6" />
                            ) : (
                                <EyeIcon className="w-6" />
                            )}
                        </button>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-[12px]">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-between flex-col">
                        <div className="w-full">
                            <ButtonSubmit 
                                method="submit" 
                                styles={`z-20 px-3 py-3 bg-standard text-white rounded shadow-standard transition-all duration-500 hover:bg-standard-hover w-full ${
                                    passwordStrength.score < 3 || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`} 
                                shadow={true} 
                                disabled={isSubmitting || passwordStrength.score < 3}
                            >
                                <span className="relative z-10">
                                    {isSubmitting ? (
                                        <LoadingSpinner />
                                    ) : (
                                        'LOGIN'
                                    )}
                                </span>
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
            <div className="absolute bottom-4 right-4">
                {errorSignUp && <PopUpError message={errorSignUp} onClose={() => setError('')} />}
                {successSignUp && <PopUpSuccess message={successSignUp} onClose={() => setSuccess('')} />}
            </div>
        </div>
    );
}
