"use client";
import React from "react";
import Link from "next/link";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Trash, SquareMousePointer } from "lucide-react";
import { updateFolder, deleteFolder } from "@/lib/api/folder";
import { arch } from "os";

export const FolderCard = ({ folder, token }: { folder: any; token: string }) => {
    const [newName, setNewName] = React.useState(folder.name);
    const archive = async () => {
        await deleteFolder(token, folder.id);
    };
    const edit = async () => {
        await updateFolder(token, folder.id, newName);
    };

    return (
        <div className="w-full h-full flex items-center hover:bg-muted rounded-md p-2">
            <Link href={{ pathname: "/folder", query: { id: folder.id } }} className="flex items-center w-full h-full">
                <div className="w-fit h-fit p-3 rounded-xl mr-3 bg-primary">
                    <Folder size={28} />
                </div>
                <div className="flex-col">
                    <CardTitle className="flex">{folder?.name}</CardTitle>
                    <CardDescription>total: {folder?.len}</CardDescription>
                </div>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-fit h-fit p-3 rounded-xl ml-auto">
                        <EllipsisVertical size={18} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Config</DropdownMenuLabel>
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
                                <DialogTitle>Enter folder name</DialogTitle>
                                <Input placeholder="folder name" onChange={(e) => setNewName(e.target.value)} />
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
                                <DialogTitle>Delete folder</DialogTitle>
                                <DialogDescription>Are you sure you want to delete this folder?</DialogDescription>
                            </DialogHeader>
                            <Button variant="outline" onClick={archive}>
                                Submit
                            </Button>
                        </DialogContent>
                    </Dialog>
                    <DropdownMenuItem>
                        <SquareMousePointer size={14} className="mr-2" />
                        Manage
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
