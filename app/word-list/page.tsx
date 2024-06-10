"use client";
import { WordCardFlip } from "./word-card";
import useWordList from "./useWordList";

export default function Home() {
    const { savedWords, updateState } = useWordList();
    return <WordCardFlip words={savedWords} updateState={updateState} />;
}
