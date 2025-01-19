import React from "react";

export type ModalConfirmDeleteProps = {
    open: boolean;
    handleOpen: VoidFunction;
    onConfirm: VoidFunction;
    isDeleting: boolean;
}

export type ModalContainerProps = {
    children: React.ReactNode,
    open: boolean
}

export type ModalContentProps = {
    children: React.ReactNode,
    handleOpen: VoidFunction,
    onConfirm: VoidFunction,
    isDeleting: boolean
}

export type ModalActionsProps = {
    children: React.ReactNode,
    handleOpen: VoidFunction,
    onConfirm: VoidFunction,
    isDeleting: boolean
}