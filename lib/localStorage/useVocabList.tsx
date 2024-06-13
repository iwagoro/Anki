"use client";
import { useState, useEffect, useContext, use } from "react";
import { vocabListType } from "../types";

export default function useVocabList() {
    const [savedVocabList, setSavedVocabList] = useState<vocabListType[]>([]);
    const [recentId, setRecentId] = useState<number[]>([]);
    const MAX_LEN = 5;

    useEffect(() => {
        const savedVocabList = localStorage.getItem("savedVocabList");
        if (savedVocabList) {
            setSavedVocabList(JSON.parse(savedVocabList));
        }
    }, []);

    const updateVocabList = (vocabList: vocabListType[]) => {
        localStorage.removeItem("savedVocabList");
        localStorage.setItem("savedVocabList", JSON.stringify(vocabList));
        setSavedVocabList(vocabList);
    };

    const addRecentVocabList = (list_id: number) => {
        if (recentId.length >= MAX_LEN) {
            recentId.shift();
        }
        localStorage.removeItem("recentVocabList");
        const newRecentId = [...recentId, list_id];
        localStorage.setItem("recentVocabList", JSON.stringify(newRecentId));
        setRecentId(newRecentId);
    };

    return { savedVocabList, updateVocabList, addRecentVocabList };
}
