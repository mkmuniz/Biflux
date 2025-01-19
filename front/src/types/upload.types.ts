import { DragEvent } from "react"

export type UploadFormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    uploadedFiles: File[],
    formState: { status: string, message: string },
    isDragging: boolean,
    handleDragEnter: (e: DragEvent<HTMLLabelElement>) => void,
    handleDragLeave: (e: DragEvent<HTMLLabelElement>) => void,
    handleDragOver: (e: DragEvent<HTMLLabelElement>) => void,
    handleDrop: (e: DragEvent<HTMLLabelElement>) => void,
    handleFileChange: (files: FileList | null) => void,
    fileInputRef: React.RefObject<HTMLInputElement>
}

export type FileUploadAreaProps = {
    isDragging: boolean,
    handleDragEnter: (e: DragEvent<HTMLLabelElement>) => void,
    handleDragLeave: (e: DragEvent<HTMLLabelElement>) => void,
    handleDragOver: (e: DragEvent<HTMLLabelElement>) => void,
    handleDrop: (e: DragEvent<HTMLLabelElement>) => void,
    handleFileChange: (files: FileList | null) => void,
    fileInputRef: React.RefObject<HTMLInputElement>
}

export type ModalUploadProps = {
    open: boolean;
    handleOpen: () => void;
    onUploadSuccess: () => void;
}

export type FileListProps = {
    uploadedFiles: File[];
}