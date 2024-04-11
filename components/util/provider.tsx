"use client";
import { useState } from "react";
import { createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/components/util/firebase";

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
    const [user, setUser] = useState<string>("");
    const [isList, setIsList] = useState<boolean>(false);
    const [isDB, setIsDB] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [autoPlay, setAutoPlay] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        const fetchData = async () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (use !== "") {
                    setUser(user.email || "");
                } else {
                    setUser("");
                    router.push("/login");
                }
            });
            return unsubscribe;
        };
        fetchData();
    }, []);

    // AppContext に setPresets も含める
    const contextValue = { isList, setIsList, presets, setPresets, user, setUser, isFocused, setIsFocused, autoPlay, setAutoPlay, isDB, setIsDB };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppContext, Provider };
