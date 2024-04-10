"use client";
import { useState } from "react";
import { createContext, useEffect } from "react";
import { getPresets } from "@/components/util/data-util";
import { onSnapshot } from "firebase/firestore";

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
        isDB: boolean;
        setIsDB: React.Dispatch<React.SetStateAction<boolean>>;
        presets: preset[];
        setPresets: React.Dispatch<React.SetStateAction<preset[]>>;
        user: string;
        setUser: React.Dispatch<React.SetStateAction<string>>;
        isFocused: boolean;
        setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
        autoPlay: boolean;
        setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
    }
);
const Provider = ({ children }: { children: React.ReactNode }) => {
    const [presets, setPresets] = useState<preset[]>([]);
    const [user, setUser] = useState<string>("test");
    const [isList, setIsList] = useState<boolean>(false);
    const [isDB, setIsDB] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [autoPlay, setAutoPlay] = useState<boolean>(false);

    // AppContext に setPresets も含める
    const contextValue = { isList, setIsList, presets, setPresets, user, setUser, isFocused, setIsFocused, autoPlay, setAutoPlay, isDB, setIsDB };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContext, Provider };
