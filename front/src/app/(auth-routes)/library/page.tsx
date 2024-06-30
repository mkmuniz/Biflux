import React from 'react';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import { BilletsTable } from '@/components/Table/Billets';

export default function BilletsLibrary() {
    return <>
        <Section styles="bg-white">
            <Container styles="p-32">
                <BilletsTable />
            </Container>
        </Section>
    </>
};