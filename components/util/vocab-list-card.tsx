"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteVocabList, updateVocabListName } from "@/lib/api/vocab-list";
import MoveVocabListDialog from "./move-list-dialog";

export const VocabListCard = ({ list, token }: { list: any; token: string }) => {
    const [newName, setNewName] = React.useState(list.name);
    const archive = async () => {
        await deleteVocabList(token, list.id);
    };
    const edit = async () => {
        await updateVocabListName(token, list.id, newName);
    };

    return (
        <Card>
            <CardHeader className="w-full flex flex-row items-center">
                <Link href={{ pathname: "/word-list", query: { name: list?.name } }} className="flex items-center w-full h-full">
                    <div className="p-3 rounded-xl mr-3 bg-primary">
                        <File size={28} />
                    </div>
                    <div className="flex-col">
                        <CardTitle>{list?.name}</CardTitle>
                        <CardDescription>total: {list?.len}</CardDescription>
                        <CardDescription>correct: {list?.correct}</CardDescription>
                    </div>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-fit h-fit p-3 rounded-xl ml-auto">
                            <EllipsisVertical size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>config</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start px-[7px]">
                                    <Pencil size={14} className="mr-2" />
                                    Edit
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="gap-4">
                                    <DialogTitle>Edit List</DialogTitle>
                                    <DialogDescription>Enter the new name for the list</DialogDescription>
                                    <Input placeholder="list name" onChange={(e) => setNewName(e.target.value)} />
                                </DialogHeader>
                                <Button variant="outline" onClick={edit}>
                                    Submit
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start px-[7px]">
                                    <Trash size={14} className="mr-2" />
                                    Delete
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="gap-4">
                                    <DialogTitle>Delete List</DialogTitle>
                                    <DialogDescription>Are you sure you want to delete this list?</DialogDescription>
                                </DialogHeader>
                                <Button variant="outline" onClick={archive}>
                                    Submit
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <MoveVocabListDialog token={token} list={list} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <Progress value={(list?.correct / list?.len) * 100} />
            </CardContent>
        </Card>
    );
};
