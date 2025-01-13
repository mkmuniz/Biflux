"use client";


import React, { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { signUp } from '../../requests/user.requests';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

import Link from 'next/link';
import Image from 'next/image';

import { EyeIcon, EyeSlashIcon, CameraIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import PopUpError from '../PopUps/Error';
import PopUpSuccess from '../PopUps/Success';
import LoadingSpinner from '../Loading/LoadingSpinner';

import ReCAPTCHA from 'react-google-recaptcha';

interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture: string;
    termsAccepted: boolean;
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
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

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

    const handleSignUp: SubmitHandler<SignUpData> = async (data) => {
        if (passwordStrength.score < 3) {
            setError('Password needs to be stronger');
            return;
        }

        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!data.termsAccepted) {
            setError('Você precisa aceitar os termos para criar uma conta');
            return;
        }

        try {
            setIsSubmitting(true);

            // Executa o reCAPTCHA
            const recaptchaToken = await recaptchaRef.current?.executeAsync();
            recaptchaRef.current?.reset();
            if (!recaptchaToken) {
                setError('Falha na verificação de segurança. Por favor, tente novamente.');
                return;
            }

            if (selectedFile) data.profilePicture = selectedFile;
            
            if (!errors.email && !errors.name && !errors.password) {
                mutate({
                    ...data,
                    recaptchaToken
                });
            }
        } catch (error) {
            setError('Falha ao criar conta. Por favor, tente novamente.');
            setIsSubmitting(false);
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
                        <div className="mb-4 w-full flex flex-col items-center justify-center gap-2">
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
                                    <CameraIcon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <span className="text-gray-400 text-sm">Envie uma foto</span>
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

                        <div className="space-y-4 border border-zinc-800 rounded-xl p-4">
                            <div 
                                onClick={() => setIsTermsOpen(!isTermsOpen)}
                                className="flex items-center justify-between cursor-pointer group"
                            >
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                    Ao criar uma conta, você concorda com a coleta e processamento dos seguintes dados:
                                </p>
                                <ChevronDownIcon 
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isTermsOpen ? 'rotate-180' : ''}`}
                                />
                            </div>
                            
                            <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isTermsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <ul className="text-sm text-gray-400 list-disc pl-5 space-y-2 pt-4">
                                    <li>Dados de cadastro: nome completo, e-mail e foto de perfil</li>
                                    <li>Dados extraídos dos boletos de energia:
                                        <ul className="list-disc pl-5 mt-1 space-y-1">
                                            <li>Número da instalação</li>
                                            <li>Mês de referência</li>
                                            <li>Consumo de energia elétrica (kWh e valores)</li>
                                            <li>Energia SCEE sem ICMS (kWh e valores)</li>
                                            <li>Energia Compensada GD I (kWh e valores)</li>
                                            <li>Contribuição de Iluminação Pública Municipal</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex items-start gap-2 pt-2 border-t border-zinc-800">
                                <input
                                    type="checkbox"
                                    id="termsAccepted"
                                    {...register("termsAccepted", { 
                                        required: 'Você precisa aceitar os termos para criar uma conta' 
                                    })}
                                    className="mt-1"
                                />
                                <label htmlFor="termsAccepted" className="text-sm text-gray-300">
                                    Concordo com a coleta e processamento dos dados acima para fins de análise e gestão do consumo de energia, conforme detalhado em nossa{' '}
                                    <Link href="/politica-privacidade" className="text-[#8B5CF6] hover:text-[#00A3FF] transition-colors">
                                        Política de Privacidade
                                    </Link>
                                </label>
                            </div>
                            {errors.termsAccepted && (
                                <p className="text-sm text-red-400">{errors.termsAccepted.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey={String(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY)}
                                className="invisible"
                            />
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
                                    </>
                                ) : (
                                    'Criar Conta'
                                )}
                            </button>
                        </div>

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
