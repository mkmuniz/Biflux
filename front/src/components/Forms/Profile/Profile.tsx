'use client';

import React, { useState, useRef, useEffect } from "react";

import { useSession } from "next-auth/react";

import { useForm, SubmitHandler } from "react-hook-form";

import { useMutation, useQuery } from "@tanstack/react-query";
import { updateUserProfile, fetchUserProfile } from "@/requests/user.requests";

import { FormField } from "../FormField";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileDataForm } from "@/types/forms.types"
import { handleImageChange } from '@/utils/image.utils';
import ButtonSubmit from "@/components/Buttons/Submit";

import PopUpError from '../../PopUps/Error';
import PopUpSuccess from '../../PopUps/Success';

export default function ProfileForm() {
    const { data: session } = useSession();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProfileDataForm>();
    
    const [preview, setPreview] = useState("/assets/icons/profile-default-placeholder.png");
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<ProfileDataForm | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    const handleImageChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageChange(e, setError, setSelectedFile, setPreview);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ProfileDataForm) => {
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

    const onSubmit: SubmitHandler<ProfileDataForm> = async (data) => {
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
            <ProfilePicture 
                preview={preview}
                fileInputRef={fileInputRef}
                register={register}
                handleImageChange={handleImageChangeWrapper}
            />
            
            <FormField 
                label="Name"
                name="name"
                register={register}
                errors={errors}
            />
            
            <FormField 
                label="Email"
                name="email"
                register={register}
                errors={errors}
            />
            
            <ButtonSubmit
                isPending={isPending}
                isDisabled={!data || !isFormChanged()}
            >
                Save Changes
            </ButtonSubmit>
        </form>
        {error && <PopUpError message={error} onClose={() => setError(null)} />}
        {success && <PopUpSuccess message={success} onClose={() => setSuccess(null)} />}
    </>
}
