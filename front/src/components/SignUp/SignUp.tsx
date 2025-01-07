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
        <div className="min-h-screen flex items-center justify-center bg-white m-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="text-gray-500">Join us and start managing your energy bills</p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                {...register("name", { required: 'Name is required' })}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                } focus:outline-none focus:ring-2 ${
                                    errors.name ? 'focus:ring-red-200' : 'focus:ring-blue-200'
                                } transition-colors`}
                                placeholder="Full Name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

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
                                    onClick={togglePasswordVisibility('password')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>

                            {password && (
                                <div className="mt-2 space-y-2">
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                        />
                                    </div>
                                    <p className={`text-sm ${passwordStrength.score >= 3 ? 'text-green-600' : 'text-red-500'}`}>
                                        {passwordStrength.feedback}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register("confirmPassword", {
                                        required: 'Please confirm your password',
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                    type={showConfirmPassword ? "password" : "text"}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2 ${
                                        errors.confirmPassword ? 'focus:ring-red-200' : 'focus:ring-blue-200'
                                    } transition-colors`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility('confirm')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || passwordStrength.score < 3}
                            className={`w-full py-3 px-4 rounded-lg text-white font-medium 
                                ${isSubmitting || passwordStrength.score < 3 
                                    ? 'bg-standard-dark cursor-not-allowed' 
                                    : 'bg-standard hover:bg-standard-hover active:bg-standard-dark'} 
                                transition-colors duration-200 flex items-center justify-center`}
                        >
                            {isSubmitting ? (
                                <>
                                    <LoadingSpinner />
                                    <span className="ml-2">Creating Account...</span>
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Notifications */}
            <div className="fixed bottom-4 right-4 space-y-2">
                {errorSignUp && <PopUpError message={errorSignUp} onClose={() => setError('')} />}
                {successSignUp && <PopUpSuccess message={successSignUp} onClose={() => setSuccess('')} />}
            </div>
        </div>
    );
}
