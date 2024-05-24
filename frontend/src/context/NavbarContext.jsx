import { createContext, useState } from "react";

export const navbarContext = createContext()

export default function NavbarContextFunction({ children }) {
    const [isNavbarVisible, setisNavbarVisible] = useState(true);
    const data = {
        isNavbarVisible, setisNavbarVisible
    }
    return(
        <navbarContext.Provider value={data} >
        {children}
    </navbarContext.Provider>
    )
    
}