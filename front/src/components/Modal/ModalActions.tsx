import React from "react";
import { ModalActionsProps } from "../../types/modal.types";

export function ModalActions({ children, handleOpen, onConfirm, isDeleting }: ModalActionsProps) {
    return <>
        <div className="mt-4 flex justify-end gap-4">
            {children}
        </div>
    </>
};