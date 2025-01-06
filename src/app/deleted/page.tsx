"use client";
import { useSearchParams } from "next/navigation";
import { CircleX, Trash } from "lucide-react";
import { Suspense } from "react";

function Deleted() {

    const searchParams = useSearchParams();

    if(searchParams?.get('status') == 'success'){
        return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            
            <Trash size="128" color="white" />

            <div className="text-4xl mt-10">Account Deleted Succesfully</div>
            
        </div>
        )
    }

    return(
        <div>
            <div className="flex flex-col items-center justify-center h-screen w-full">
            
                <CircleX size="128" color="white" />

                <div className="text-4xl mt-10">Something Went Wrong</div>
            
            </div>
        </div>
    )
}

export default function DeletedPage(){
    return (
        <Suspense>
            <Deleted/>
        </Suspense>
    )
};