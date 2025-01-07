// import { NextAuthOptions,  } from 'next-auth';
import { loginUser } from "@/views/userViews";
import CredentialsProvider from "next-auth/providers/credentials";
// import authCredentialsLogin from './authCredentialsLogin';
// import refreshAccessToken from './refreshAccessToken';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Acc",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(_credentials, request) {
        try {
          const { username, password } = request.body;
          const user = await loginUser(username, password);
          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  site: process.env.NEXTAUTH_URL,
  secret: process.env.JWT_SICRECT_KEY,
  // pages: {
  //   signIn: "/login",
  //   signOut: "/auth/signout",
  //   error: "/login", // Error code passed in query string as ?error=
  //   verifyRequest: "/auth/verify-request", // (used for check email message)
  //   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  session: { strategy: "jwt", maxAge: 60 * 30 },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 30,
    encryption: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      const isSignedIn = user ? true : false;

      if (isSignedIn) {
        return user;
      }
      return token;
    },

    async session(session, user, token) {
      if (user !== null) {
        session.user = token;
      }

      return session;
    },
  },
};
