import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res = await fetch(
          `${process.env.API_URL}/auth/user/signin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const user = await res.json();
        if (!res.ok || !user) return null;

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    /**
     * 🔹 Runs on EVERY successful login
     */
    async signIn({ user, account, profile }) {
      // Only for Google login
      if (account.provider === "google") {
        await fetch(`${process.env.API_URL}/auth/user/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            avatar: user.image,
            provider: "google",
            providerId: account.providerAccountId,
          }),
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      // Store user-id in localStorage for client-side API calls
      if (typeof window !== 'undefined' && session?.user?._id) {
        localStorage.setItem('userId', session.user._id);
      }
      return session;
    },
  },
});
