import React from 'react';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { SubmitButtonProps } from '@/types/forms.types';

export default function SubmitButton({ isPending, isDisabled, children }: SubmitButtonProps) {
    return <>
        <div className="flex items-center justify-center relative">
            <button
                type="submit"
                disabled={isPending || isDisabled}
                className={`w-full px-4 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] flex items-center justify-center ${(isPending || isDisabled) ? 'cursor-not-allowed opacity-70' : ''}`}
            >
                {isPending ? <LoadingSpinner /> : <>{children}</>}
            </button>
        </div>
    </>
}