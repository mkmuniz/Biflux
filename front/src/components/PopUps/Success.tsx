import React from 'react';

interface PopUpSuccessProps {
    message: string;
    onClose: () => void;
}

const PopUpSuccess: React.FC<PopUpSuccessProps> = ({ message, onClose }) => {
    return (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg">
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="text-white font-bold">X</button>
            </div>
        </div>
    );
};

export default PopUpSuccess;
