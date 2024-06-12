"use client";
import { useState, useContext, useCallback } from "react";
import { AppContext } from "@/provider/provider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddListDialog } from "@/app/home/vocab-list/add-list-dialog";
import VocabListItem from "./vocab-list-item";
import { createVocabList, updateVocabListName, deleteVocabList, moveVocabListToFolder } from "@/lib/api/vocab-list";

export default function VocabLists() {
    const { user, vocabLists, setVocabLists } = useContext(AppContext);
    const [newName, setNewName] = useState("");

    const create = useCallback(
        async (name: string) => {
            const vocabList = await createVocabList(user.token, name);
            setVocabLists((prev) => [...prev, vocabList]);
        },
        [user.token, setVocabLists]
    );

    const update = useCallback(
        async (list_id: number, newName: string) => {
            await updateVocabListName(user.token, list_id, newName);
            setVocabLists((prev) => prev.map((list) => (list.id === list_id ? { ...list, name: newName } : list)));
        },
        [user.token, setVocabLists]
    );

    const archive = useCallback(
        async (list_id: number) => {
            await deleteVocabList(user.token, list_id);
            setVocabLists((prev) => prev.filter((list) => list.id !== list_id));
        },
        [user.token, setVocabLists]
    );

    const move = useCallback(
        async (list_id: number, folder_id: number) => {
            moveVocabListToFolder(user.token, list_id, folder_id).then(() => setVocabLists((prev) => prev.filter((list) => list.id !== list_id)));
        },
        [user.token, setVocabLists]
    );

    return (
        <Card className="w-full">
            <CardHeader className="w-full flex-row justify-between items-center">
                <CardTitle className="text-left">Lists</CardTitle>
                <AddListDialog createList={create} />
            </CardHeader>
            <CardContent className="w-full grid grid-cols-2 gap-5">
                {vocabLists.map((list) => (
                    <VocabListItem key={list.id} list={list} updateList={update} deleteList={archive} moveList={move} />
                ))}
            </CardContent>
        </Card>
    );
}
