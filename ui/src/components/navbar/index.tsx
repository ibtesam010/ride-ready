"use client";

import { generateInitials } from "@/lib/helpers/initials.helper";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const initials = session && generateInitials(session.user?.name || "");

  if (pathname?.includes("auth")) return null;

  return (
    <div className="absolute top-0 w-full h-16  z-50 flex items-center justify-between px-6 border-b-2 border-b-gray-300">
      <h1 onClick={() => router.replace("/")} className="text-2xl font-bold">
        Ride Ready
      </h1>
      <div className="flex items-center">
        {session && <div className="mx-4 cursor-pointer">Profile</div>}
        {session && <div className="mx-4 cursor-pointer">My Orders</div>}
        {!session && (
          <h1 className="cursor-pointer" onClick={() => router.push("/auth")}>
            Login/Register
          </h1>
        )}
        {session && (
          <Avatar className="cursor-pointer mx-4">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}

export default Navbar;
