"use client"

import { ChangeEvent, useState, useEffect } from "react";
import { PlusIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import ModalUpload from "../Modal/Upload";
import { handleUpload } from "@/lib/upload";
import { useSession } from "next-auth/react";
import BilletsTableSkeleton from "../Skeletons/BilletsTable";

interface Billet {
    clientNumber: string;
    month: string;
    filePath: string;
}

const TABLE_HEAD = ["Client Number", "Month", "Actions"];

export function BilletsTable() {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [billets, setBillets] = useState<Billet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    const fetchBillets = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`http://localhost:4000/billet?userId=${session?.user?.id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            const formattedData = Array.isArray(data) ? data.map(item => ({
                clientNumber: item.clientNumber || '',
                month: item.month || '',
                filePath: item.filePath || ''
            })) : [];
            
            setBillets(formattedData);
        } catch (err: any) {
            console.error('Error fetching billets:', err);
            setError(err.message || 'Failed to fetch billets');
            setBillets([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBillets();
    }, [session]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredData = billets.filter(item =>
        (item.clientNumber?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (item.month?.toLowerCase() || '').includes(search.toLowerCase())
    );

    const handleOpen = () => setOpen(!open);

    const handleDownload = async (filePath: string) => {
        try {
            window.open(filePath, '_blank');
        } catch (err) {
            setError('Failed to download file');
        }
    };

    if (loading) {
        return <BilletsTableSkeleton />;
    }

    return (
        <>
            <ModalUpload 
                open={open} 
                handleOpen={handleOpen}
                onUploadSuccess={() => {
                    fetchBillets();
                    handleOpen();
                }}
            />
            <div className="w-full px-4 py-6 md:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Billets</h2>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <input
                                type="text"
                                placeholder="Search billets..."
                                onChange={handleSearch}
                                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <button
                            onClick={handleOpen}
                            className="flex items-center gap-2 px-4 py-2 bg-standard text-white rounded-lg transition-colors duration-200"
                        >
                            <PlusIcon className="h-5 w-5" />
                            <span>Upload</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-standard"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                                            >
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredData.map((billet, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {billet.clientNumber}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {billet.month}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDownload(billet.filePath)}
                                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                                >
                                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                                    <span>Download</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {!loading && filteredData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No billets found</p>
                    </div>
                )}

                {error && (
                    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                        {error}
                    </div>
                )}
            </div>
        </>
    );
}