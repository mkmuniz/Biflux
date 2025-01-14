import React from 'react';

interface ModalConfirmDeleteProps {
    open: boolean;
    handleOpen: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

export default function ModalConfirmDelete({ open, handleOpen, onConfirm, isDeleting }: ModalConfirmDeleteProps) {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50" onClick={handleOpen}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                <h2 className="text-lg font-semibold text-gray-900">Confirmação de Exclusão</h2>
                <p className="mt-2 text-sm text-gray-600">Tem certeza que deseja excluir o boleto?</p>
                <div className="mt-4 flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                        onClick={handleOpen}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
} 