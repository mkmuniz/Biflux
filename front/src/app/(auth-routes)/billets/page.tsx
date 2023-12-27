import { SortableTable } from '@/ui/components/Table';
import React from 'react';

export default function BilletsLibrary() {
    return <>
        <div className="p-4 sm:ml-64 h-screen">
            <SortableTable />
        </div>
    </>
};