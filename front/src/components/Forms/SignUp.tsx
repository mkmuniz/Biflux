"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '../../requests/user.requests';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import PopUpError from '../PopUps/Error';
import PopUpSuccess from '../PopUps/Success';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Image from 'next/image';

interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture: string;
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
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, feedback: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState("/assets/icons/profile-default-placeholder.png");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpData>();
    const router = useRouter();

    const password = watch('password');

    useEffect(() => {
        if (password) {
            const strength = evaluatePasswordStrength(password);
            setPasswordStrength(strength);
        }
    }, [password]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (file.size > 5000 * 1024) {
                setError('Image size should not exceed 5mb');
                return;
            }

            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                setSelectedFile(base64String);
                setPreview(base64String);
            };

            reader.readAsDataURL(file);
        }
    };

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

    const { mutate }: any = useMutation({
        mutationFn: signUp,
        onSuccess: (data: any) => {
            setIsSubmitting(false);
            if (data.status === 409) return setError('Email already exists');
            if (data.status === 500) return setError('Internal error, we are working on it!');
            if (data.status === 404) return setError('Not found, try again!');
            if (data.status === 201) {
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

    const handleSignUp: SubmitHandler<SignUpData> = (data: SignUpData) => {
        if (passwordStrength.score < 3) {
            setError('Password needs to be stronger');
            return;
        }

        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (selectedFile) data.profilePicture = selectedFile;
        
        if (!errors.email && !errors.name && !errors.password) {
            setIsSubmitting(true);
            mutate(data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden pt-24 z-20">
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>

            <div className="w-full max-w-md p-4 relative">
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-800 p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent">
                            Criar Conta
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
                        <div className="mb-4 w-full flex items-center justify-center">
                            <div
                                className="w-32 h-32 rounded-full overflow-hidden cursor-pointer relative group"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] rounded-full blur-lg opacity-20"></div>
                                <Image 
                                    src={preview} 
                                    width={128} 
                                    height={128} 
                                    alt="Profile picture" 
                                    className="h-full w-full object-cover relative z-10" 
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-sm">Enviar Foto</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("profilePicture")}
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Nome Completo
                            </label>
                            <input
                                {...register("name", { required: 'Nome é obrigatório' })}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-black placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                                placeholder="Seu nome completo"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                {...register("email", {
                                    required: 'Email é obrigatório',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                })}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-black placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                                placeholder="seu@email.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    {...register("password", { required: 'Senha é obrigatória' })}
                                    type={showPassword ? "password" : "text"}
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-black placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility('password')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-black transition-colors"
                                >
                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>

                            {password && (
                                <div className="mt-2 space-y-2">
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                        />
                                    </div>
                                    <p className={`text-sm ${passwordStrength.score >= 3 ? 'text-green-400' : 'text-red-400'}`}>
                                        {passwordStrength.feedback}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Confirmar Senha
                            </label>
                            <div className="relative">
                                <input
                                    {...register("confirmPassword", {
                                        required: 'Por favor, confirme sua senha',
                                        validate: value => value === password || "As senhas não coincidem"
                                    })}
                                    type={showConfirmPassword ? "password" : "text"}
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-black placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility('confirm')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-black transition-colors"
                                >
                                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || passwordStrength.score < 3}
                            className={`w-full py-3 px-4 rounded-xl text-white font-medium bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF]
                                ${isSubmitting || passwordStrength.score < 3 ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02]'} 
                                transition-all duration-200 flex items-center justify-center`}
                        >
                            {isSubmitting ? (
                                <>
                                    <LoadingSpinner />
                                    <span className="ml-2">Criando Conta...</span>
                                </>
                            ) : (
                                'Criar Conta'
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            Já tem uma conta?{' '}
                            <Link href="/login" className="text-[#8B5CF6] hover:text-[#00A3FF] transition-colors font-medium">
                                Entrar
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className="fixed bottom-4 right-4 space-y-2">
                {errorSignUp && <PopUpError message={errorSignUp} onClose={() => setError('')} />}
                {successSignUp && <PopUpSuccess message={successSignUp} onClose={() => setSuccess('')} />}
            </div>
        </div>
    );
}
