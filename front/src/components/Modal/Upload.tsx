import React, { useState } from 'react';
import { handleUpload } from '@/lib/upload';
import { Dialog, DialogBody } from '@material-tailwind/react';
import PopUpError from '../PopUps/Error';
import PopUpSuccess from '../PopUps/Success';
import ButtonSubmit from '../Buttons/Submit';

interface ModalUploadProps {
    open: boolean;
    handleOpen: () => void;
}

export default function ModalUpload({ open, handleOpen }: ModalUploadProps) {
    const [formState, setFormState] = useState({ status: 'idle', message: '' });
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setUploadedFiles(Array.from(files));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            setFormState({ status: 'loading', message: 'Uploading file...' });

            const response = await handleUpload(null, formData);

            if (response.status === 'error')
                return setFormState({ status: 'error', message: response.message });

            setFormState({ status: 'success', message: response.message });
        } catch (error: any) {
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
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-full mt-6">
                    <label htmlFor="uploadFile1"
                        className="bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                            <path
                                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                data-original="#000000" />
                            <path
                                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                data-original="#000000" />
                        </svg>
                        Upload PDF
                        <input
                            type="file"
                            id='uploadFile1'
                            name="fileUploader"
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
                        <ButtonSubmit method="submit" styles="z-20 px-3 py-3 bg-standard text-white rounded shadow-standard shadow-[0_0_-15px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-standard-hover min-w-full" shadow={true}>
                            <span className="relative z-10 font-bold">UPLOAD</span>
                        </ButtonSubmit>
                    </div>
                </form>
                {formState.status === 'error' && <PopUpError message={formState.message} onClose={() => {
                    setError('');
                }} />}
                {formState.status === 'success' && <PopUpSuccess message={formState.message} onClose={() => {
                    setSuccess('');
                }} />}
            </DialogBody>
        </Dialog>
    );
}
