import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { stockLookup } from "@/pages/api/stocks";
import { useState } from "react";

export default function SearchBox({className, setActiveTicker}: {className?: string, setActiveTicker?: Dispatch<SetStateAction<string>>}) {

    const [options, setOptions] = useState<{description: string, displaySymbol: string, symbol: string, type:string}[]>();
    const [showOptions, setShowOptions] = useState<boolean>(false);

    async function changeHandler(event: React.ChangeEvent<HTMLInputElement>){
        
        const query = event.target.value;
        const response = await stockLookup(query);

        setOptions(response.result);
    }

    function lostFocus(){
        setShowOptions(false);
    }

    function gainedFocus(){
        setShowOptions(true);
    }

    return (
        <div className={"search-box w-full flex flex-col justify-center items-center c"+className}>

            <div className="search flex bg-zinc-800 rounded-full ">
                <Search size="32" color="white" className="absolute z-10 mt-4 mx-4"/>
                <input type="text" placeholder="Look up a stock" className="px-16 bg-transparent h-16 w-256 text-lg focus:outline-none" onChange={changeHandler} onBlur={lostFocus} onFocus={gainedFocus}/>
            </div>

            { showOptions &&
                <div className="search-results bg-zinc-950 w-256 h-64 overflow-y-scroll px-24 pt-5 pb-8 text-xl absolute top-52 ">
                    {options?.map((option, index) => (
                        <div key={index} className="search-result border-b-4 cursor-pointer" onClick={() => setActiveTicker!(option.displaySymbol)}  >
                            <div>{option.description}</div>
                            <div className="text-gray-500">({option.displaySymbol})</div>
                        </div>
                    ))}
                </div>
        }

        </div>
    );
}