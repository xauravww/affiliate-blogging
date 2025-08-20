import { createContext, useState } from "react";

export const searchContext = createContext()

export default function SearchContextFunction({ children }) {
    const [searchQuery, setSearchQuery] = useState('');
    const data = {
        searchQuery, setSearchQuery
    }
    return(
        <searchContext.Provider value={data} >
        {children}
    </searchContext.Provider>
    )
    
}