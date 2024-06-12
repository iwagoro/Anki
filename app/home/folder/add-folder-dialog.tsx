"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AddFolderDialog = ({ createFolder }: { createFolder: Function }) => {
    const [folderName, setFolderName] = useState<string>("");
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="py-4">
                    <Plus size={18} className="mr-3" />
                    New Folder
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="gap-4">
                    <DialogTitle>Enter folder name</DialogTitle>
                    <Input placeholder="folder name" onChange={(e) => setFolderName(e.target.value)} />
                </DialogHeader>
                <Button variant="outline" onClick={() => createFolder(folderName)}>
                    Add
                </Button>
            </DialogContent>
        </Dialog>
    );
};
