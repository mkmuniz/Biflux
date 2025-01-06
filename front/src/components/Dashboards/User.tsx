import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/requests/user.requests";
import Section from "../Section/Section";
import Container from "../Container/Container";
import UserDashboardSkeleton from "../Skeletons/UserDashboard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const mockBillets = [
    {
        id: '1',
        month: 'Janeiro/2024',
        consumes: [
            { type: 'Energia Elétrica', value: 250.50, quantity: 150 },
            { type: 'Energia SCEEE s/ICMS', value: 100.20, quantity: 80 },
            { type: 'Energia Compensada GD I', value: 80.30, quantity: 60 },
            { type: 'Contrib Ilum Publica Municipal', value: 45.00, quantity: 0 }
        ]
    },
    {
        id: '2',
        month: 'Dezembro/2023',
        consumes: [
            { type: 'Energia Elétrica', value: 280.30, quantity: 170 },
            { type: 'Energia SCEEE s/ICMS', value: 120.40, quantity: 90 },
            { type: 'Energia Compensada GD I', value: 90.50, quantity: 70 },
            { type: 'Contrib Ilum Publica Municipal', value: 45.00, quantity: 0 }
        ]
    },
    {
        id: '3',
        month: 'Novembro/2023',
        consumes: [
            { type: 'Energia Elétrica', value: 220.10, quantity: 130 },
            { type: 'Energia SCEEE s/ICMS', value: 90.30, quantity: 70 },
            { type: 'Energia Compensada GD I', value: 70.20, quantity: 50 },
            { type: 'Contrib Ilum Publica Municipal', value: 45.00, quantity: 0 }
        ]
    }
];

export default function UserDashboard() {
    const { data: session, status }: any = useSession();

    const { data: userData, isLoading } = useQuery({
        queryKey: ['user', session?.email],
        queryFn: () => getUserById(session?.id),
        enabled: !!session?.email,
    });

    if (status === 'loading' || isLoading) {
        return <UserDashboardSkeleton />;
    }

    const processConsumptionData = () => {
        const latestBillet = mockBillets[0];
        return latestBillet.consumes.map(consume => ({
            name: consume.type,
            value: consume.value
        }));
    };

    const processTimeSeriesData = () => {
        return mockBillets.map(billet => ({
            name: billet.month,
            energy: billet.consumes.find(c => c.type === 'Energia Elétrica')?.quantity || 0,
            compensated: billet.consumes.find(c => c.type === 'Energia Compensada GD I')?.quantity || 0
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
                            {mockBillets.length}
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
                                        dataKey="energy" 
                                        name="Energia Elétrica" 
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="compensated" 
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
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                        outerRadius={140}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
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
