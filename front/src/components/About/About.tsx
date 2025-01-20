"use client"

import { useRef, RefObject } from "react";
import { useIsVisible } from "@/hooks/useIsVisible";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Section from "../Section/Section";
import Container from "../Container/Container";

export default function About() {
    const router = useRouter();
    const refTextDiv: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const refImagesDiv: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const isVisibleTextDiv: boolean = useIsVisible(refTextDiv);
    const isVisibleImagesDiv: boolean = useIsVisible(refImagesDiv);

    return (
        <Section styles="bg-black min-h-screen w-full relative overflow-hidden py-20 mobile:px-8 px-20">
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>

            <Container styles="relative">
                <div className="flex flex-wrap items-center justify-between -mx-4" id="about">
                    <AboutImage 
                        refImagesDiv={refImagesDiv} 
                        isVisibleImagesDiv={isVisibleImagesDiv} 
                    />

                    <AboutDescription 
                        refTextDiv={refTextDiv}
                        isVisibleTextDiv={isVisibleTextDiv}
                        router={router}
                    />
                </div>
            </Container>
        </Section>
    );
};

const AboutImage = ({ refImagesDiv, isVisibleImagesDiv }: { refImagesDiv: RefObject<HTMLDivElement>, isVisibleImagesDiv: boolean }) => {

    return <>
        <div className="w-full px-4 lg:w-6/12">
            <div
                ref={refImagesDiv}
                className={`flex items-center -mx-3 sm:-mx-4 transition-all duration-700 
                            ${isVisibleImagesDiv ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
            >
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                    <div className="py-3 sm:py-4">
                        <ImageCard
                            src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                            alt="About us 1"
                            aspectRatio="aspect-[4/3]"
                            hoverColor="rgba(139,92,246,0.2)"
                        />
                    </div>
                    <div className="py-3 sm:py-4">
                        <ImageCard
                            src="https://i.ibb.co/rfHFq15/image-2.jpg"
                            alt="About us 2"
                            aspectRatio="aspect-[4/3]"
                            hoverColor="rgba(0,163,255,0.2)"
                        />
                    </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                    <div className="relative z-10 my-4">
                        <ImageCard
                            src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                            alt="About us 3"
                            aspectRatio="aspect-[3/4]"
                            hoverColor="rgba(139,92,246,0.2)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
};

const ImageCard = ({ src, alt, aspectRatio, hoverColor }: {
    src: string,
    alt: string,
    aspectRatio: string,
    hoverColor: string
}) => (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] transition-shadow">
        <div className={`relative ${aspectRatio} w-full`}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
            />
        </div>
    </div>
);

const AboutDescription = ({ 
    refTextDiv,
    isVisibleTextDiv,
    router
}: {
    refTextDiv: RefObject<HTMLDivElement>,
    isVisibleTextDiv: boolean,
    router: any
}) => {
    return <div
        ref={refTextDiv}
        className="w-full px-4 lg:w-1/2 xl:w-5/12"
    >
        <div className={`mt-10 lg:mt-0 m-6 transition-all duration-700 ${isVisibleTextDiv ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent">
                About BrightFlow
            </h2>
            <p className="mb-5 text-lg text-white leading-relaxed">
                BrightFlow is an innovative platform developed to simplify the management of electricity bills.
                With our solution, you have access to an intuitive dashboard that transforms complex data into clear and actionable information.
            </p>
            <p className="mb-8 text-lg text-white leading-relaxed">
                Our platform offers detailed analysis of your energy consumption, allowing for more efficient control of your expenses.
                With BrightFlow, you can monitor trends, identify consumption patterns, and make smarter decisions to optimize
                your energy efficiency.
            </p>
            <button
                onClick={() => router.push('/sign-up')}
                className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105"
            >
                Learn More
            </button>
        </div>
    </div>
}