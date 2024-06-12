"use client";

import { useContext, useState, useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSentence from "@/lib/localStorage/useSentence";
import { useSearchParams, usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { extractSentence } from "@/lib/api/word";
import { AppContext } from "@/provider/provider";
import { AddContext } from "./add-provider";
import { toZonedTime } from "date-fns-tz";

export default function Step1() {
    const [file, setFile] = useState<FileList | null>(null);
    const { savedSentences, addSentence } = useSentence();
    const { sentence, setSentence } = useContext(AddContext);
    const [selectedName, setSelectedName] = useState<string>("");
    const { user } = useContext(AppContext);
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = usePathname().split("/")[2];
    const list_id = searchParams.get("list_id");

    const onUpload = () => {
        console.log(type, list_id);
        if (file) {
            extractSentence(user.token, file[0]).then((sentence) => {
                if (sentence) {
                    const today = new Date();
                    const japan_date = toZonedTime(today, "Asia/Tokyo");
                    addSentence({ name: file[0].name, sentence: sentence, date: japan_date });
                    setSentence(sentence);
                }
            });
        } else if (selectedName !== "") {
            const savedSentence = savedSentences.find((item) => item.name === selectedName);
            if (!savedSentence) return;
            setSentence(savedSentence.sentence);
        } else {
            return;
        }

        const url = `/add-word/${type}/?step=2&list_id=${list_id}`;
        router.push(url);
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Upload Image</CardTitle>
                    <CardDescription>Upload a image file to add words</CardDescription>
                    <CardDescription>.jpeg .jpg .png files are supported</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label className="text-md font-bold">Create New</Label>
                    <Input type="file" accept=".jpeg,.jpg,.png" className="mt-2" onChange={(e) => setFile(e.target.files)} />
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
                                    <TableCell>name</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {savedSentences.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        onClick={() => {
                                            if (selectedName === item.name) {
                                                setSelectedName("");
                                            } else {
                                                setSelectedName(item.name);
                                                setFile(null);
                                            }
                                        }}
                                    >
                                        <TableCell className="w-5">
                                            <Checkbox checked={selectedName === item.name} className="pointer-events-none" />
                                        </TableCell>
                                        <TableCell> {item.name}</TableCell>
                                        <TableCell>{item?.date.toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={!file && selectedName === ""} onClick={onUpload}>
                        Upload
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
