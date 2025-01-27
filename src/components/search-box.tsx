import { Search } from "lucide-react";
import { stockLookup } from "@/pages/api/stocks";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function SearchBox({className, setActiveTicker}: {className?: string, setActiveTicker: Function}) {

    const [options, setOptions] = useState<{description: string, displaySymbol: string, symbol: string, type:string}[]>();
    const [showOptions, setShowOptions] = useState<boolean>(false);

    async function changeHandler(event: React.ChangeEvent<HTMLInputElement>){
        
        const query = event.target.value;
        const response = await stockLookup(query);

        setOptions(response.result);
    }

    function lostFocus(){
        setTimeout(() => setShowOptions(false),500);
    }

    function gainedFocus(){
        setShowOptions(true);
    }

    return (
        <div className={"search-box w-256 mx-auto flex flex-col justify-center items-center" + className} onBlur={lostFocus} onFocus={gainedFocus}>

            <div className="search flex bg-zinc-800 rounded-full ">
                <Search size="32" color="white" className="absolute z-2 mt-4 mx-4"/>
                <input type="text" placeholder="Look up a stock" className="px-16 bg-transparent h-16 w-256 text-lg focus:outline-none" onChange={changeHandler} />
            </div>

            
            <div className={`search-results bg-zinc-950 w-256 h-64 overflow-y-scroll px-24 pt-5 pb-8 text-xl absolute top-52 ${showOptions? 'block' : 'hidden'}`}>
                {options?.map((option, index) => (
                    <div key={index} className="search-result border-b-4 cursor-pointer" onClick={() => setActiveTicker(option.symbol)}  >
                        <div>{option.description}</div>
                        <div className="text-gray-500">({option.displaySymbol})</div>
                    </div>
                ))}
            </div>


        </div>
    );
}