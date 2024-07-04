import Container from "../Container/Container";
import Section from "../Section/Section";

export default function UserDashboard() {
    return <>
        <Section styles="bg-white w-screen h-screen">
            <Container styles="pl-28 pt-20">
                <div className="flex justify-center mobile:flex-col gap-x-2 min-w-screen w-full">
                    <div className="flex h-[300px] md:w-2/3 w-full shadow-xl p-3">
                        <div className="text-3xl h-full w-full p-3">
                            <span>Welcome, Mikael!</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[300px] md:w-1/3 w-full shadow-xl p-3">
                        <span className="text-4xl h-2/3 w-full text-center flex items-center justify-center">
                            8
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