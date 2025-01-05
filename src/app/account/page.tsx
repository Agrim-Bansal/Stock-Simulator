"use client";
import {Roboto} from "next/font/google"
import { useEffect, useState } from "react";
import '@/lib/auth';
import {getAuth, onAuthStateChanged, reauthenticateWithPopup, User, GoogleAuthProvider, updateProfile, deleteUser} from 'firebase/auth';
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import Link from "next/link";
import {Edit, UserIcon} from "lucide-react" ;
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

const roboto = Roboto({
  subsets: ['latin'],
  weight: "400",
});

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [change, setChange] = useState<string>();
  const [nameEditable, setNameEditable] = useState<boolean>(false);

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

  function confirmHandler(){

    if(change == 'password'){
      console.log("User has confirmed password change.");
    }else if(change == 'delete'){
      console.log("User has confirmed account deletion.");

      if(user?.providerData[0].providerId == 'google.com'){
        reauthenticateWithPopup(user, new GoogleAuthProvider())
        .then(() => {
          deleteUser(user!).then(() => {
            console.log("User deleted successfully.");
            router.push('/account/deleted');
          }).catch((error) => {
            prompt("Error deleting user: ", error);
            console.log("Error deleting user: ", error);
          });
        }).catch((error) => {
          prompt("Error reauthenticating user: ", error);
          console.log("Error reauthenticating user: ", error);
        });
      }else{
        router.push('/account/reauthenticate?q=delete');
      }
    }

  };

  function cancelHandler(){
    setChange('');
  };

  function confirmationMessage(){
    if(change == 'password'){
      return 'Are you sure? You will need to reauthenticate to change your password.';
    }
    if(change == 'delete'){
      return 'Are you sure? This action is irreversible';
    }
  }

  function changeName(e:React.ChangeEvent<HTMLInputElement>){
    const newName = e.target.value;
    updateProfile(getAuth().currentUser!, {displayName: newName}).then(() => {
      console.log("Name updated to: ", newName);
      setNameEditable(false);
    }).catch((error) => {
      console.log("Error updating name: ", error);
    });

  }

  if (getAuth().currentUser){   
    return (
    <AlertDialog>
    <div className={`flex flex-col justify-center w-256 mx-auto ${roboto.className}`}>

      <div className={`text-3xl`}>Account Information</div>

      <div className="information m-5 text-2xl">

        <div className="flex justify-between w-3/6 my-10 ">
          <div>Name</div>

          {nameEditable ?
              <input defaultValue={user?.displayName + ''} className="bg-transparent w-max focus:outline-none px-5" onBlur={changeName}></input>
              :
              <div className="px-5">{user?.displayName}</div>
          }
          
          <Edit className="cursor-pointer" onClick={()=>setNameEditable(true)}/>

        </div>

        <div className="flex justify-between w-3/6 my-10 ">
          <div>Email</div>
          <div>{user?.email}  </div>
          <Edit className="cursor-pointer opacity-0"/>

        </div>

        <div className="flex justify-between w-3/6 my-10 ">
          <div> 
            Password 
          </div>
            {user?.providerData[0].providerId == 'google.com' ?
            <>
            <div className="text-gray-500">
              Google Account
            </div>
              <Edit className="opacity-0"/>
            </>
          
            :
            <>
            <div>
            **********
            </div>
            <AlertDialogTrigger onClick={()=>setChange('password')}>
              <Edit className="cursor-pointer"/>
            </AlertDialogTrigger>
            </>
            }
        </div>

      </div>

      <div>
        <Button onClick={logout} className={`w-96 ${roboto.className} text-lg my-10 mx-20`}>SignOut</Button>

        <AlertDialogTrigger onClick={()=>setChange('delete')} className="w-96 h-9">
          <Button className={`w-96 bg-red-500 hover:bg-red-600 ${roboto.className} text-lg my-20 mx-20`}>Delete Account</Button>
        </AlertDialogTrigger>

      </div>
      
            
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirmation</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
                {confirmationMessage()}
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={cancelHandler}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmHandler}>Okay</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>

    </div>
    </AlertDialog>


  )} else {
    return (

      <div className="flex flex-col items-center justify-center h-full w-full">
        <UserIcon size="128" color="white" />
        <Button>
          <Link href="/login">
            Sign In to continue.
          </Link>
        </Button>
      </div>
  )}
}