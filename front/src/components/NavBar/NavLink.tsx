import React from "react";
import Link from "next/link";

interface NavLink {
    href: string,
    description?: string,
    styles: string,
    children?: React.ReactNode,
    onClick?: () => void
};

export default function NavLink({ href, description, styles, children, onClick }: NavLink) {
    return <>
        <Link href={href} className={styles} onClick={onClick}>
            {children ?
                <>
                    {children}
                </> : <>
                    {description}
                </>
            }
        </Link>
    </>;
};