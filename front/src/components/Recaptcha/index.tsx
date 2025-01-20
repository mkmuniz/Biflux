import ReCAPTCHA from "react-google-recaptcha";

export default function ReCaptchaField({ recaptchaRef }: { recaptchaRef: React.RefObject<ReCAPTCHA> }) {
    return <>
        <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={String(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY)}
            className="invisible"
        />
    </>;
};