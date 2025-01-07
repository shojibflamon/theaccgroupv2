"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthPage = ({ children }) => {
  const { data: session, status } = useSession({ required: true });

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut(); // Force sign in to hopefully resolve error
    }
  }, [session]);
  if (status === "authenticated") {
    return <>{children}</>;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-tmlt-Primary-8 bg-opacity-50"></div>
  );
};

export default AuthPage;
