import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const dummyData = Array(5).fill(null).map((_, i) => ({ name: i, value: 0 }));

export default function UserDashboardSkeleton() {
    return (
        <div className="bg-white h-screen md:w-[80%] w-full">
            <div className="mobile:pl-28 mobile:pt-20 md:pt-10 flex flex-col animate-pulse">
                <div className="flex mobile:flex-col gap-4 w-full mb-8">
                    <div className="flex h-[200px] w-full shadow-xl rounded-lg p-6 bg-gray-100">
                        <div className="h-full w-full flex items-center justify-center">
                            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[200px] md:w-full w-full shadow-xl rounded-lg p-6 bg-gray-100">
                        <div className="h-12 bg-gray-200 rounded w-16 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-32"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="w-full bg-gray-100 shadow-xl rounded-lg p-6">
                        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                        <div className="h-[400px] bg-white">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dummyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                    <XAxis dataKey="name" stroke="#eee" />
                                    <YAxis stroke="#eee" />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#eee"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="w-full bg-gray-100 shadow-xl rounded-lg p-6">
                        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                        <div className="h-[400px] flex items-center justify-center">
                            <div className="w-[280px] h-[280px] rounded-full bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 