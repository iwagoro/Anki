"use client";
import React, { use, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { AddFolderDialog } from "@/components/util/add-folder-dialog";
import { FolderCard } from "@/components/util/folder-card";
import { LoadingDialog } from "@/components/util/loading-dialog";
import { VocabListCard } from "@/components/util/vocab-list-card";
import useHome from "./useHome";
import { Button } from "@/components/ui/button";
import { Flame, Plus, Trophy } from "lucide-react";
import Link from "next/link";
import { P } from "@/components/ui/typography";
import { Progress } from "@/components/ui/progress";

export default function Home() {
    const { wordLists, folders, isLoading, createFolder, user } = useHome();
    const [folderName, setFolderName] = useState<string>("");
    const [streakMessage, setStreakMessage] = useState<React.ReactNode>(null);

    useEffect(() => {
        if (user.streak === 0) {
            setStreakMessage(<P className="pt-2 text-[red]">You haven't started yet!</P>);
        } else if (user.streak === 1) {
            setStreakMessage(<P className="pt-2 text-[red]">You're on a 1-day streak!</P>);
        } else if (user.streak > 10) {
            setStreakMessage(<P className="pt-2 text-[green]">You're on a ${user.streak}-day streak! Keep it up!</P>);
        } else {
            setStreakMessage(<P className="pt-2 text-[blue]">You're on a ${user.streak}-day streak! Keep it up!</P>);
        }
    }, [user.streak]);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <div className="w-full grid grid-cols-2 gap-5">
                <Card className="w-full">
                    <CardHeader className="flex-row items-center">
                        <Trophy size={40} className="mr-3" />
                        <div>
                            <CardDescription>Today's Progress</CardDescription>
                            <CardTitle>Today : {user.total} words</CardTitle>
                            <CardDescription>Goal : {user.goal}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={(user.total / user.goal) * 100} />
                    </CardContent>
                </Card>
                <Card className="w-full h-fit">
                    <CardHeader className="flex-row items-center">
                        <Flame size={40} className="mr-3" />
                        <div>
                            <CardDescription>Streak</CardDescription>
                            <CardTitle>{user.streak} days</CardTitle>
                            <CardDescription>{streakMessage}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </div>

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
