import React from "react";
import { nextAuthOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import ProfileForm from "@/components/Forms/Profile";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";

export default async function Profile() {
    const session: any = await getServerSession(nextAuthOptions);

    return <>
        <Section styles="bg-white">
            <Container styles="p-32">
                <ProfileForm session={session} />
            </Container>
        </Section>
    </>;
};