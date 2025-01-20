import { PasswordFieldProps } from "@/types/forms.types";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function PasswordField({
    register,
    errors,
    showPassword,
    togglePasswordVisibility
}: PasswordFieldProps) {
    return <>
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
            </label>
            <div className="relative">
                <input
                    {...register("password", { required: 'Password is required' })}
                    type={showPassword ? "password" : "text"}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-black placeholder-gray-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-black hover:text-black transition-colors"
                >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
            </div>
            {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
            )}
        </div>
    </>
}