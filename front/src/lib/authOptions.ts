import { NextAuthOptions } from "next-auth";
import { login } from "@/requests/user.requests";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            id: 'user-login',
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
                try {
                    const { data, status }: any = await login({ email: credentials?.email, password: credentials?.password });

                    switch (status) {
                        case 200:
                            return data
                        case 400:
                            return { error: 'Invalid credentials, try again!' }
                        case 401:
                            return { error: 'Invalid credentials, try again!' }
                        case 404:
                            return { error: 'User not found, try again!' }
                        case 500:
                            return { error: 'Internal error, we are working on it!' }
                    }

                    return null;
                } catch (err: any) {
                    console.log(err);
                }
            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user }: any) {
            if (user?.error) throw new Error(user?.error)
            return true;
        },
        async jwt({ token, user }) {
            user && (token.user = user)
            return token;
        },
        async session({ session, token }) {
            session = token.user as any
            return session;
        }
    }
};
