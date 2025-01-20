import Link from "next/link";

export default function SignUpLink() {
    return <>
        <p className="text-center text-sm text-gray-400">
            Dont have an account?{' '}
            <Link href="/sign-up" className="text-[#8B5CF6] hover:text-[#00A3FF] transition-colors font-medium">
                Create account
            </Link>
        </p>
    </>;
};