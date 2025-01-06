"use client"

import { useRef, RefObject } from "react";
import { useIsVisible } from "@/hooks/useIsVisible";

export default function About() {
    const refTextDiv: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const refImagesDiv: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const isVisibleTextDiv: boolean = useIsVisible(refTextDiv);
    const isVisibleImagesDiv: boolean = useIsVisible(refImagesDiv);

    return (
        <>
            <section id="about" className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark">
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center justify-between -mx-4">
                        <div className="w-full px-4 lg:w-6/12">
                            <div ref={refImagesDiv} className={`flex items-center -mx-3 sm:-mx-4 transition-all ease-in duration-500 ${isVisibleImagesDiv ? "translate-y-0 opacity-100" : "translate-y-72 opacity-50"}`}>
                                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                    <div className="py-3 sm:py-4">
                                        <img
                                            src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />
                                    </div>
                                    <div className="py-3 sm:py-4">
                                        <img
                                            src="https://i.ibb.co/rfHFq15/image-2.jpg"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                    <div className="relative z-10 my-4">
                                        <img
                                            src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div ref={refTextDiv} className={`w-full px-4 lg:w-1/2 xl:w-5/12 font-bold transition-opacity ease-in duration-700 ${isVisibleTextDiv ? "opacity-100" : "opacity-0"}`}>
                            <div className="mt-10 lg:mt-0 m-6 sm:text-left text-center">
                                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                                    Mauris velit nisl, sodales vel velit sed, finibus fringilla ex. Sed varius nibh in enim semper,
                                    sit amet dapibus quam facilisis. Curabitur a tortor in velit consequat porta.
                                </p>
                                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                                    Curabitur metus risus, egestas vel purus non, laoreet mattis urna.
                                    Praesent eleifend augue id leo auctor, sed sagittis sapien venenatis.
                                    Nunc tincidunt mi ac leo cursus, sit amet porta diam vehicula. P
                                    hasellus vitae tellus sed lorem elementum mattis aliquet nec dolor.
                                    Aliquam nec ornare mi, sed sollicitudin nisi.
                                    Fusce lorem tortor, consequat vel blandit ut, egestas sed eros.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
