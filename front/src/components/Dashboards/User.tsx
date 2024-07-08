import Section from "../Section/Section";
import { useSession } from "next-auth/react";

import Container from "../Container/Container";
import UserDashboardSkeleton from "../Skeleton/UserDashboard";

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/requests/user.requests";

export default function UserDashboard() {
    const { data: session, status }: any = useSession()

    const user: any = useQuery({
        queryKey: ['user', session?.email],
        queryFn: () => getUserById(session?.id),
        enabled: !!session?.email, 
    });

    if (status === 'loading') return <UserDashboardSkeleton />

    return <>
        <Section styles="bg-white w-screen h-screen">
            <Container styles="pl-28 pt-20">
                <div className="flex justify-center mobile:flex-col gap-x-2 min-w-screen w-full">
                    <div className="flex h-[300px] md:w-2/3 w-full shadow-xl p-3">
                        <div className="text-3xl h-full w-full p-3">
                            <span>Welcome, {session?.name}!</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[300px] md:w-1/3 w-full shadow-xl p-3">
                        <span className="text-4xl h-2/3 w-full text-center flex items-center justify-center">
                            {user.data?.billets?.length > 0 ? user.data?.billets.length : '0'}
                        </span>
                        <div className="text-xl h-1/3 w-full text-center">
                            Billets Uploaded
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    </>;
};
