'use client';

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateUserProfile, fetchUserProfile } from "@/requests/user.requests";
import PopUpError from '../PopUps/Error';
import PopUpSuccess from '../PopUps/Success';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Container from "../Container/Container";
import Section from "../Section/Section";

interface ProfileData {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
}

export default function ProfileForm() {
    const { data: session } = useSession();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProfileData>();
    const [preview, setPreview] = useState("/assets/icons/profile-default-placeholder.png");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<ProfileData | null>(null);

    const watchedName = watch('name');
    const watchedEmail = watch('email');

    const { data } = useQuery({
        queryKey: ['user-profile'],
        queryFn: () => fetchUserProfile(session?.user?.id as string),
        enabled: !!session?.user?.id,
    });

    useEffect(() => {
        if (data) {
            setValue('name', data.name, { shouldDirty: false });
            setValue('email', data.email, { shouldDirty: false });
            setPreview(data.profilePicture || "/assets/icons/profile-default-placeholder.png");
            setInitialData(data);
        }
    }, [data, setValue]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

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

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ProfileData) => {
            return updateUserProfile(session?.user?.id as string, {
                name: data.name,
                email: data.email,
                profilePicture: data.profilePicture
            });
        },
        onSuccess: () => {
            setSuccess('Profile updated successfully');
        },
        onError: () => {
            setError('Failed to update profile');
        }
    });

    const onSubmit: SubmitHandler<ProfileData> = async (data) => {
        try {
            mutate({
                id: session?.user?.id as string,
                name: data.name,
                email: data.email,
                profilePicture: selectedFile || undefined
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const isFormChanged = () => {
        if (!initialData) return false;
        return watchedName !== initialData.name || 
               watchedEmail !== initialData.email || 
               selectedFile !== null;
    };

    return <>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-900/80 rounded-xl shadow-[0_4px_20px_rgba(0,220,130,0.1)] border border-zinc-800 p-8 mobile:w-full w-2/3">
            <div className="mb-8 w-full flex items-center justify-center">
                <div
                    className="w-32 h-32 rounded-full overflow-hidden cursor-pointer relative group"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Image src={preview} width={128} height={128} alt="Profile picture" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm">Alterar Foto</span>
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
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="name">
                    Nome
                </label>
                <input
                    {...register("name", { required: 'Nome é obrigatório' })}
                    className={`w-full py-2 px-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#00DC82] focus:ring-1 focus:ring-[#00DC82] transition-colors ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    {...register("email", { required: 'Email é obrigatório' })}
                    className={`w-full py-2 px-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#00DC82] focus:ring-1 focus:ring-[#00DC82] transition-colors ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="flex items-center justify-center relative">
                <button
                    type="submit"
                    disabled={isPending || !data || !isFormChanged()}
                    className={`w-full px-4 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] flex items-center justify-center ${(isPending || !data || !isFormChanged()) ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                    {isPending ? <LoadingSpinner /> : 'Salvar Alterações'}
                </button>
            </div>
        </form>
        {error && <PopUpError message={error} onClose={() => setError(null)} />}
        {success && <PopUpSuccess message={success} onClose={() => setSuccess(null)} />}
    </>
}
