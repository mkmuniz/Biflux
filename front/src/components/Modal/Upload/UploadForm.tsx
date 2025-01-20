import { UploadFormProps } from "@/types/upload.types";

import { FileList } from "./FileList";
import ButtonSubmit from "../../Buttons/Submit";
import { FileUploadArea } from "./FileUploadArea";

export function UploadForm({
    handleSubmit,
    uploadedFiles,
    formState,
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    fileInputRef
}: UploadFormProps
) {
    return <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-full mt-6">
        <FileUploadArea
            isDragging={isDragging}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
        />
        <FileList uploadedFiles={uploadedFiles} />
        <ButtonSubmit isPending={formState.status === 'loading'} isDisabled={formState.status === 'loading'} >
            {formState.status === 'loading' ? 'UPLOADING...' : 'UPLOAD'}
        </ButtonSubmit>
    </form>
};