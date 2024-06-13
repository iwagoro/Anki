"use client";
import { useState, useEffect, useContext, use } from "react";
import { vocabListType } from "../types";

export default function useVocabList() {
    const [savedVocabList, setSavedVocabList] = useState<vocabListType[]>([]);
    const [recentId, setRecentId] = useState<number[]>([]);
    const MAX_LEN = 5;

    useEffect(() => {
        const savedVocabList = localStorage.getItem("savedVocabList");
        const recentId = localStorage.getItem("recentVocabList");
        if (savedVocabList) {
            setSavedVocabList(JSON.parse(savedVocabList));
        }
        if (recentId) {
            setRecentId(JSON.parse(recentId));
        }
    }, []);

    const updateVocabList = (vocabList: vocabListType[]) => {
        localStorage.removeItem("savedVocabList");
        localStorage.setItem("savedVocabList", JSON.stringify(vocabList));
        setSavedVocabList(vocabList);
    };

    const addRecentVocabList = (list_id: number) => {
        let newRecentId: number[] = [];
        if (recentId.includes(list_id)) {
            const index = recentId.indexOf(list_id);
            newRecentId = [...recentId.slice(0, index), ...recentId.slice(index + 1)];
            newRecentId.unshift(list_id);
        } else {
            localStorage.removeItem("recentVocabList");
            newRecentId = [...recentId, list_id];
        }
        if (newRecentId.length > MAX_LEN) {
            newRecentId.pop();
        }

        localStorage.setItem("recentVocabList", JSON.stringify(newRecentId));
        setRecentId(newRecentId);
    };

    return { savedVocabList, updateVocabList, addRecentVocabList, recentId };
}
