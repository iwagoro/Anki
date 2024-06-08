"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/provider/provider";
import { useSearchParams } from "next/navigation";
import { getVocabListWords } from "@/lib/api/vocab-list";

export default function useWordList() {
    const { user, setUser } = useContext(AppContext);
    const [words, setWords] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const list_name = searchParams.get("name");

    useEffect(() => {
        list_name &&
            getVocabListWords(user.token, list_name).then((res) => {
                setWords(res);
            });
    }, [list_name]);

    return { user, words, list_name };
}
