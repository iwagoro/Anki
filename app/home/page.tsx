"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AddFolderDialog } from "@/components/util/add-folder-dialog";
import { FolderCard } from "@/components/util/folder-card";
import { LoadingDialog } from "@/components/util/loading-dialog";
import { VocabListCard } from "@/components/util/vocab-list-card";
import useHome from "./useHome";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const { wordLists, folders, isLoading, createFolder, user } = useHome();
    const [folderName, setFolderName] = useState<string>("");

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Card className="w-full">
                <CardHeader className="w-full flex-row justify-between items-center">
                    <CardTitle className="text-left">Folders</CardTitle>

                    <AddFolderDialog createFolder={createFolder} />
                </CardHeader>
                <CardContent>
                    {folders.map((folder, index) => (
                        <FolderCard key={index} folder={folder} token={user.token} />
                    ))}
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader className="w-full flex-row justify-between items-center">
                    <CardTitle className="text-left">Lists</CardTitle>

                    <Link href="/add-word/?type=image&step=0">
                        <Button variant="outline" className="py-4">
                            <Plus size={18} className="mr-3" />
                            New List
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="w-full grid grid-cols-2 gap-5">
                    {wordLists.map((list, index) => (
                        <VocabListCard key={index} list={list} token={user.token} />
                    ))}
                </CardContent>
            </Card>

            <LoadingDialog isLoading={isLoading} />
        </div>
    );
}
