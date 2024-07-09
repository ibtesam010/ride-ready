"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

function SignUpComponent() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClick = async () => {
    await signIn("credentials-sign-up", {
      callbackUrl: "/",
      redirect: true,
      email,
      password,
      firstName,
      lastName,
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="mt-5 text-lg font-semibold">Create new account</h1>
      <Input
        id="firstName"
        name="firstName"
        type="text"
        placeholder="First name"
        className="mt-4"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Last name"
        className="mt-4"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        className="mt-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        className="mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="mt-6 w-full" onClick={() => handleClick()}>
        Submit
      </Button>
    </div>
  );
}

export default SignUpComponent;
