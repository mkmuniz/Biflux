import Link from "next/link";

import Section from "../Section/Section";
import Container from "../Container/Container";

export default function Footer() {
    return <>
        <Section styles="bg-standard">
            <Container>
                <footer className="w-full text-white">
                    <div className="w-full mx-auto p-4 md:py-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 text-3xl font-bold">
                                Biflux
                            </Link>
                            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                                <li>
                                    <Link href="/" className="block py-2 px-3 hover:text-gray-100 transition-all" aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <Link href="/#about" className="block py-2 px-3 hover:text-gray-100 transition-all" aria-current="page">About</Link>
                                </li>
                                <li>
                                    <Link href="https://www.linkedin.com/in/mikael-muniz-ribeiro-5764961a3/" className="block py-2 px-3 hover:text-gray-100 transition-all" aria-current="page">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <hr className="my-6 sm:mx-auto border-white lg:my-8" />
                        <span className="block text-sm sm:text-center">© 2024 <a href="https://github.com/mkmuniz" className="hover:underline">Mikael</a>. All Rights Reserved.</span>
                    </div>
                </footer>
            </Container>
        </Section>
    </>;
};