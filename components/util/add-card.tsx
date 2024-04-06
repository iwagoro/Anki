"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getPresets, addWordFromCSV } from "@/components/util/data-util";
import { P } from "@/components/util/typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const readCSVFile = async (file: any) => {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                resolve(text);
            };
            reader.readAsText(file);
        } else {
            reject(new Error("No file provided"));
        }
    });
};

export const AddCard = () => {
    const [file, setFile] = useState({});
    const [csv, setCSV] = useState("");
    const [presetName, setPresetName] = useState("");
    return (
        <Card>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="p-6 flex items-center">
                        <div className="flex flex-col items-start gap-2">
                            <CardTitle>Add words from CSV</CardTitle>
                            <CardDescription>currently, the CSV file should have the following columns: word, definition</CardDescription>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CardContent className="flex flex-col items-end gap-5">
                            <div className="w-full">
                                <Label className="w-full">Upload CSV File here</Label>
                                <Input
                                    type="file"
                                    className="w-full"
                                    onChange={(e) => {
                                        if (e.target.files !== null) {
                                            setFile(e.target.files[0]);
                                        }
                                    }}
                                ></Input>
                            </div>

                            <div className="w-full flex justify-center">
                                <P>or</P>
                            </div>

                            <div className="w-full">
                                <Label className="w-full">Paste CSV here</Label>
                                <textarea
                                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="word, definition"
                                    onChange={(e) => {
                                        if (e.target.value !== null) {
                                            setCSV(e.target.value);
                                        }
                                    }}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <Label className="w-full">Enter preset name</Label>
                                <Input
                                    type="Text"
                                    placeholder="Preset Name"
                                    onChange={(e) => {
                                        setPresetName(e.target.value);
                                    }}
                                ></Input>
                            </div>

                            <Button
                                onClick={() => {
                                    if (presetName !== "") {
                                        if (Object.keys(file).length !== 0) {
                                            readCSVFile(file)
                                                .then((csvData) => {
                                                    console.log(csvData); // 適切なCSVデータがログに表示されるはず
                                                    addWordFromCSV(csvData as string, presetName);
                                                    const date = format(new Date(), "yyyy-MM-dd");
                                                    toast(name + "was added sucessfully", { description: date });
                                                })
                                                .catch((error) => {
                                                    console.error(error);
                                                });
                                        } else if (csv !== "") {
                                            console.log(csv);
                                            addWordFromCSV(csv, presetName);

                                            const date = format(new Date(), "yyyy-MM-dd");
                                            toast(name + "was added sucessfully", { description: date });
                                        }
                                    }
                                }}
                                className={presetName !== "" ? "" : "opacity-[0.1]"}
                            >
                                Proceed
                            </Button>
                        </CardContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};
