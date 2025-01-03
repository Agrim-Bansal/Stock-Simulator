"use client";
import { useEffect, useState } from "react";
import '@/lib/auth';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import Link from "next/link";

export default function Home() {

  const [user, setUser] = useState<User>();

  useEffect(() => {

    async function checkUser() {
    const user = await getAuth().currentUser;
    if (user) {
      console.log("User is signed in.");
    }else{
      console.log("User is not signed in.");
    }
  }
  checkUser();

  }, );

  onAuthStateChanged(getAuth(), (user)=>{

    async function userChanger(user:User){
      setUser(user);
    }

    userChanger(user!);

  })


  if (getAuth().currentUser){   
    return (
      <div>
      Stock Simulator 
      {user!.displayName}
      <Button onClick={logout}>SignOut</Button>
    </div>
  )} else {
    return (
      <div>
      Stock Simulator.
      <Button>
      <Link href="/login">
      Sign In to continue.
      </Link>
      </Button>
    </div>
  )}
}