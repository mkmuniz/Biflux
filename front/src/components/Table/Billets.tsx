"use client"

import { ChangeEvent, useState, Fragment } from "react";
import { PlusIcon, MagnifyingGlassIcon, ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";

import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Section from "../Section/Section";
import ModalUpload from "../Modal/Upload";
import Container from "../Container/Container";
import ModalConfirmDelete from '../Modal/ConfirmDelete';
import BilletsTableSkeleton from "../Skeletons/BilletsTable";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

const TABLE_HEAD = ["Número do Cliente", "Mês", "Ações"];

export function BilletsTable() {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedBilletId, setSelectedBilletId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: billets = [], isLoading, error } = useQuery({
        queryKey: ['billets', session?.user?.id],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}billet?userId=${session?.user?.id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            return Array.isArray(data) ? data.map(item => ({
                id: item.id || '',
                clientNumber: item.clientNumber || '',
                month: item.month || '',
                filePath: item.filePath || ''
            })) : [];
        },
        enabled: !!session?.user?.id,
        staleTime: 30000,
        refetchOnWindowFocus: false,
    });

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
            console.error('Failed to download file');
        }
    };

    const handleUploadSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['billets', session?.user?.id] });
        handleOpen();
    };

    const openModal = (id: string) => {
        setSelectedBilletId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBilletId(null);
        setIsModalOpen(false);
    };

    const confirmDelete = async () => {
        if (!selectedBilletId) return;
        setIsDeleting(true);
        try {
            const response = await fetch(`${baseUrl}billet/${selectedBilletId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o boleto');
            }

            queryClient.invalidateQueries({ queryKey: ['billets', session?.user?.id] });
            closeModal();
        } catch (err) {
            console.error('Failed to delete billet', err);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return <BilletsTableSkeleton />;
    }

    return (
        <Section styles="bg-black min-h-screen w-full">
            <Container styles="max-w-6xl mx-auto">
                <ModalUpload 
                    open={open} 
                    handleOpen={handleOpen}
                    onUploadSuccess={handleUploadSuccess}
                />
                <ModalConfirmDelete
                    open={isModalOpen}
                    handleOpen={closeModal}
                    onConfirm={confirmDelete}
                    isDeleting={isDeleting}
                />
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-white">Boletos</h2>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <input
                                type="text"
                                placeholder="Buscar boletos..."
                                onChange={handleSearch}
                                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <button
                            onClick={handleOpen}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02]"
                        >
                            <PlusIcon className="h-5 w-5" />
                            <span>Upload</span>
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900/80 rounded-xl shadow-[0_4px_20px_rgba(139,92,246,0.1)] border border-zinc-800">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B5CF6]"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-zinc-800">
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                                            >
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {filteredData.map((billet, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-zinc-800/50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {billet.clientNumber}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {billet.month}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDownload(billet.filePath)}
                                                    className="flex items-center gap-2 text-sm text-[#8B5CF6] hover:text-[#00A3FF] transition-colors duration-200"
                                                >
                                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                                    <span>Download</span>
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openModal(billet.id)}
                                                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                    <span>Excluir</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {!isLoading && filteredData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">Nenhum boleto encontrado</p>
                    </div>
                )}

                {error && (
                    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-xl shadow-lg">
                        {error.message}
                    </div>
                )}
            </Container>
        </Section>
    );
}