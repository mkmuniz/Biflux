import React from 'react';

import { Input } from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface TableSearchInputProps {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TableSearchInput({ handleSearch }: TableSearchInputProps) {
    return <>
        <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            placeholder={""} crossOrigin={undefined} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)} />
    </>
};