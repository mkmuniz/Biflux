"use client"

import React, { useState, useRef, DragEvent } from 'react';

import { useSession } from "next-auth/react";

import { Dialog, DialogBody } from '@material-tailwind/react';

import { ModalUploadProps } from '@/types/upload.types';
import { handleUpload } from '@/requests/billet.requests';

import PopUpError from '../../PopUps/Error';
import PopUpSuccess from '../../PopUps/Success';

import { UploadForm } from './UploadForm';
import { CloseButton } from '../../Buttons/CloseButton';
import { LoadingOverlay } from '../../Loading/LoadingOverlay';

export default function ModalUpload({ open, handleOpen, onUploadSuccess }: ModalUploadProps) {
    const { data: session } = useSession();

    const [formState, setFormState] = useState({ status: 'idle', message: '' });
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (files: FileList | null) => {
        if (files) {
            const fileArray = Array.from(files);
            setUploadedFiles(fileArray);
        }
    };

    const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        const file = files[0];

        if (!file) return;

        if (file.type !== 'application/pdf') {
            setFormState({
                status: 'error',
                message: 'Apenas arquivos PDF são permitidos'
            });
            return;
        }

        handleFileChange(files);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!session?.user.id) {
            setFormState({ status: 'error', message: 'Usuário não autenticado' });
            return;
        }

        if (uploadedFiles.length === 0) {
            setFormState({ status: 'error', message: 'Selecione um arquivo' });
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadedFiles[0]);
        formData.append('userId', session.user.id);

        try {
            setFormState({ status: 'loading', message: 'Subindo o arquivo...' });
            const res = await handleUpload(formData);

            if (res?.status !== 200) {
                setFormState({ status: 'error', message: 'Erro ao transferir o boleto' });
                return;
            }

            setFormState({ status: 'success', message: 'Boleto transferido com sucesso' });
            setUploadedFiles([]);
            onUploadSuccess();

            setTimeout(() => {
                setFormState({ status: 'idle', message: '' });
            }, 3000);
        } catch (error: any) {
            console.error('Upload error:', error);
            setFormState({ status: 'error', message: error.message });
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} placeholder=''>
            <DialogBody placeholder='' className="relative">
                <CloseButton handleOpen={handleOpen} />
                <LoadingOverlay formState={formState} />
                {formState.status === 'success' &&
                    <PopUpSuccess
                        message={formState.message}
                        onClose={() => setTimeout('5000')}
                    />
                }
                {formState.status === 'error' &&
                    <PopUpError
                        message={formState.message}
                        onClose={() => setTimeout('5000')}
                    />
                }
                <UploadForm
                    handleSubmit={handleSubmit}
                    uploadedFiles={uploadedFiles}
                    formState={formState}
                    isDragging={isDragging}
                    handleDragEnter={handleDragEnter}
                    handleDragLeave={handleDragLeave}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    handleFileChange={handleFileChange}
                    fileInputRef={fileInputRef}
                />
            </DialogBody>
        </Dialog>
    );
}