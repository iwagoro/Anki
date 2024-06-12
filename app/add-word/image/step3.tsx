"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AddContext } from "./add-provider";
import { AppContext } from "@/provider/provider";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { addWordsFromArray } from "@/lib/api/word";

type Phrase = {
    word: string;
    definition: string;
};

type FormValues = {
    phrases: Phrase[];
};

export default function Step3() {
    const { phrases, setPhrases } = useContext(AddContext);
    const { user } = useContext(AppContext);
    const [words, setWords] = useState<string[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = usePathname().split("/")[2];
    const list_id = searchParams.get("list_id");

    useEffect(() => {
        console.log(phrases);
    }, [phrases]);

    const { register, handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            phrases: phrases,
        },
    });

    const { fields, append, replace } = useFieldArray({
        control,
        name: "phrases",
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        user.token && list_id && addWordsFromArray(user.token, parseInt(list_id), data.phrases);
    };

    return (
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
    );
}
