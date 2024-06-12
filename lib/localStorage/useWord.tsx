"use client";
import { useState, useEffect, useContext, useCallback } from "react";
import { updateWordState } from "@/lib/api/word";
import { AppContext } from "@/provider/provider";

export default function useWord() {
    const [savedWords, setSavedWords] = useState<{ id: number; word: string; definition: string; learned: boolean | null }[]>([]);
    const { user, setUser } = useContext(AppContext);

    useEffect(() => {
        const words = localStorage.getItem("words");
        if (words) {
            setSavedWords(JSON.parse(words));
        }
    }, []);

    //! 単語の一括追加
    const addWords = useCallback(
        (items: { id: number; word: string; definition: string; learned: boolean }[]) => {
            // console.log(items);
            const newWords = items.map((item) => ({ ...item, learned: null }));
            setSavedWords(newWords);
        },
        [savedWords]
    );

    //! 単語のlearnedの更新
    const updateState = useCallback(
        (id: number, learned: boolean) => {
            const newWords = savedWords.map((item) => {
                if (item.id === id) {
                    return { ...item, learned };
                } else {
                    return item;
                }
            });
            localStorage.setItem("words", JSON.stringify(newWords));
            setSavedWords(newWords);
        },
        [savedWords]
    );

    //! 変更をDBに反映する
    const applyUpdate = useCallback(async () => {
        if (!user) return;
        if (savedWords.length === 0) return;
        if (savedWords.every((item) => item.learned === null)) return;
        const newWords = savedWords.map((item) => {
            return { id: item.id, learned: item.learned };
        });

        try {
            await updateWordState(user.token, newWords);
            localStorage.removeItem("words");
        } catch {
            console.error("Failed to update words");
        }
    }, [savedWords]);

    return { savedWords, addWords, updateState, applyUpdate };
}
