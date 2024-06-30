"use client"

import Container from "@/components/Container/Container"
import Section from "@/components/Section/Section"
import DashboardSkeleton from "@/components/Skeleton/Dashboard"
import { useSearchParams } from 'next/navigation'

export default function Dashboard() {
    const searchParams = useSearchParams()

    return <>
        <Section styles="bg-white">
            <Container styles="flex items-center justify-center items-center w-screen h-screen">
                <DashboardSkeleton id={searchParams.get('id')} />
            </Container>
        </Section>
    </>
};