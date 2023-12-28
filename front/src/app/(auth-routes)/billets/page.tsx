import { BilletsTable } from '@/components/Table';
import React from 'react';

export default function BilletsLibrary() {
    return <>
        <div className="sm:p-4 sm:ml-64 bg-standard-dark h-screen">
            <BilletsTable />
        </div>
    </>
};