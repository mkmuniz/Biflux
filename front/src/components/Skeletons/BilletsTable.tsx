export default function BilletsTableSkeleton() {
    return (
        <div className="w-full px-4 py-6 md:px-6 lg:px-8 animate-pulse">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <div className="w-full md:w-64 h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="w-28 h-10 bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                {[1, 2, 3].map((item) => (
                                    <th
                                        key={item}
                                        className="px-6 py-4 text-left"
                                    >
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((row) => (
                                <tr key={row} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 