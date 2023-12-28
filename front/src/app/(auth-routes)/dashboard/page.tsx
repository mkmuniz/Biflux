"use client"

import DashboardSkeleton from "@/components/Skeleton/index"
import { useSearchParams } from 'next/navigation'

export default function Dashboard() {
    const searchParams = useSearchParams()

    return <>
        <DashboardSkeleton id={searchParams.get('id')} />
    </>
};