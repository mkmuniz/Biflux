interface ButtonSubmitProps {
    children: React.ReactNode,
    styles?: string,
    method?: string,
};

export default function ButtonSubmit({ children, styles, method }: ButtonSubmitProps) {
    return <>
        <button className={styles} formMethod={method}>
            {children}
        </button>
    </>;
};