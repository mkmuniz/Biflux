import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import Charts from "@/ui/components/charts";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
    const session = await getServerSession(nextAuthOptions);

    return <>
        <Charts />
    </>
};