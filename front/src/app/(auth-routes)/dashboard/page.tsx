"use client"

import DashboardSkeleton from "@/components/Skeleton/Dashboard"
import { useSearchParams } from 'next/navigation'

export default function Dashboard() {
    const searchParams = useSearchParams()

    return <>
        <DashboardSkeleton id={searchParams.get('id')} />
    </>
};