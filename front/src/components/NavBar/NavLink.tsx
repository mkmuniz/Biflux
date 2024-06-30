import React from "react";
import Link from "next/link";

interface NavLink {
    href: string,
    description?: string,
    styles: string,
    children?: React.ReactNode
};

export default function NavLink({ href, description, styles, children }: NavLink) {
    return <>
        <Link href={href} className={styles}>
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