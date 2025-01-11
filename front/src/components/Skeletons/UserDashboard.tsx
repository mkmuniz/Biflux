import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Section from '../Section/Section';
import Container from '../Container/Container';

const dummyData = Array(5).fill(null).map((_, i) => ({ name: i, value: 0 }));

export default function UserDashboardSkeleton() {
    return (
        <Section styles="bg-black min-h-screen w-full">
            <Container styles="max-w-6xl mx-auto p-6">
                <div className="flex mobile:flex-col md:flex-row gap-6 w-full mb-8 animate-pulse">
                    <div className="flex h-[180px] w-full bg-zinc-900/80 rounded-xl p-6 border border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,220,130,0.1)] transition-shadow">
                        <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-zinc-800 shadow-[0_4px_12px_rgb(0,0,0,0.15)]"></div>
                            <div className="h-6 bg-zinc-800 rounded w-2/3 shadow-[0_2px_8px_rgb(0,0,0,0.12)]"></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[180px] w-full bg-zinc-900/80 rounded-xl p-6 border border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,163,255,0.1)] transition-shadow">
                        <div className="h-12 bg-zinc-800 rounded w-16 mb-4 shadow-[0_4px_12px_rgb(0,0,0,0.15)]"></div>
                        <div className="h-6 bg-zinc-800 rounded w-32 shadow-[0_2px_8px_rgb(0,0,0,0.12)]"></div>
                    </div>
                </div>

                <div className="grid mobile:grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="w-full bg-zinc-900/80 rounded-xl p-6 border border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,220,130,0.1)] transition-shadow">
                        <div className="h-8 bg-zinc-800 rounded w-64 mb-4 shadow-[0_2px_8px_rgb(0,0,0,0.12)]"></div>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dummyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                    <XAxis dataKey="name" stroke="#71717a" />
                                    <YAxis stroke="#71717a" />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#27272a"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="w-full bg-zinc-900/80 rounded-xl p-6 border border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,163,255,0.1)] transition-shadow">
                        <div className="h-8 bg-zinc-800 rounded w-64 mb-4 shadow-[0_2px_8px_rgb(0,0,0,0.12)]"></div>
                        <div className="h-[350px] flex items-center justify-center">
                            <div className="w-[200px] h-[200px] rounded-full bg-zinc-800 shadow-[0_4px_12px_rgb(0,0,0,0.15)]"></div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
} 