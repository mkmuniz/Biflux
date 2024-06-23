import Link from "next/link";
import React from "react";

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