"use client"

import { handleUpload } from '@/lib/upload';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import React from 'react';
import { useFormState } from 'react-dom';

export default function ModalUpload({ open, handleOpen }: any) {
    const [state, formAction]: any = useFormState(handleUpload, null);

    return <>
        <Dialog open={open} handler={handleOpen} placeholder={""}>
            <DialogBody placeholder={""} className="h-72">
                {/* <div className="flex items-center justify-center w-full">
                    <form action={formAction} className="">
                        <label>
                            Select a file to upload
                        </label>
                        <input type="file" name="my-file" id="my-file" />
                        <button type="submit">Upload</button>
                    </form>
                </div> */}
                <form action={formAction} className="flex flex-col items-center justify-center w-full h-full">
                    <input type="file" accept="application/pdf" name="fileUploader" id="fileUploader" className="w-full text-black text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
                    {
                        state && <div className="bg-green-300 p-3 rounded m-6">{state?.message}</div>
                    }
                    <button type="submit" className="flex items-center font-bold justify-center w-2/4 text-black relative h-[40px] overflow-hidden border border-black rounded px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellow-standard before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full">
                        <span className="relative z-10">UPLOAD</span>
                    </button>
                </form>
            </DialogBody>
        </Dialog>
    </>
};