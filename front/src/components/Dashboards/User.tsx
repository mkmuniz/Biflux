import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import Section from "../Section/Section";
import Container from "../Container/Container";

import UserDashboardSkeleton from "../Skeletons/UserDashboard";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface Billet {
    id: string;
    month: string;
    consumes: any[];
}

interface Consume {
    id: string;
    type: string;
    value: number;
}

export default function UserDashboard() {
    const { data: session, status }: any = useSession();

    const { data: billets, isLoading } = useQuery({
        queryKey: ['billets', session?.user?.id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:4000/billet?userId=${session?.user?.id}`);

            if (!response.ok)
                throw new Error('Failed to fetch billets');

            return response.json();
        },
        enabled: !!session?.user?.id,
    });

    if (status === 'loading' || isLoading) 
        return <UserDashboardSkeleton />;

    const processConsumptionData = () => {
        if (!billets || billets.length === 0) return [];
        
        const latestBillet = billets[0];

        return latestBillet.consumes.map((consume: Consume) => ({
            name: consume.type,
            value: Math.abs(consume.value)
        }));
    };

    const processTimeSeriesData = () => {
        if (!billets) return [];
        
        return billets.map((billet: Billet) => ({
            name: billet.month,
            energia: billet.consumes.find(c => c.type === 'Energia Elétrica')?.quantity || 0,
            compensada: Math.abs(billet.consumes.find(c => c.type === 'Energia Compensada GD I')?.quantity || 0)
        })).reverse();
    };

    const pieData = processConsumptionData();
    const lineData = processTimeSeriesData();

    return (
        <Section styles="bg-white h-screen md:w-[80%] w-full">
            <Container styles="mobile:pl-28 mobile:pt-20 md:pt-10 flex flex-col">
                <div className="flex mobile:flex-col gap-4 w-full mb-8">
                    <div className="flex h-[200px] w-full shadow-xl rounded-lg p-6 bg-white">
                        <div className="text-3xl h-full w-full flex items-center justify-center">
                            <span>Welcome, {session?.user?.name}!</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[200px] md:w-full w-full shadow-xl rounded-lg p-6 bg-white">
                        <span className="text-4xl mb-4">
                            {billets?.length || 0}
                        </span>
                        <div className="text-xl text-gray-600">
                            Billets Uploaded
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="w-full bg-white shadow-xl rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Consumo de Energia (kWh)</h2>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend 
                                        verticalAlign="top"
                                        height={36}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="energia" 
                                        name="Energia Elétrica" 
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="compensada" 
                                        name="Energia Compensada" 
                                        stroke="#82ca9d"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="w-full bg-white shadow-xl rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Distribuição de Custos (R$)</h2>
                        <div className="h-[400px] relative">
                            <ResponsiveContainer width="100%" height="80%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry: any, index: number) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend 
                                        verticalAlign="bottom"
                                        height={36}
                                        wrapperStyle={{
                                            fontSize: '12px',
                                            paddingTop: '10px',
                                            width: '100%',
                                            overflowWrap: 'break-word',
                                            wordWrap: 'break-word'
                                        }}
                                        formatter={(value: string) => {
                                            return value.length > 20 ? value.substring(0, 20) + '...' : value;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
