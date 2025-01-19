import React from "react";
import { ModalContainerProps } from "../../types/modal.types";

export function ModalContainer({ children, open }: ModalContainerProps) {
    return <>
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? '' : 'hidden'}`}>
            {children}
        </div>
    </>
}