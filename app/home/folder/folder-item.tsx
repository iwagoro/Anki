"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, Pencil, Trash, Folder } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { folderType } from "@/lib/types";
import Link from "next/link";

export default function FolderItem({ folder, editFolder, deleteFolder }: { folder: folderType; editFolder: (id: number, name: string) => void; deleteFolder: (id: number) => void }) {
    const [newName, setNewName] = useState("");

    return (
        <Card className="w-full flex items-center hover:bg-muted rounded-md">
            <CardHeader className="w-full h-full flex flex-row items-center hover:bg-muted rounded-md">
                <Link href={{ pathname: "/folder", query: { id: folder.id } }} className="w-full">
                    <div className="flex items-center">
                        <div className="w-fit h-fit p-3 rounded-xl mr-3" style={{ backgroundColor: folder.color }}>
                            <Folder size={28} />
                        </div>
                        <div className="flex-col">
                            <CardTitle className="flex">{folder?.name}</CardTitle>
                            <CardDescription>total: {folder?.len}</CardDescription>
                        </div>
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
                                    <Input placeholder="folder name" onChange={(e: any) => setNewName(e.target.value)} />
                                </DialogHeader>
                                <Button variant="outline" onClick={() => editFolder(folder.id, newName)}>
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
                                <Button variant="outline" onClick={() => deleteFolder(folder.id)}>
                                    Submit
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
        </Card>
    );
}
