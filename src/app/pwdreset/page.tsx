"use client";

import React, {  Suspense, useEffect, useState } from "react";
import '@/lib/auth';
import {onAuthStateChanged, User, getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword} from 'firebase/auth';
import { useRouter, useSearchParams } from "next/navigation";
import { CandlestickChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import '@/lib/auth';

function Reset() {

  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const authChangeHandler = (user:User) => {
    if (!user) {
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
    const password = document.getElementById('oldPassword') as HTMLInputElement;
    const credential = EmailAuthProvider.credential(getAuth().currentUser!.email!, password.value);
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

    if(newPassword != confirmPassword){
        setMessage("Passwords do not match");
        return;
    }

    reauthenticateWithCredential(getAuth().currentUser!, credential)
    .then(() => {
            updatePassword(getAuth().currentUser!, newPassword ).then(() => {
            router.push("/account");
        }).catch((error) => {
            setMessage(error.message);
        });
    }).catch((error) => {
      setMessage(error.message);
    });
    
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

          
            <div className="grid gap-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="oldPassword"
                type="password"
                placeholder="Password"
                required
                />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Password"
                required
                />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Password"
                required
                onChange={() => {
                    if((document.getElementById('newPassword') as HTMLInputElement)?.value != (document.getElementById('confirmPassword') as HTMLInputElement)?.value){
                        setMessage("Passwords do not match");
                    }else{
                        setMessage("");
                    }
                }}
                />
            </div>

            <div className="text-red-500 -mt-5">
              {message && message}
            </div>

            <Button type="submit" className="w-full">
              Reset Password
            </Button>

            </div>
          
            </div>
          </form>
        </div>
    </div>
    </div>
  )
}


function ForgotPage(){

  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const authChangeHandler = (user:User) => {
    if (!user) {
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

  function submitHandler(){
    const newPassword = document.getElementById('newPassword') as HTMLInputElement;

    updatePassword(getAuth().currentUser!, newPassword.value ).then(() => {
        router.push("/account");
    }).catch((error) => {
        setMessage(error.message);
    });
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


            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Password"
                required
                />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Password"
                required
                onChange={() => {
                    if((document.getElementById('newPassword') as HTMLInputElement)?.value != (document.getElementById('confirmPassword') as HTMLInputElement)?.value){
                        setMessage("Passwords do not match");
                    }else{
                        setMessage("");
                    }
                }}
                />
            </div>

            <div className="text-red-500 -mt-5">
              {message && message}
            </div>

            <Button type="submit" className="w-full">
              Reset Password
            </Button>

            </div>
          
            </div>
          </form>
        </div>
    </div>
    </div>
  )

}

function ResetPage(){

    const searchParams = useSearchParams();

    if (searchParams!.get('email') == 'true') {
        return (
            <ForgotPage/>
        )
      }else{
            return (
                <Reset/>
            )
        }
    
}

export default function ResetPassword(){
    return (
      <Suspense>
        <ResetPage/>
      </Suspense>

    )
}