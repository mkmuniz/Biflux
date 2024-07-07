import React from "react";

import { nextAuthOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

import Section from "@/components/Section/Section";
import ProfileForm from "@/components/Forms/Profile";
import Container from "@/components/Container/Container";

export default async function Profile() {
    const session: any = await getServerSession(nextAuthOptions);

    return <>
        <Section styles="bg-white">
            <Container styles="md:pt-32 md:pl-32 pt-16 pl-20 flex items-center justify-center">
                <ProfileForm session={session} />/
            </Container>
        </Section>
    </>;
};