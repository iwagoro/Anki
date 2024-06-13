"use client";
import { useState, useContext, useCallback, useEffect, useRef } from "react";
import { AppContext } from "@/provider/provider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AddListDialog } from "@/app/home/vocab-list/add-list-dialog";
import VocabListItem from "./vocab-list-item";
import { createVocabList, updateVocabListName, deleteVocabList, moveVocabListToFolder } from "@/lib/api/vocab-list";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function VocabLists() {
    const { user, vocabLists, setVocabLists, recentId } = useContext(AppContext);
    const [vocabListIdMap, setVocabListIdMap] = useState<{ id: number; addres: number }[]>([]);
    const heightRef = useRef<HTMLDivElement>(null);

    const [itemHeight, setItemHeight] = useState(0);

    useEffect(() => {
        if (heightRef.current) {
            setItemHeight(heightRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        setVocabListIdMap([]);
        vocabLists.map((list, index) => {
            setVocabListIdMap((prev) => [...prev, { id: list.id, addres: index }]);
        });
    }, [vocabLists]);

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
        <>
            <Card className="w-full">
                <CardHeader className="w-full flex-row justify-between items-center">
                    <CardTitle className="text-left">Lists</CardTitle>
                    <AddListDialog createList={create} />
                </CardHeader>
                <CardContent className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {vocabLists.map((list) => (
                        <VocabListItem key={list.id} list={list} updateList={update} deleteList={archive} moveList={move} />
                    ))}
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader className="w-full flex-row justify-between items-center">
                    <CardTitle className="text-left">Recently used</CardTitle>
                </CardHeader>
                <CardContent className="w-full grid  gap-5">
                    {recentId.length === 0 && <CardDescription>You haven't used any lists recently. Add a list to get started.</CardDescription>}
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        orientation="vertical"
                        className="w-full"
                    >
                        <CarouselContent className="-mt-1 w-full" style={{ height: itemHeight }}>
                            {recentId.map((id, index) => {
                                const list = vocabLists.find((list) => list.id === id);
                                return (
                                    list && (
                                        <CarouselItem key={index} ref={index === 0 ? heightRef : null}>
                                            <VocabListItem key={list.id} list={list} updateList={update} deleteList={archive} moveList={move} />
                                        </CarouselItem>
                                    )
                                );
                            })}
                        </CarouselContent>
                    </Carousel>
                </CardContent>
            </Card>
        </>
    );
}
