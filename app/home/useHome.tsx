"use client";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/provider";
import { getVocabListsByDifficulty, getVocabListsNotInFolder } from "@/lib/api/vocab-list";
import { updateWordState } from "@/lib/api/word";
import { getFolder } from "@/lib/api/folder";
import useWord from "@/lib/localStorage/useWord";

export default function useHome() {
    const { user, setUser, folders, vocabLists } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [difficultWords, setDifficultWords] = useState<any[]>([]);
    const { savedWords, applyUpdate } = useWord();

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
