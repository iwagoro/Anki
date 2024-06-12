"use client";
import { useContext, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow, TableHeader } from "@/components/ui/table";
import { File, EllipsisVertical, Pencil, Trash, ArrowRight, ArrowRightLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AppContext } from "@/provider/provider";

interface VocabList {
    id: number;
    name: string;
    len: number;
    correct: number;
    color: string;
}

interface VocabListCardProps {
    list: VocabList;
    updateList: (list_id: number, newName: string) => void;
    deleteList: (list_id: number) => void;
    moveList: (list_id: number, folder_id: number) => void;
}

export default function VocabListItem({ list, updateList, deleteList, moveList }: VocabListCardProps) {
    const [newName, setNewName] = useState("");
    const [selectedId, setSelectedId] = useState<number>();
    const { folders } = useContext(AppContext);

    return (
        <Card>
            <CardHeader className="w-full flex flex-row items-center">
                <Link href={{ pathname: "/word-list", query: { id: list?.id } }} className="flex items-center w-full h-full">
                    <div className="p-3 rounded-xl mr-3" style={{ backgroundColor: list.color }}>
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
                                    <DialogTitle>Edit List</DialogTitle>
                                    <DialogDescription>Enter the new name for the list</DialogDescription>
                                    <Input placeholder="list name" onChange={(e) => setNewName(e.target.value)} />
                                </DialogHeader>
                                <Button variant="outline" onClick={() => updateList(list.id, newName)}>
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
                                <Button variant="outline" onClick={() => deleteList(list.id)}>
                                    Submit
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start px-[7px]">
                                    <ArrowRightLeft size={14} className="mr-2" />
                                    Move
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="gap-4">
                                    <DialogTitle>Move to Folder</DialogTitle>
                                    <DialogDescription>Select folders</DialogDescription>
                                </DialogHeader>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell>Folder Name</TableCell>
                                            <TableCell className="text-right w-fit">Number of lists</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {folders.map((folder) => (
                                            <TableRow
                                                key={folder.id}
                                                onClick={() => {
                                                    selectedId === folder.id ? setSelectedId(0) : setSelectedId(folder.id);
                                                }}
                                            >
                                                <TableCell>
                                                    <div className="w-full flex items-center space-x-2">
                                                        <Checkbox checked={selectedId === folder.id} />
                                                        <label className="w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{folder.name}</label>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">{folder.len}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Button variant="outline" onClick={() => selectedId && moveList(list.id, selectedId)}>
                                    Submit
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <Progress value={(list?.correct / list?.len) * 100} />
            </CardContent>
        </Card>
    );
}
