import { useEffect, useCallback, useState } from 'react';

declare global {
    interface Window {
        grecaptcha: any;
        onRecaptchaLoad: () => void;
    }
}

export const useRecaptcha = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        window.onRecaptchaLoad = () => {
            setIsLoaded(true);
        };

        const script = document.createElement('script');
        
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}&onload=onRecaptchaLoad`;
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            window.onRecaptchaLoad = () => {};
        };
    }, []);

    const executeRecaptcha = useCallback(async () => {
        try {
            if (!isLoaded) {
                await new Promise((resolve) => {
                    const checkRecaptcha = setInterval(() => {
                        if (isLoaded) {
                            clearInterval(checkRecaptcha);
                            resolve(true);
                        }
                    }, 100);
                });
            }

            return await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { 
                action: 'submit' 
            });
        } catch (error) {
            console.error('reCAPTCHA error:', error);
            return null;
        }
    }, [isLoaded]);

    return { executeRecaptcha, isLoaded };
}; 