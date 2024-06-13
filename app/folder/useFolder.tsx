"use client";
import { useState, useEffect, useContext, use } from "react";
import { AppContext } from "@/provider/provider";
import { getFolderContent } from "@/lib/api/folder";
import { useSearchParams } from "next/navigation";
import useWord from "@/lib/localStorage/useWord";
export default function useFolder() {
    const { user } = useContext(AppContext);
    const [wordLists, setWordLists] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const folderId = searchParams.get("id");

    const { savedWords, applyUpdate } = useWord();

    useEffect(() => {
        applyUpdate();
    }, [savedWords]);

    useEffect(() => {
        user.token &&
            folderId &&
            getFolderContent(user.token, folderId).then((res) => {
                setWordLists(res);
            });
    }, [folderId]);

    return { wordLists };
}
