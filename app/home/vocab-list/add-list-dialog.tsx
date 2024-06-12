"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AddListDialog = ({ createList }: { createList: Function }) => {
    const [listName, setListName] = useState<string>("");
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="py-4">
                    <Plus size={18} className="mr-3" />
                    New List
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="gap-4">
                    <DialogTitle>Enter list name</DialogTitle>
                    <Input placeholder="list name" onChange={(e) => setListName(e.target.value)} />
                </DialogHeader>
                <Button variant="outline" onClick={() => createList(listName)}>
                    Add
                </Button>
            </DialogContent>
        </Dialog>
    );
};
