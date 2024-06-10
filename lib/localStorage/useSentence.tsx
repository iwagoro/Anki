"use client";

import { useState, useEffect } from "react";

export default function useSentence() {
    const [savedSentences, setSavedSentences] = useState<{ name: string; sentence: string; date: Date }[]>([]);
    const MAX_LEN = 5;

    useEffect(() => {
        const sentences = localStorage.getItem("sentences");
        if (sentences) {
            const parsedSentences = JSON.parse(sentences).map((s: { name: string; sentence: string; date: string }) => ({
                ...s,
                date: new Date(s.date),
            }));
            setSavedSentences(parsedSentences);
        }
    }, []);

    //! 文章の追加
    const addSentence = (sentence: { name: string; sentence: string; date: Date }) => {
        if (savedSentences.length >= MAX_LEN) {
            savedSentences.shift();
        }
        if (savedSentences.some((s) => s.name === sentence.name)) return;
        const newSentences = [...savedSentences, sentence];
        setSavedSentences(newSentences);
        localStorage.setItem("sentences", JSON.stringify(newSentences));
        setSavedSentences(newSentences);
    };

    return { savedSentences, addSentence };
}
