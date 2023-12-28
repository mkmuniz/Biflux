"use client"

import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
} from "@material-tailwind/react";
import { useState } from "react";
import ModalUpload from "../Modal/upload";
import TableRow from "./TableRow";
import TableSearchInput from "./TableSearchInput";

const TABLE_HEAD = ["Client Number", "Month", "Download"];

let TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        clientNumber: "234235343456",
        month: "January",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        clientNumber: "345345345",
        month: "December",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        clientNumber: "45645654634345",
        month: "January",
    },
];

export function BilletsTable() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    };

    const filteredData = TABLE_ROWS.filter(item =>
        item.clientNumber.toLowerCase().includes(search.toLowerCase()) ||
        item.month.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpen = () => setOpen(!open);

    return <>
        <ModalUpload open={open} handleOpen={handleOpen} />
        <Card className="h-full w-full rounded-none" placeholder={""}>
            <CardHeader floated={false} shadow={false} className="rounded-none sm:mt-0 mt-16" placeholder={""}>
                <div className="mb-8 flex items-center justify-between">
                    <TableSearchInput handleSearch={handleSearch} />
                    <Button className="flex items-center gap-3" size="sm" placeholder={""} onClick={handleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0" placeholder={""}>
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        placeholder={""}
                                    >
                                        {head}{" "}
                                        {index !== TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {search === '' ? <TableRow data={TABLE_ROWS} /> : <TableRow data={filteredData} />}
                    </tbody>
                </table>
            </CardBody>
        </Card >
    </>
}