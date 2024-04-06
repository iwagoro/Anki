"use client";
import { useState } from "react";
import { createContext, useEffect } from "react";
import { getPresets } from "@/components/util/data-util";

interface preset {
    name: string;
    description: string;
    length: number;
    known: number;
    words: any[];
}

const AppContext = createContext(
    {} as {
        isList: boolean;
        setIsList: React.Dispatch<React.SetStateAction<boolean>>;
        presets: preset[];
        setPresets: React.Dispatch<React.SetStateAction<preset[]>>;
    }
);
const Provider = ({ children }: { children: React.ReactNode }) => {
    const [isList, setIsList] = useState<boolean>(false);
    const [presets, setPresets] = useState<preset[]>([]);

    // AppContext に setPresets も含める
    const contextValue = { isList, setIsList, presets, setPresets };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContext, Provider };
