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
        user: string;
        setUser: React.Dispatch<React.SetStateAction<string>>;
        isFocused: boolean;
        setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
    }
);
const Provider = ({ children }: { children: React.ReactNode }) => {
    const [isList, setIsList] = useState<boolean>(false);
    const [presets, setPresets] = useState<preset[]>([]);
    const [user, setUser] = useState<string>("test");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // AppContext に setPresets も含める
    const contextValue = { isList, setIsList, presets, setPresets, user, setUser, isFocused, setIsFocused };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContext, Provider };
