import React, { useState } from 'react';

import { handleUpload } from '@/lib/upload';
import { Dialog, DialogBody } from '@material-tailwind/react';

interface ModalUploadProps {
    open: boolean;
    handleOpen: () => void;
}

export default function ModalUpload({ open, handleOpen }: ModalUploadProps) {
    const [formState, setFormState] = useState({ status: 'idle', message: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            setFormState({ status: 'loading', message: 'Uploading file...' });
            
            const response = await handleUpload(null, formData);

            setFormState({ status: 'success', message: response.message });
        } catch (error: any) {
            setFormState({ status: 'error', message: error.message });
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} placeholder=''>
            <DialogBody placeholder=''>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-full">
                    <input type="file" accept="application/pdf" name="fileUploader" id="fileUploader" className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
                    {formState.status === 'success' && <div className="bg-green-300 p-3 rounded m-6">{formState.message}</div>}
                    {formState.status === 'error' && <div className="bg-red-300 p-3 rounded m-6">{formState.message}</div>}
                    <button type="submit" className="flex items-center font-bold justify-center w-2/4 text-black relative h-[40px] overflow-hidden border border-black rounded px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellow-standard before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10">UPLOAD</span>
                    </button>
                </form>
            </DialogBody>
        </Dialog>
    );
}
