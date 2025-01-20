import { FormFieldProps } from "@/types/forms.types";

export const FormField = ({ label, name, register, errors, required = true }: FormFieldProps) => (
    <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor={name}>
            {label}
        </label>
        <input
            {...register(name, { required: required ? `${label} é obrigatório` : false })}
            className={`w-full py-2 px-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#00DC82] focus:ring-1 focus:ring-[#00DC82] transition-colors ${errors[name] ? 'border-red-500' : ''}`}
        />
        {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name].message}</p>}
    </div>
);