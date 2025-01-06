import React from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface TableSearchInputProps {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TableSearchInput({ handleSearch }: TableSearchInputProps) {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search billets..."
                onChange={handleSearch}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
    );
}