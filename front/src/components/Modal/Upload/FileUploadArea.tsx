import { UploadIcon } from "./UploadIcon";
import { FileUploadAreaProps } from "@/types/upload.types";

export function FileUploadArea({isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    fileInputRef
}: FileUploadAreaProps) {
    return <>
        <label
            htmlFor="file"
            className={`bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed mx-auto font-[sans-serif] transition-colors
        ${isDragging ? 'border-[#8B5CF6] bg-[#8B5CF6]/5' : 'border-gray-300'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <UploadIcon />
            <span className="mt-2">
                {isDragging ? 'Drop file here' : 'Drag and drop PDF here or click to select'}
            </span>
            <input
                ref={fileInputRef}
                type="file"
                id="file"
                name="file"
                className="hidden"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e.target.files)}
            />
            <p className="text-xs font-medium text-gray-400 mt-2">Only PDF files are allowed</p>
        </label>
    </>
};