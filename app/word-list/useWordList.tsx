"use client";

import { useState, useEffect, useContext, use } from "react";
import { AppContext } from "@/provider/provider";
import { useSearchParams } from "next/navigation";
import { getVocabListWords } from "@/lib/api/vocab-list";
import useWord from "@/lib/localStorage/useWord";
import useVocabList from "@/lib/localStorage/useVocabList";

export default function useWordList() {
    const { user, addRecentVocabList } = useContext(AppContext);
    const [words, setWords] = useState<any[]>([]);
    const { savedWords, addWords, updateState } = useWord();
    const searchParams = useSearchParams();
    const list_id = parseInt(searchParams.get("id")!);

    useEffect(() => {
        list_id &&
            user.token &&
            getVocabListWords(user.token, list_id).then((res) => {
                addRecentVocabList(list_id);
                addWords(res);
                setWords(res);
            });
    }, [list_id, user.token]);

    return { user, words, setWords, list_id, savedWords, updateState };
}
