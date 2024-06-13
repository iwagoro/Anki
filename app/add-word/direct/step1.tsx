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
import { Minus, Plus } from "lucide-react";

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
            phrases: [{ word: "", definition: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "phrases",
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        user.token && list_id && addWordsFromArray(user.token, parseInt(list_id), data.phrases);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
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
                                    <TableHead>actions</TableHead>
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
                                        <TableCell className="w-24">
                                            <Button variant="ghost" onClick={() => remove(index)}>
                                                <Minus size={24} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <Button variant="outline" className="m-4" onClick={() => append({ word: "", definition: "" })}>
                                    <Plus size={24} />
                                </Button>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Button type="submit">Finish</Button>
            </form>
        </>
    );
}
