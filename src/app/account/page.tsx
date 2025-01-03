"use client";
import { useEffect } from "react";
import '@/lib/auth';
import {getAuth} from 'firebase/auth';

export default function Home() {

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


  if (getAuth().currentUser){   
    return (
      <>
      Stock Simulator
      {getAuth().currentUser!.displayName}
    </>
  )} else {
    return (
      <>
      Stock Simulator.
      <a href="/login">
      Sign In to continue.
      </a>
    </>
  )}
}