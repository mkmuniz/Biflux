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

interface ProfileData {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
}

export default function ProfileForm() {
    const { data: session } = useSession();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileData>();
    const [preview, setPreview] = useState("/assets/icons/profile-default-placeholder.png");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { data } = useQuery({
        queryKey: ['user-profile'],
        queryFn: () => fetchUserProfile(session?.user?.id as string),
        enabled: !!session?.user?.id,
    });

    useEffect(() => {
        if (data) {
            setValue('name', data.name);
            setValue('email', data.email);
            setPreview(data.profilePicture || "/assets/icons/profile-default-placeholder.png");
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
            if (file.size > 100 * 1024) {
                setError('Image size should not exceed 100kb');
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded h-full sm:mt-0 mt-16 md:shadow-lg p-6 xl:w-2/5 lg:w-3/5 w-full mobile:h-screen">
            <div className="mb-4 w-full flex items-center justify-center">
                <div
                    className="w-32 h-32 rounded-full overflow-hidden cursor-pointer relative group"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Image src={preview} width={128} height={128} alt="Profile picture" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm">Change Photo</span>
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
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    {...register("name", { required: 'Name is required' })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    {...register("email", { required: 'Email is required' })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>
            <div className="flex items-center justify-center relative">
                <button type="submit" disabled={isPending} className={`z-20 px-3 py-3 bg-standard text-white rounded shadow-standard shadow-[0_0_-15px_-15px_rgba(0,0,0,0.3)] transition-colors duration-500 hover:bg-standard-hover w-full ${isPending ? 'cursor-not-allowed' : ''}`}>
                    {isPending ? <LoadingSpinner /> : 'Save Changes'}
                </button>
            </div>
            {error && <PopUpError message={error} onClose={() => setError(null)} />}
            {success && <PopUpSuccess message={success} onClose={() => setSuccess(null)} />}
        </form>
    );
}
