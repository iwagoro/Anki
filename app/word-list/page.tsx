"use client";
import { WordCardFlip } from "./word-card";
import useWordList from "./useWordList";

export default function Home() {
    const { user, words, list_name } = useWordList();
    return <WordCardFlip words={words} list_name={list_name || ""} token={user.token} />;
}
