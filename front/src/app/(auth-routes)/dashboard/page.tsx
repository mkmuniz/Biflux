"use client"

import DashboardSkeleton from "@/components/Skeleton/index"
import { useRouter } from "next/navigation";
export default function Dashboard() {
    const router: any = useRouter();
    const dataPreviousPage = router.query;

    if (!router.query?.id) {
        router.push('/billets');
    };

    return <>
        <DashboardSkeleton />
    </>
};