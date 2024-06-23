import { login } from "@/requests/user.requests";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email', type: 'text'
                },
                password: {
                    label: 'password', type: 'password'
                },
            },
            async authorize(credentials, _) {
                const { data, status }: any = await login({ email: credentials?.email, password: credentials?.password });

                if (status === 200) return data;
                if (status === 404) return { error: 'Email not found' };
                if (status === 401) return { error: 'Invalid credentials' };

                return null;
            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user }: any) {
            if (user?.error) {
                throw new Error(user?.error)
            }

            return true;
        },
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    }
};
