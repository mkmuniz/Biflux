import React from 'react';

interface ButtonSubmitProps {
    styles: string;
    method: 'submit' | 'reset' | 'button';
    shadow?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ styles, method, shadow, disabled, children }) => {
    return (
        <button
            type={method}
            className={`${styles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonSubmit;