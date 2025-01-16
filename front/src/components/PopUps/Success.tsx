import React, { useEffect } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PopUpSuccessProps {
    message: string;
    onClose: () => void;
}

const PopUpSuccess: React.FC<PopUpSuccessProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <PopUpContainer>
            <PopUpContent>
                <SuccessIcon />
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
    <div className="animate-slide-down bg-zinc-900/90 backdrop-blur-sm border border-[#00DC82]/20 text-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 max-w-md">
        {children}
    </div>
);

const SuccessIcon = () => (
    <div className="bg-gradient-to-r from-[#00DC82] to-[#00A3FF] rounded-lg p-2 flex-shrink-0">
        <CheckIcon className="w-5 h-5 text-white" />
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

export default PopUpSuccess;
