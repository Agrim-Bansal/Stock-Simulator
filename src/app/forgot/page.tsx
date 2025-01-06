"use client";

import React, { useEffect } from "react";
import '@/lib/auth';
import {getAuth, onAuthStateChanged, User, sendSignInLinkToEmail} from 'firebase/auth';
import { useRouter } from "next/navigation";
import { CandlestickChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import '@/lib/auth';

export default function Forgot() {

  const router = useRouter();

  const authChangeHandler = (user:User) => {
    if (user) {
      router.push("/");
    }
  }

  useEffect(() => {
    return onAuthStateChanged(
     getAuth(),
     async (user) => {
       authChangeHandler(user!);
     },
   );
  }, []);

  async function submitHandler(){
    const actionCodeSettings = {
        url: 'https://stock-simulator-beta.vercel.app/pwdreset',
        handleCodeInApp: true,
    };
    const email = (document.getElementById("email") as HTMLInputElement).value;
    sendSignInLinkToEmail(getAuth(),email,actionCodeSettings)
    
  }

  return (

    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div className="w-full max-w-sm">

    <div className={cn("flex flex-col gap-6 border-white border-solid")} >
      <form action={() => submitHandler()}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
              >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <CandlestickChart className="size-24" />
              </div>
              <span className="sr-only">Stock Market Simulator</span>
            </a>

            <h1 className="text-xl font-bold w-fit whitespace-nowrap">Password Reset</h1>
          </div>
          <div className="flex flex-col gap-10">
          
            <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@example.com"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Reset Password Link to Email
            </Button>

            </div>
          
            </div>
            </div>
          </form>
        </div>
    </div>
    </div>
  )
}



