import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function SearchBox({className, showResults, options, setActiveTicker}: {className?: string, showResults?: boolean, options?: string[], setActiveTicker?: Dispatch<SetStateAction<string>>}) {

    return (
        <div className={"search-box"+className}>
            <div className="search flex">
                <Search size="16" color="white" className="absolute z-10"/>
                <input type="text" placeholder="Search" className="px-7 bg-transparent rounded border border-gray-300"/>
            </div>
            
            { showResults &&
                <div className="search-results">
                    {options?.map((option, index) => (
                        <div key={index} className="search-result" onClick={() => setActiveTicker!(option) } >
                            {option}
                        </div>
                    ))}
                </div>
            }


        </div>
    );
}