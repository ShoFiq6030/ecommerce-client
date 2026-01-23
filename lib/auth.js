// src/lib/auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

function sanitizeUser(user) {
  if (!user) return null;

  // NEVER store password in token/session
  const { password, ...safe } = user;

  // NextAuth likes `id`. Keep `_id` too if your app uses it.
  const id = safe._id || safe.id;

  return {
    id,
    _id: safe._id || id,
    email: safe.email,
    name: safe.name,
    image: safe.avatar || safe.image || null,
    auth_provider: safe.auth_provider || safe.provider || null,
    createdAt: safe.createdAt,
    updatedAt: safe.updatedAt,
    // add anything else safe that you need
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${process.env.API_URL}/auth/user/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json().catch(() => null);
        const user = data?.user;

        if (!res.ok || !user?._id) return null;

        return sanitizeUser(user);
      },
    }),
  ],

  callbacks: {
    // ✅ must return true/false/or redirect string
    async signIn({ user, account }) {
      // Credentials: authorize() already verified user
      if (account?.provider === "credentials") return true;

      // Google: sync/create user in your backend
      if (account?.provider === "google") {
        const res = await fetch(`${process.env.API_URL}/auth/user/google`, {
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

        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.user?._id) return false;

        // Important: we can't "return user object" here.
        // We'll store DB user in JWT in `jwt()` below by using token.tempUser.
        return true;
      }

      return true;
    },

    async jwt({ token, user, account }) {
      // When credentials login, `user` is what authorize() returned
      if (user) {
        token.user = user;
      }

      // For Google login: fetch DB user again (so session has DB fields)
      if (account?.provider === "google") {
        // best-effort: ensure DB user is stored in token
        const res = await fetch(`${process.env.API_URL}/auth/user/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: token?.email, // token has email from google profile
            name: token?.name,
            image: token?.picture,
            provider: "google",
            providerId: account.providerAccountId,
          }),
        });

        const data = await res.json().catch(() => null);
        if (res.ok && data?.user?._id) {
          token.user = sanitizeUser(data.user);
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Put backend user object in session
      session.user = token.user || null;
      return session;
    },
  },
});
