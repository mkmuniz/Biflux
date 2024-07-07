interface ButtonSubmitProps {
    children: React.ReactNode,
    styles?: string,
    method?: string,
    shadow?: boolean,
};

export default function ButtonSubmit({ children, styles, method, shadow }: ButtonSubmitProps) {
    return <>
        <div className="flex items-center justify-center relative">
            <button className={styles} formMethod={method}>
                {children}
            </button>
            {shadow ? <>
                <span className="z-10 bg-standard-dark absolute w-full px-3 py-6 rounded inset-1 inset-x-1" />
            </> :
                <></>}
        </div>
    </>;
};