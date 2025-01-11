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
        <div className="animate-slide-up">
            <div className="bg-zinc-900/90 backdrop-blur-sm border border-[#00DC82]/20 text-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#00DC82] to-[#00A3FF] rounded-lg p-2">
                    <CheckIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300">{message}</span>
                <button 
                    onClick={onClose}
                    className="ml-4 text-gray-400 hover:text-white transition-colors"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default PopUpSuccess;
