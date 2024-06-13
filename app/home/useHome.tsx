"use client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/provider";
import useVocabList from "@/lib/localStorage/useVocabList";
import useWord from "@/lib/localStorage/useWord";
import useFolder from "@/lib/localStorage/useFolder";
export default function useHome() {
    const { user, setUser, folders, vocabLists, setVocabLists, setFolders } = useContext(AppContext);
    const { savedVocabList, updateVocabList } = useVocabList();
    const { savedFolder, updateFolder } = useFolder();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [difficultWords, setDifficultWords] = useState<any[]>([]);

    const { savedWords, applyUpdate } = useWord();

    useEffect(() => {
        setVocabLists(savedVocabList);
    }, [savedVocabList]);

    useEffect(() => {
        setFolders(savedFolder);
    }, [vocabLists]);

    useEffect(() => {
        applyUpdate();
    }, [savedWords]);

    //! フォルダーを作成
    const createFolder = async (folderName: string) => {
        if (user.token) {
            setIsLoading(true);
            setIsLoading(false);
        }
    };

    return { user, vocabLists, folders, isLoading, createFolder, difficultWords };
}
