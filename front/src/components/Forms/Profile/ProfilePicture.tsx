import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ProfilePictureProps } from "@/types/forms.types";

export const ProfilePicture = ({ preview, fileInputRef, register, handleImageChange }: ProfilePictureProps) => (
    <div className="mb-8 w-full flex flex-col items-center justify-center">
        <div
            className="w-32 h-32 rounded-full overflow-hidden cursor-pointer relative group"
            onClick={() => fileInputRef.current?.click()}
        >
            <Image src={preview} width={128} height={128} alt="Profile picture" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PencilIcon className="w-8 h-8 text-white" />
            </div>
        </div>
        <input
            type="file"
            accept="image/*"
            {...register("profilePicture")}
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
        />
    </div>
);