"use client";
import { useState, useEffect, useContext, createContext } from "react";

export const AddContext = createContext(
    {} as {
        sentence: string;
        setSentence: React.Dispatch<React.SetStateAction<string>>;
        selectedWords: string[];
        setSelectedWords: React.Dispatch<React.SetStateAction<string[]>>;
        phrases: { word: string; definition: string }[];
        setPhrases: React.Dispatch<React.SetStateAction<{ word: string; definition: string }[]>>;
    }
);

export const AddProvider = ({ children }: { children: React.ReactNode }) => {
    const [sentence, setSentence] = useState<string>("");
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [phrases, setPhrases] = useState<{ word: string; definition: string }[]>([]);

    const contextValue = {
        sentence,
        setSentence,
        selectedWords,
        setSelectedWords,
        phrases,
        setPhrases,
    };

    return <AddContext.Provider value={contextValue}>{children}</AddContext.Provider>;
};
