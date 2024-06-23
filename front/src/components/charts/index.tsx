'use client'

import React from "react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, Cell, Pie, PieChart } from "recharts";

interface DataPoint {
    year: string;
    Iphone: number;
    Samsung: number;
}

interface DataSecondGraphPoint {
    name: string;
    value: number;
}

export default function Charts() {
    const colors: string[] = [
        "#8884d8",
        "#FA8072",
        "#AF69EE",
        "#3DED97",
        "#3AC7EB",
        "#F9A603",
    ];

    const data: DataPoint[] = [
        {
            "year": "2016",
            "Iphone": 4000,
            "Samsung": 2400
        },
        {
            "year": "2017",
            "Iphone": 3000,
            "Samsung": 1398
        },
        {
            "year": "2018",
            "Iphone": 2000,
            "Samsung": 9800
        },
        {
            "year": "2019",
            "Iphone": 2780,
            "Samsung": 3908
        },
        {
            "year": "2020",
            "Iphone": 1890,
            "Samsung": 4800
        },
        {
            "year": "2021",
            "Iphone": 2390,
            "Samsung": 3800
        },
        {
            "year": "2022",
            "Iphone": 3490,
            "Samsung": 4300
        }
    ];

    const dataSecondGraph: DataSecondGraphPoint[] = [
        {
            name: "Twitter",
            value: 200400,
        },
        {
            name: "Facebook",
            value: 205000,
        },
        {
            name: "Instagram",
            value: 23400,
        },
        {
            name: "Snapchat",
            value: 20000,
        },
        {
            name: "LinkedIn",
            value: 29078,
        },
        {
            name: "YouTube",
            value: 18900,
        },
    ];

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4 items-center content-center h-screen">
                        <div className="flex items-center justify-center rounded bg-standard h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart width={730} height={250} data={data}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Iphone" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="Samsung" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-center rounded bg-standard h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={730} height={250}>
                                    <Pie
                                        data={dataSecondGraph}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        fill="#8884d8"
                                        label
                                    >
                                        {dataSecondGraph.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-center rounded bg-standard h-72">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-standard h-72">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
