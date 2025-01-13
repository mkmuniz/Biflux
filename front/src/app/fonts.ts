import { Roboto, Outfit } from 'next/font/google';

export const roboto = Roboto({ 
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto'
});

export const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit'
}); 