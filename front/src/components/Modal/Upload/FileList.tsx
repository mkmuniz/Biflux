import React from "react"
import { FileListProps } from "@/types/upload.types"

export function FileList({ uploadedFiles }: FileListProps) {
    const renderUploadedFiles = () => uploadedFiles.length > 0 && (
        <div className="mt-4 w-full">
            <h3 className="text-lg font-semibold mb-2">Arquivos selecionados:</h3>
            <ul className="list-disc list-inside">
                {uploadedFiles.map((file, index) => (
                    <li key={index} className="text-gray-700">{file.name}</li>
                ))}
            </ul>
        </div>
    )

    return renderUploadedFiles();
};