"use client";

import { useState, createContext, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { userType, folderType, vocabListType, wordType } from "@/lib/types";
import { getUserInfo } from "@/lib/api/user";
import { PushSpinner } from "react-spinners-kit";
import { getVocabListsNotInFolder } from "@/lib/api/vocab-list";
import { getFolder } from "@/lib/api/folder";

export const AppContext = createContext(
    {} as {
        user: userType;
        setUser: React.Dispatch<React.SetStateAction<userType>>;
        vocabLists: vocabListType[];
        setVocabLists: React.Dispatch<React.SetStateAction<vocabListType[]>>;
        folders: folderType[];
        setFolders: React.Dispatch<React.SetStateAction<folderType[]>>;
        difficultWords: wordType[];
        setDifficultWords: React.Dispatch<React.SetStateAction<wordType[]>>;
    }
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userType>({} as userType);
    const [vocabLists, setVocabLists] = useState<vocabListType[]>([]);
    const [folders, setFolders] = useState<folderType[]>([]);
    const [difficultWords, setDifficultWords] = useState<wordType[]>([]);
    const [authStatus, setAuthStatus] = useState<0 | 1 | 2>(0); // 0: loading, 1: login, 2: logout
    const path = usePathname(); // URL path
    const router = useRouter();

    useEffect(() => {
        if (path !== "/auth")
            onAuthStateChanged(auth, async (user) => {
                //?　ログイン
                if (user) {
                    try {
                        const token = await getIdToken(user);
                        const userInfo = await getUserInfo(token);
                        setUser({ ...userInfo, token });
                        setAuthStatus(1);
                    } catch {
                        setAuthStatus(2);
                        router.push("/auth");
                    }
                    //? ログアウト
                } else {
                    setUser({} as userType);
                    setAuthStatus(2);
                    router.push("/auth");
                }
            });
        else setAuthStatus(2);
    }, []);

    useEffect(() => {
        if (user.token) {
            Promise.all([getVocabListsNotInFolder(user.token), getFolder(user.token)]).then(([vocabLists, folders]) => {
                setVocabLists(vocabLists);
                setFolders(folders);
            });
        }
    }, [user]);

    const contextValue = { user, setUser, vocabLists, setVocabLists, folders, setFolders, difficultWords, setDifficultWords };
    return <AppContext.Provider value={contextValue}>{authStatus !== 0 ? children : <PushSpinner size={50} color="crimson" />}</AppContext.Provider>;
};
