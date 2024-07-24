"use client"

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";
import { useSearchParams } from 'next/navigation';
import DashboardSkeleton from '@/components/Skeleton/Dashboard';

const mockData = [
    { name: 'January', energy: 65, compensated: 12, totalCost: 1200, savings: 150 },
    { name: 'February', energy: 59, compensated: 15, totalCost: 1100, savings: 130 },
    { name: 'March', energy: 80, compensated: 20, totalCost: 1500, savings: 200 },
    { name: 'April', energy: 81, compensated: 22, totalCost: 1600, savings: 210 },
    { name: 'May', energy: 56, compensated: 18, totalCost: 1000, savings: 100 },
    { name: 'June', energy: 55, compensated: 17, totalCost: 950, savings: 90 },
    { name: 'July', energy: 40, compensated: 10, totalCost: 800, savings: 60 },
];

export default function Dashboard() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a data fetching delay
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <Section styles="bg-white">
            <Container styles="flex flex-col items-center justify-center w-full h-full py-8">
                <h1 className="text-2xl font-bold mb-4">Dashboard - ID: {id}</h1>
                {loading ? <DashboardSkeleton /> : <DashboardCharts />}
            </Container>
        </Section>
    );
}

const DashboardCharts = () => {
    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 w-full justify-content-center ml-24 justify-items-center">
            <div className="h-56 max-w-[500px] w-full flex flex-col items-center justify-center">
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
            <div className="h-56 max-w-[500px] w-full flex flex-col items-center justify-center">
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
            <div className="h-56 max-w-[500px] w-full flex flex-col items-center justify-center">
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
            <div className="h-56 max-w-[500px] w-full flex flex-col items-center justify-center">
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
    );
};
