"use client";
import { useState, useEffect, useContext } from "react";
import { WordContext } from "./wordProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DominoSpinner, WaveSpinner } from "react-spinners-kit";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

type Inputs = {
    phrases: { word: string; definition: string }[];
};

export default function ConfirmWord() {
    const { csv, isCompleted, isLoading, createVocabList } = useContext(WordContext);
    const { register, handleSubmit, control } = useForm<Inputs>({
        defaultValues: {
            phrases: csv,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "phrases",
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        createVocabList(data.phrases);
    };

    return (
        <>
            <div className="w-full flex flex-col justify-start items-start gap-5">
                <p className="text-2xl font-bold">Confirm Words</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
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
                                        <Input type="text" {...register(`phrases.${index}.word`)} className="w-full" />
                                    </TableCell>
                                    <TableCell>
                                        <Input type="text" {...register(`phrases.${index}.definition`)} className="w-full" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </div>

            <Dialog open={isLoading}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Loading...</DialogTitle>
                        <DialogDescription>Please wait while we process your request.</DialogDescription>
                    </DialogHeader>

                    <div className="w-full flex justify-center">
                        <DominoSpinner size={140} color="crimson" />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isCompleted}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Success</DialogTitle>
                        <DialogDescription>Phrases have been added successfully</DialogDescription>
                    </DialogHeader>

                    <div className="w-full flex justify-center">
                        <CheckCheck size={100} color="limegreen" />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
