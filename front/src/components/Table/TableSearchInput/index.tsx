import React from 'react';
import { Input } from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function TableSearchInput({ handleSearch }: any) {
    return <>
        <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            placeholder={""} crossOrigin={undefined} onChange={(e: any) => handleSearch(e)} />
    </>
};