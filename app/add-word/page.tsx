"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/provider/provider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createVocabList } from "@/lib/api/vocab-list";
import { useRouter } from "next/navigation";

const Home = () => {
    const [type, setType] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(0);
    const [newName, setNewName] = useState("");
    const { user, vocabLists } = useContext(AppContext);
    const router = useRouter();

    const onSubmit = () => {
        if (newName) {
            createVocabList(user.token, newName).then((res) => {
                const url = `/add-word/${type}/?step=1&list_id=${res.id}`;
                router.push(url);
            });
        } else if (selectedId) {
            const url = `/add-word/${type}/?step=1&list_id=${selectedId}`;
            router.push(url);
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Choose Type</CardTitle>
                    <CardDescription>Choose the method you want to use to add the word</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-5">
                    <Button variant="outline" className={type === "direct" ? "border-primary" : "border-border"} onClick={() => setType("direct")}>
                        Direct
                    </Button>
                    <Button variant="outline" className={type === "csv" ? "border-primary" : "border-border"} onClick={() => setType("csv")}>
                        CSV
                    </Button>
                    <Button variant="outline" className={type === "image" ? "border-primary" : "border-border"} onClick={() => setType("image")}>
                        Image
                    </Button>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Choose list</CardTitle>
                    <CardDescription>Choose which vocab list you would like to add to the vocabulary list</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label className="text-md font-bold">Create New</Label>
                    <Input
                        placeholder="Enter list name"
                        className="mt-2"
                        onChange={(e) => {
                            setSelectedId(null);
                            setNewName(e.target.value);
                        }}
                    />
                </CardContent>
                <div className="relative mx-[18px] mb-[18px] flex items-center">
                    <Separator className="w-full" />
                    <Label className="absolute left-1/2 transform -translate-x-1/2 bg-card px-2">OR</Label>
                </div>
                <CardContent>
                    <Label className="text-md font-bold">Use already exists</Label>
                    <ScrollArea className="w-full max-h-64 h-full mt-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell className="w-5">
                                        <Checkbox disabled />
                                    </TableCell>
                                    <TableCell className="w-5">ID</TableCell>
                                    <TableCell>Vocab List Name</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vocabLists.map((list) => (
                                    <TableRow
                                        key={list.id}
                                        onClick={() => {
                                            selectedId === list.id ? setSelectedId(0) : setSelectedId(list.id);
                                            setNewName("");
                                        }}
                                    >
                                        <TableCell className="w-5">
                                            <Checkbox checked={selectedId === list.id} className="pointer-events-none" />
                                        </TableCell>
                                        <TableCell className="w-5"> {list.id}</TableCell>
                                        <TableCell>{list.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
            <Button className="w-full" disabled={(selectedId || newName !== "") && type !== "" ? false : true} onClick={onSubmit}>
                Next
            </Button>
        </div>
    );
};

export default Home;
