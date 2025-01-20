export default function FormContainer({ children }: { children: React.ReactNode }) {
    return <>
        <div className="w-full max-w-md p-4 relative">
            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-800 p-8 space-y-6">
                {children}
            </div>
        </div>
    </>
}