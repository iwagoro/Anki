"use client";
import React, { use, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddListDialog } from "@/app/home/vocab-list/add-list-dialog";
import VocabListItem from "@/app/home/vocab-list/vocab-list-item";
import useFolder from "./useFolder";
export default function Home() {
    const { wordLists } = useFolder();

    const create = () => {};

    const update = () => {};

    const archive = () => {};

    const move = () => {};

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Card className="w-full">
                <CardHeader className="w-full flex-row justify-between items-center">
                    <CardTitle className="text-left">Lists</CardTitle>
                    <AddListDialog createList={create} />
                </CardHeader>
                <CardContent className="w-full grid grid-cols-2 gap-5">
                    {wordLists.map((list) => (
                        <VocabListItem key={list.id} list={list} updateList={update} deleteList={archive} moveList={move} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
