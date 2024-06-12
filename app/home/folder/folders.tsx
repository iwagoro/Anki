"use client";
import { useContext, useState } from "react";
import { AppContext } from "@/provider/provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddFolderDialog } from "@/app/home/folder/add-folder-dialog";
import FolderItem from "./folder-item";
import { createFolder, deleteFolder, updateFolder } from "@/lib/api/folder";

export default function Folders() {
    const { user, folders, setFolders } = useContext(AppContext);
    const [newName, setNewName] = useState("");

    const create = async (folderName: string) => {
        createFolder(user.token, folderName).then((folder) => setFolders((prev) => [...prev, folder]));
    };

    const archive = async (folder_id: number) => {
        deleteFolder(user.token, folder_id).then(() => setFolders((prev) => prev.filter((folder) => folder.id !== folder_id)));
    };

    const edit = async (folder_id: number) => {
        await updateFolder(user.token, folder_id, newName).then(() => setFolders((prev) => prev.map((folder) => (folder.id === folder_id ? { ...folder, name: newName } : folder))));
    };

    return (
        <Card className="w-full">
            <CardHeader className="w-full flex-row justify-between items-center">
                <CardTitle className="text-left">Folders</CardTitle>
                <AddFolderDialog createFolder={create} />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {folders.map((folder) => (
                    <FolderItem key={folder.id} folder={folder} editFolder={edit} deleteFolder={archive} />
                ))}
            </CardContent>
        </Card>
    );
}
