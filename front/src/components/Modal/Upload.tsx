import React, { useState } from 'react';
import { handleUpload } from '@/lib/upload';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { useSession } from "next-auth/react";

interface ModalUploadProps {
    open: boolean;
    handleOpen: () => void;
    onUploadSuccess: () => void;
}

export default function ModalUpload({ open, handleOpen, onUploadSuccess }: ModalUploadProps) {
    const { data: session } = useSession();
    const [formState, setFormState] = useState({ status: 'idle', message: '' });
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setUploadedFiles(fileArray);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!session?.user.id) {
            setFormState({ status: 'error', message: 'User not authenticated' });
            return;
        }

        if (uploadedFiles.length === 0) {
            setFormState({ status: 'error', message: 'Please select a file' });
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadedFiles[0]);
        formData.append('userId', session.user.id);

        try {
            setFormState({ status: 'loading', message: 'Uploading file...' });

            const response = await handleUpload(session.user.id, formData);

            if (response.status === 'error') {
                setFormState({ status: 'error', message: response.message });
                return;
            }

            setFormState({ status: 'success', message: response.message });
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
                <button
                    type="button"
                    onClick={handleOpen}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {formState.status === 'loading' && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-standard"></div>
                            <p className="mt-4 text-standard font-semibold">{formState.message}</p>
                        </div>
                    </div>
                )}

                {(formState.status === 'success' || formState.status === 'error') && (
                    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-500 ${
                        formState.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}>
                        <div className="flex items-center">
                            {formState.status === 'success' ? (
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                            {formState.message}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-full mt-6">
                    <label htmlFor="file"
                        className="bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                        </svg>
                        Upload PDF
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="hidden"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                        <p className="text-xs font-medium text-gray-400 mt-2">Only PDF files are allowed.</p>
                    </label>

                    {uploadedFiles.length > 0 && (
                        <div className="mt-4 w-full">
                            <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
                            <ul className="list-disc list-inside">
                                {uploadedFiles.map((file, index) => (
                                    <li key={index} className="text-gray-700">{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="w-3/4 m-3">
                        <button
                            type="submit"
                            disabled={formState.status === 'loading'}
                            className={`w-full px-3 py-3 bg-black text-white rounded shadow-standard transition-all duration-500 hover:bg-standard-hover ${
                                formState.status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <span className="relative z-10 font-bold">
                                {formState.status === 'loading' ? 'UPLOADING...' : 'UPLOAD'}
                            </span>
                        </button>
                    </div>
                </form>
            </DialogBody>
        </Dialog>
    );
}
