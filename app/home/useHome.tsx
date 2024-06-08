"use client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/provider";
import { getVocabListsNotInFolder } from "@/lib/api/vocab-list";
import { getFolder } from "@/lib/api/folder";
import { addWordsFromCsv as addWords, addWordsFromImage as addWords2 } from "@/lib/api/word";
import { createFolder as addFolder } from "@/lib/api/folder";

export default function useHome() {
    const { user, setUser } = useContext(AppContext);
    const [wordLists, setWordLists] = useState<any[]>([]);
    const [folders, setFolders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        user &&
            Promise.all([getVocabListsNotInFolder(user.token), getFolder(user.token)])
                .then(([wordLists, folders]) => {
                    setWordLists(wordLists);
                    setFolders(folders);
                })
                .catch(() => {});
    }, [user]);

    const createFolder = async (folderName: string) => {
        if (user.token) {
            setIsLoading(true);
            await addFolder(user.token, folderName);
            setIsLoading(false);
        }
    };

    return { user, wordLists, folders, isLoading, createFolder };
}
