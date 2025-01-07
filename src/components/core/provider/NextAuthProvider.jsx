"use client";
import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children, session }) => {
  return (
    <SessionProvider
      session={session}
      // Re-fetch session every 50  minutes
      // refetchInterval={50 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
};

export default NextAuthProvider;
