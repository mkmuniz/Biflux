import React from "react";

import { nextAuthOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

import Section from "@/components/Section/Section";
import ProfileForm from "@/components/Forms/Profile";
import Container from "@/components/Container/Container";

export default async function Profile() {
    return <>
        <Section styles="bg-black w-full h-screen flex items-center justify-center">
            <Container styles="flex items-center justify-center md:w-2/4 mobile:w-2/3 mobile:ml-24">
                <ProfileForm />
            </Container>
        </Section>
    </>;
};