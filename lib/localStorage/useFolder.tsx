"use client";
import { useState, useEffect, useContext, use } from "react";
import { folderType, vocabListType } from "../types";

export default function useFolder() {
    const [savedFolder, setSavedFolder] = useState<folderType[]>([]);

    useEffect(() => {
        const savedFolder = localStorage.getItem("savedFolder");
        if (savedFolder) {
            setSavedFolder(JSON.parse(savedFolder));
        }
    }, []);

    const updateFolder = (folder: folderType[]) => {
        localStorage.removeItem("savedFolder");
        localStorage.setItem("savedFolder", JSON.stringify(folder));
        setSavedFolder(folder);
    };

    return { savedFolder, updateFolder };
}
