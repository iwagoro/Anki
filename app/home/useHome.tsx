"use client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/provider";
import { getVocabListsNotInFolder } from "@/lib/api/vocab-list";
import { updateWordState } from "@/lib/api/word";
import { getFolder } from "@/lib/api/folder";
import useWord from "@/lib/localStorage/useWord";

export default function useHome() {
    const { user, setUser } = useContext(AppContext);
    const [wordLists, setWordLists] = useState<any[]>([]);
    const [folders, setFolders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { savedWords, applyUpdate } = useWord();
    useEffect(() => {
        user &&
            Promise.all([getVocabListsNotInFolder(user.token), getFolder(user.token)])
                .then(([wordLists, folders]) => {
                    setWordLists(wordLists);
                    setFolders(folders);
                })
                .catch(() => {});
    }, [user]);

    useEffect(() => {
        console.log(savedWords);
        applyUpdate();
    }, [savedWords]);

    //! フォルダーを作成
    const createFolder = async (folderName: string) => {
        if (user.token) {
            setIsLoading(true);
            setIsLoading(false);
        }
    };

    return { user, wordLists, folders, isLoading, createFolder };
}
