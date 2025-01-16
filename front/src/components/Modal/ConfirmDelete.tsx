import React from 'react';

interface ModalConfirmDeleteProps {
    open: boolean;
    handleOpen: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

export default function ModalConfirmDelete({ open, handleOpen, onConfirm, isDeleting }: ModalConfirmDeleteProps) {
    return (
        <ModalContainer open={open}>
            <Backdrop handleOpen={handleOpen} />
            <ModalContent 
                handleOpen={handleOpen}
                onConfirm={onConfirm}
                isDeleting={isDeleting}
            />
        </ModalContainer>
    );
}

const ModalContainer = ({ 
    children, 
    open 
}: { 
    children: React.ReactNode,
    open: boolean 
}) => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? '' : 'hidden'}`}>
        {children}
    </div>
);

const Backdrop = ({ handleOpen }: { handleOpen: () => void }) => (
    <div 
        className="fixed inset-0 bg-black opacity-50" 
        onClick={handleOpen}
    />
);

const ModalContent = ({ 
    handleOpen, 
    onConfirm, 
    isDeleting 
}: { 
    handleOpen: () => void,
    onConfirm: () => void,
    isDeleting: boolean
}) => (
    <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <ModalHeader />
        <ModalDescription />
        <ModalActions 
            handleOpen={handleOpen}
            onConfirm={onConfirm}
            isDeleting={isDeleting}
        />
    </div>
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

const ModalActions = ({ 
    handleOpen, 
    onConfirm, 
    isDeleting 
}: { 
    handleOpen: () => void,
    onConfirm: () => void,
    isDeleting: boolean
}) => (
    <div className="mt-4 flex justify-end gap-4">
        <DeleteButton 
            onConfirm={onConfirm}
            isDeleting={isDeleting}
        />
        <CancelButton handleOpen={handleOpen} />
    </div>
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