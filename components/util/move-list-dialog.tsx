"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableCaption, TableRow, TableHeader } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRightLeft } from "lucide-react";
import { moveVocabListToFolder } from "@/lib/api/vocab-list";
import { getFolder } from "@/lib/api/folder";

const MoveVocabListDialog = ({ token, list }: { token: string; list: any }) => {
    const [folders, setFolders] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<number>(0);
    useEffect(() => {
        token && getFolder(token).then((res) => setFolders(res));
    }, [token]);
    const move = async () => {
        await moveVocabListToFolder(token, list.id, selectedId);
    };

    return (
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
                <Button variant="outline" onClick={move}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default MoveVocabListDialog;
