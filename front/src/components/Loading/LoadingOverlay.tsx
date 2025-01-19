import { LoadingOverlayProps } from "@/types/loading.types"

export function LoadingOverlay({ formState }: LoadingOverlayProps) {
    return formState.status === 'loading' && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-standard"></div>
                <p className="mt-4 text-standard font-semibold">{formState.message}</p>
            </div>
        </div>
    )
}