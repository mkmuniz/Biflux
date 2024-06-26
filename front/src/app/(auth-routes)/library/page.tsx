import { BilletsTable } from '@/components/Table/Billets';
import React from 'react';

export default function BilletsLibrary() {
    return <>
        <div className="sm:p-4 sm:ml-64 bg-white h-screen">
            <BilletsTable />
        </div>
    </>
};