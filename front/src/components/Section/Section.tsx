interface SectionProps {
    children: React.ReactNode,
    styles?: string,
};

export default function Section({ children, styles }: SectionProps) {
    return <>
        <section className={styles}>
            {children}
        </section>
    </>;
};