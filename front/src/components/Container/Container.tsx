interface ContainerProps {
    children: React.ReactNode,
    styles?: string,
};

export default function Container({ children, styles }: ContainerProps) {
    return <>
        <div className={`container mx-auto ${styles}`}>
            {children}
        </div>
    </>;
};