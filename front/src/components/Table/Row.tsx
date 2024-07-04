import React from "react";

import { Typography } from "@material-tailwind/react";
import Link from "next/link";

interface Billet {
    clientNumber: string;
    month: string;
}

interface TableRowProps {
    data: Billet[];
}

export default function TableRow({ data }: TableRowProps) {
    return (
        <>
            {data.map((billet, index) => {
                const isLast = index === data.length - 1;

                return (
                    <tr key={billet.clientNumber}>
                        <td className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal opacity-70"
                                        placeholder={""}
                                    >
                                        <Link href={{ pathname: '/billets/dashboard', query: { id: billet.clientNumber } }}  >
                                            {billet.clientNumber}
                                        </Link>
                                    </Typography>
                                </div>
                            </div>
                        </td>
                        <td className="p-4">
                            <div className="flex flex-col">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                    placeholder={""}
                                >
                                    {billet.month}
                                </Typography>
                            </div>
                        </td>
                        <td className="p-4 content-center">
                            <Link href="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </td>
                    </tr>
                );
            })}
        </>
    );
}