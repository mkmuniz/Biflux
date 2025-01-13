import { Roboto, Outfit } from 'next/font/google';

export const roboto = Roboto({ 
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
    variable: '--font-roboto',
    preload: true,
});

export const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
    preload: true,
}); 