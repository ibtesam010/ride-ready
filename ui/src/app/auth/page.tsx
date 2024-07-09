"use client";

import SignInComponent from "@/components/sign-in";
import SignUpComponent from "@/components/sign-up";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-[350px] flex justify-center items-center">
        <CardContent className="w-full h-full flex flex-col items-center">
          {isSignIn ? <SignInComponent /> : <SignUpComponent />}
          <Button
            onClick={() => setIsSignIn(!isSignIn)}
            className="w-full mt-2"
            variant="outline"
          >
            {isSignIn ? "Create new account" : "Sign In"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
