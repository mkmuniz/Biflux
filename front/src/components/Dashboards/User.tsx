import Section from "../Section/Section";
import { useSession } from "next-auth/react";
import Container from "../Container/Container";
import UserDashboardSkeleton from "../Skeleton/UserDashboard";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/requests/user.requests";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
    { name: 'January', energy: 65, compensated: 12, totalCost: 1200, savings: 150 },
    { name: 'February', energy: 59, compensated: 15, totalCost: 1100, savings: 130 },
    { name: 'March', energy: 80, compensated: 20, totalCost: 1500, savings: 200 },
    { name: 'April', energy: 81, compensated: 22, totalCost: 1600, savings: 210 },
    { name: 'May', energy: 56, compensated: 18, totalCost: 1000, savings: 100 },
    { name: 'June', energy: 55, compensated: 17, totalCost: 950, savings: 90 },
    { name: 'July', energy: 40, compensated: 10, totalCost: 800, savings: 60 },
];

export default function UserDashboard() {
    const { data: session, status }: any = useSession();

    const user: any = useQuery({
        queryKey: ['user', session?.email],
        queryFn: () => getUserById(session?.id),
        enabled: !!session?.email,
    });

    if (status === 'loading') return <UserDashboardSkeleton />

    return (
        <Section styles="bg-white w-screen h-screen">
            <Container styles="pl-28 pt-20">
                <div className="flex justify-center mobile:flex-col gap-x-2 min-w-screen w-full">
                    <div className="flex h-[300px] md:w-2/3 w-full shadow-xl p-3">
                        <div className="text-3xl h-full w-full p-3">
                            <span>Welcome, {session?.name}!</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[300px] md:w-1/3 w-full shadow-xl p-3">
                        <span className="text-4xl h-2/3 w-full text-center flex items-center justify-center">
                            {user.data?.billets?.length > 0 ? user.data?.billets.length : '0'}
                        </span>
                        <div className="text-xl h-1/3 w-full text-center">
                            Billets Uploaded
                        </div>
                    </div>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Gráfico de Consumo de Energia */}
                    <div className="h-56 max-w-[500px] w-full flex flex-col items-center justify-center shadow-md rounded-md p-4">
                        <h2>Consumo de Energia Elétrica KWh</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="energy" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico de Energia Compensada */}
                    <div className="h-56 max-w-[500px] w-full flex flex-col items-center justify-center shadow-md rounded-md p-4">
                        <h2>Energia Compensada kWh</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="compensated" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico de Valor Total sem GD */}
                    <div className="h-56 max-w-[500px] w-full flex flex-col items-center justify-center shadow-md rounded-md p-4">
                        <h2>Valor Total sem GD R$</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="totalCost" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico de Economia GD */}
                    <div className="h-56 max-w-[500px] w-full flex flex-col items-center justify-center shadow-md rounded-md p-4">
                        <h2>Economia GD R$</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="savings" stroke="#ff7300" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
