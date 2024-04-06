"use client";
import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext(
    {} as {
        isList: boolean;
        setIsList: React.Dispatch<React.SetStateAction<boolean>>;
    }
);
const Provider = ({ children }: { children: React.ReactNode }) => {
    const [isList, setIsList] = useState<boolean>(false);
    return <AppContext.Provider value={{ isList, setIsList }}>{children}</AppContext.Provider>;
};
export { AppContext, Provider };
