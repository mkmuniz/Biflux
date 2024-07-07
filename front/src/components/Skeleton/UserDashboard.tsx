import Section from "../Section/Section";
import Container from "../Container/Container";

function UserDashboardSkeleton() {
    return (
        <Section styles="bg-white w-screen h-screen">
            <Container styles="pl-28 pt-20">
                <div className="flex justify-center mobile:flex-col gap-x-2 min-w-screen w-full">
                    <div className="flex h-[300px] md:w-2/3 w-full p-3 animate-pulse">
                        <div className="bg-gray-300 h-full w-full rounded-lg p-3"></div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[300px] md:w-1/3 w-full p-3 animate-pulse">
                        <div className="bg-gray-300 h-2/3 w-full rounded-lg flex items-center justify-center"></div>
                        <div className="bg-gray-300 h-1/3 w-full rounded-lg mt-2"></div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default UserDashboardSkeleton;