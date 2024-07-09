"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface IProps {
  session: Session | null;
  children: ReactNode;
}

function AuthProvider({ session, children }: IProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default AuthProvider;
