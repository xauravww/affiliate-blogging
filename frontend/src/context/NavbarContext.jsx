import { createContext, useState } from "react";

export const navbarContext = createContext()

export default function NavbarContextFunction({ children }) {
    const [isNavbarVisible, setisNavbarVisible] = useState(true);
    const [isHoverToggled, setisHoverToggled] = useState(false);
    const [isSearchActive, setisSearchActive] = useState(false);
    const [selectedSidebar, setselectedSidebar] = useState("home")
    const [navOverlayVisibleItems, setnavOverlayVisibleItems] = useState({"productUrl":false,"oldPrice":false,"newPrice":false})
    const data = {
        isNavbarVisible, setisNavbarVisible,isHoverToggled, setisHoverToggled,isSearchActive, setisSearchActive,selectedSidebar, setselectedSidebar ,navOverlayVisibleItems, setnavOverlayVisibleItems
    }
    return(
        <navbarContext.Provider value={data} >
        {children}
    </navbarContext.Provider>
    )
    
}