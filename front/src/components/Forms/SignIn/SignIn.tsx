'use client';
import React, { useState, useRef } from 'react';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import PopUpError from '../../PopUps/Error';

import ReCAPTCHA from 'react-google-recaptcha';
import ReCaptchaField from '@/components/Recaptcha';

import BackgroundEffects from '@/components/BackgroundEffects';

import FormHeader from './FormHeader';
import { FormField } from '../FormField';
import PasswordField from './PasswordField';
import FormContainer from '../FormContainer';
import SignUpLink from './SignUpLink';
import SubmitButton from '../../Buttons/Submit';

interface SignInData {
    email: string;
    password: string;
}

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<SignInData>();

    const router = useRouter();

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    };

    const handleSignIn: SubmitHandler<SignInData> = async (data) => {
        try {
            setIsSubmitting(true);

            const recaptchaToken = await recaptchaRef.current?.executeAsync();
            recaptchaRef.current?.reset();

            if (!recaptchaToken) {
                setError('Security verification failed. Please try again.');
                return;
            }

            const response = await signIn('user-login', {
                ...data,
                recaptchaToken,
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
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden z-20">
            <BackgroundEffects />
            <FormContainer>
                <FormHeader />
                <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
                    <FormField 
                        label="Email"
                        name="email" 
                        register={register} 
                        errors={errors}
                        placeholder='your@email.com'
                    />
                    <PasswordField
                        register={register}
                        errors={errors}
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                    <SubmitButton isPending={isSubmitting}>
                        Log In
                    </SubmitButton>
                    <ReCaptchaField recaptchaRef={recaptchaRef} />
                    <SignUpLink />
                </form>
            </FormContainer>
            {error && <PopUpError message={error} onClose={() => setError('')} />}
        </div>
    );
}