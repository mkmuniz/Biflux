import { ModalContentProps } from "@/types/modal.types";

export function ModalContent({ children }: ModalContentProps) {
    return <>
        <div className="bg-white rounded-lg shadow-lg p-6 z-10">
            {children}
        </div>
    </>
};