"use client";
import { LoginForm } from "@/components/login-form"
import { useEffect } from "react";
import {onAuthStateChanged, User} from 'firebase/auth';
import {getAuth} from 'firebase/auth';


export default function LoginPage() {

  const authChangeHandler = (user:User) => {
    if (user) {
      window.location.href = "/account"
    } else {
      console.log("Error");
    }
  }

  useEffect(() => {
    onAuthStateChanged(
     getAuth(),
     async (user) => {
       authChangeHandler(user!);
     },
   );
  }, []);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
