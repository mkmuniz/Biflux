"use client"

import Container from "@/components/Container/Container"
import UserDashboard from "@/components/Dashboards/User"
import Section from "@/components/Section/Section"

export default function Dashboard() {
    return (
        <Section styles="bg-black min-h-screen w-full overflow-x-hidden">
            <Container styles="flex flex-col w-full max-w-6xl mx-auto p-6 mobile:pl-24 mt-12">
                <UserDashboard />
            </Container>
        </Section>
    );
};