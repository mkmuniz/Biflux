"use client"

import Container from "@/components/Container/Container"
import UserDashboard from "@/components/Dashboards/User"
import Section from "@/components/Section/Section"

export default function Dashboard() {
    return <>
        <Section styles="bg-white">
            <Container styles="flex items-center justify-center items-center w-screen h-screen">
                <UserDashboard />
            </Container>
        </Section>
    </>
};