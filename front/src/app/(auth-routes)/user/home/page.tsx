"use client"

import Container from "@/components/Container/Container"
import UserDashboard from "@/components/Dashboards/User"
import Section from "@/components/Section/Section"
import { useSearchParams } from 'next/navigation'

export default function Dashboard() {
    const searchParams = useSearchParams()

    return <>
        <Section styles="bg-white">
            <Container styles="flex items-center justify-center items-center w-screen h-screen">
                <UserDashboard />
            </Container>
        </Section>
    </>
};