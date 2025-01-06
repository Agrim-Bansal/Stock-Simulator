"use client";
import { useSearchParams } from "next/navigation";
import { CircleX, Trash } from "lucide-react";

export default function Deleted() {
    const searchParams = useSearchParams();

    const status = searchParams!.get('status');

    if(status == 'success'){
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