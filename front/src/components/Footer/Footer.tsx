import Link from "next/link";
import Section from "../Section/Section";
import Container from "../Container/Container";

export default function Footer() {
    return (
        <Section styles="bg-black relative overflow-hidden">
            <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full blur-[128px] bg-[#8B5CF6]/10"></div>
            <div className="absolute bottom-0 -right-24 w-96 h-96 rounded-full blur-[128px] bg-[#00A3FF]/10"></div>
            
            <Container styles="relative">
                <footer className="w-full text-white z-10">
                    <div className="w-full mx-auto p-4 md:py-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <FooterLogo />
                            <FooterNavigation />
                        </div>
                        
                        <hr className="my-8 border-zinc-800" />
                        
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <DeveloperInfo />
                            <Copyright />
                        </div>
                    </div>
                </footer>
            </Container>
        </Section>
    );
}

const FooterLogo = () => (
    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
        <span className="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent">
            BrightFlow
        </span>
    </Link>
);

const FooterNavigation = () => (
    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 gap-2">
        <li>
            <Link 
                href="/" 
                className="block py-2 px-3 text-gray-400 hover:text-white transition-colors"
            >
                Home
            </Link>
        </li>
        <li>
            <Link 
                href="/#solutions" 
                className="block py-2 px-3 text-gray-400 hover:text-white transition-colors"
            >
                Our Solutions
            </Link>
        </li>
        <li>
            <Link 
                href="/#about" 
                className="block py-2 px-3 text-gray-400 hover:text-white transition-colors"
            >
                About Us
            </Link>
        </li>
    </ul>
);

const DeveloperInfo = () => (
    <div className="flex flex-col items-center md:items-start">
        <p className="text-gray-400">
            Developed by{" "}
            <Link 
                href="https://mkmuniz.dev" 
                target="_blank" 
                className="text-white hover:text-[#8B5CF6] transition-colors"
            >
                Mikael Muniz Ribeiro
            </Link>
        </p>
        <div className="flex items-center gap-4 mt-2">
            <Link 
                href="https://github.com/mkmuniz" 
                target="_blank" 
                className="text-gray-400 hover:text-white transition-colors"
            >
                GitHub
            </Link>
            <Link 
                href="https://www.linkedin.com/in/mikael-muniz-ribeiro/" 
                target="_blank" 
                className="text-gray-400 hover:text-white transition-colors"
            >
                LinkedIn
            </Link>
            <Link 
                href="https://mkmuniz.dev" 
                target="_blank" 
                className="text-gray-400 hover:text-white transition-colors"
            >
                My Website
            </Link>
        </div>
    </div>
);

const Copyright = () => (
    <span className="text-sm text-gray-400">
        © 2024 BrightFlow. All rights reserved.
    </span>
);
