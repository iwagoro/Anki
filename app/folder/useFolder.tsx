"use client";
import { useState, useEffect, useContext, use } from "react";
import { AppContext } from "@/provider/provider";
import { getFolderContent } from "@/lib/api/folder";
import { useSearchParams } from "next/navigation";
export default function useFolder() {
    const { user } = useContext(AppContext);
    const [wordLists, setWordLists] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const folderId = searchParams.get("id");

    useEffect(() => {
        user.token &&
            folderId &&
            getFolderContent(user.token, folderId).then((res) => {
                console.log(res);
                setWordLists(res);
            });
    }, [folderId]);

    return { wordLists };
}
