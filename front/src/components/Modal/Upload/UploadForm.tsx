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
        <ButtonSubmit styles={`w-full px-3 py-3 m-3 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] ${formState.status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
            }`} method='submit' disabled={formState.status === 'loading'} >
            {formState.status === 'loading' ? 'UPLOADING...' : 'UPLOAD'}
        </ButtonSubmit>
    </form>
};