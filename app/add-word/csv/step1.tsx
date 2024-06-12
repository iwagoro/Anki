"use client";

import { useContext, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { addWordsFromArray } from "@/lib/api/word";
import { AppContext } from "@/provider/provider";

type Phrase = {
    word: string;
    definition: string;
};

type FormValues = {
    phrases: Phrase[];
};

export default function Step1() {
    const [file, setFile] = useState<FileList | null>(null);
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const { user } = useContext(AppContext);
    const searchParams = useSearchParams();
    const list_id = searchParams.get("list_id");

    const { register, handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            phrases: [],
        },
    });

    const { fields, append, replace } = useFieldArray({
        control,
        name: "phrases",
    });

    const onUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const csv = reader.result as string;
                const lines = csv.split("\n");
                const words = lines
                    .slice(1)
                    .map((line) => {
                        const [word, definition] = line.split(",");
                        if (word === "" || undefined || definition === "" || undefined) return;
                        return { word, definition };
                    })
                    .filter(Boolean) as Phrase[];
                console.log(words);
                setPhrases(words);
                replace(words); // replace existing fields with new fields
            };

            reader.readAsText(file[0]);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        user.token && list_id && addWordsFromArray(user.token, parseInt(list_id), data.phrases);
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Upload CSV</CardTitle>
                    <CardDescription>Upload a CSV file to add words</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label className="text-md font-bold">Create New</Label>
                    <Input type="file" accept=".csv" className="mt-2" onChange={(e) => setFile(e.target.files)} />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={!file} onClick={onUpload}>
                        Upload
                    </Button>
                </CardFooter>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                {fields.length > 0 && (
                    <>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Words</CardTitle>
                                <CardDescription>Words to be added</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>word</TableHead>
                                            <TableHead>definition</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fields.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <Input type="text" className="w-full" {...register(`phrases.${index}.word` as const)} defaultValue={item.word} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input type="text" className="w-full" {...register(`phrases.${index}.definition` as const)} defaultValue={item.definition} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Button type="submit">Finish</Button>
                    </>
                )}
            </form>
        </>
    );
}
