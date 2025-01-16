import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PopUpErrorProps {
    message: string;
    onClose: () => void;
}

const PopUpError: React.FC<PopUpErrorProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <PopUpContainer>
            <PopUpContent>
                <ErrorIcon />
                <MessageText message={message} />
                <CloseButton onClose={onClose} />
            </PopUpContent>
        </PopUpContainer>
    );
};

const PopUpContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed top-20 right-0 p-4 z-[9999]">
        {children}
    </div>
);

const PopUpContent = ({ children }: { children: React.ReactNode }) => (
    <div className="animate-slide-down bg-zinc-900/90 backdrop-blur-sm border border-red-500/20 text-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 max-w-md">
        {children}
    </div>
);

const ErrorIcon = () => (
    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-2 flex-shrink-0">
        <XMarkIcon className="w-5 h-5 text-white" />
    </div>
);

const MessageText = ({ message }: { message: string }) => (
    <span className="text-gray-300 text-sm">{message}</span>
);

const CloseButton = ({ onClose }: { onClose: () => void }) => (
    <button
        onClick={onClose}
        className="ml-auto flex-shrink-0 text-gray-400 hover:text-white transition-colors"
    >
        <XMarkIcon className="w-5 h-5" />
    </button>
);

export default PopUpError;
