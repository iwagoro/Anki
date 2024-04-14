"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AppContext } from "../../components/util/provider";
import { useContext } from "react";
import { DataTable } from "@/components/util/database";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "@/components/util/firebase";
import { WordCardListView, WordCardFlip } from "@/components/util/word-card";
import { getWords } from "@/components/util/data-util";
export default function Home() {
    const db = getFirestore(app);
    const [words, setWords] = useState<{ word: string; definition: string; forgot: boolean }[]>([]);
    const { isList, isFocused, isDB, autoPlay } = useContext(AppContext);
    const [focusWords, setFocusWords] = useState<{ word: string; definition: string; forgot: boolean }[]>([]);
    const { user } = useContext(AppContext);
    const param = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "user", user, "presets", param.cards as string);
            const words = await getWords(user, param.cards as string);
            const shuffledWords = words.sort(() => Math.random() - 0.5);
            setWords(shuffledWords);
        };
        if (user !== "") fetchData();
    }, [user]);

    return (
        <div className="py-[70px] w-full h-full px-5  overflow-scroll hidden-scrollbar">
            {isList && !isDB && <WordCardListView originWords={words} />}
            {!isList && isDB && <DataTable words={words} />}
            {!isList && !isDB && <WordCardFlip originWords={words} />}
        </div>
    );
}
