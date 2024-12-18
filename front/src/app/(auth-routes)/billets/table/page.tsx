import React from 'react';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import { BilletsTable } from '@/components/Table/Billets';

export default function Table() {
    return <>
        <Section styles="bg-white">
            <Container styles="md:pt-32 md:pl-32 pt-16 pl-20 flex items-center justify-center">
                <BilletsTable />
            </Container>
        </Section>
    </>
};