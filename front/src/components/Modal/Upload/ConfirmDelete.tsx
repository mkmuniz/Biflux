import React from 'react';
import { ModalConfirmDeleteProps } from '../../../types/modal.types';
import { ModalContent } from '../ModalContent';
import { ModalActions } from '../ModalActions';
import { ModalContainer } from '../ModalContainer';

export default function ModalConfirmDelete({ open, handleOpen, onConfirm, isDeleting }: ModalConfirmDeleteProps) {
    return (
        <ModalContainer open={open}>
            <Backdrop handleOpen={handleOpen} />
            <ModalContent
                handleOpen={handleOpen}
                onConfirm={onConfirm}
                isDeleting={isDeleting}
            >
                <ModalHeader />
                <ModalDescription />
                <ModalActions
                    handleOpen={handleOpen}
                    onConfirm={onConfirm}
                    isDeleting={isDeleting}
                >
                    <DeleteButton
                        onConfirm={onConfirm}
                        isDeleting={isDeleting}
                    />
                    <CancelButton handleOpen={handleOpen} />
                </ModalActions>
            </ModalContent>
        </ModalContainer>
    );
}

const Backdrop = ({ handleOpen }: { handleOpen: () => void }) => (
    <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleOpen}
    />
);

const ModalHeader = () => (
    <h2 className="text-lg font-semibold text-gray-900">
        Confirmação de Exclusão
    </h2>
);

const ModalDescription = () => (
    <p className="mt-2 text-sm text-gray-600">
        Tem certeza que deseja excluir o boleto?
    </p>
);

const DeleteButton = ({
    onConfirm,
    isDeleting
}: {
    onConfirm: () => void,
    isDeleting: boolean
}) => (
    <button
        type="button"
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        onClick={onConfirm}
        disabled={isDeleting}
    >
        {isDeleting ? 'Excluindo...' : 'Excluir'}
    </button>
);

const CancelButton = ({ handleOpen }: { handleOpen: () => void }) => (
    <button
        type="button"
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
        onClick={handleOpen}
    >
        Cancelar
    </button>
); 