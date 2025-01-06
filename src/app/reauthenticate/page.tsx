"use client";
import ReAuthForm from "@/components/reauth-form";
import { useEffect, useState } from "react";
import '@/lib/auth';
import {onAuthStateChanged, User, getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser} from 'firebase/auth';
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const authChangeHandler = (user:User) => {
    if (!user) {
      router.push("/");
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

  async function submitHandler(){
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const credential = EmailAuthProvider.credential(email.value, password.value);
    
    reauthenticateWithCredential(getAuth().currentUser!, credential)
    .then(() => {
      deleteUser(getAuth().currentUser!).then(() => {
        router.push("/deleted?q=success");
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
        <ReAuthForm submitHandler={submitHandler} className="" message={message}/>    
      </div>
    </div>
  )
}
