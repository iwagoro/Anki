"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { makePreset, getPresets, addWordFromCSV } from "@/components/util/data-util";
import { P } from "@/components/util/typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
            <CardHeader>
                <CardTitle>Add words from CSV</CardTitle>
                <CardDescription>currently, the CSV file should have the following columns: word, definition</CardDescription>
            </CardHeader>
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
                        className="w-full"
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
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            } else if (csv !== "") {
                                console.log(csv);
                                addWordFromCSV(csv, presetName);
                            }
                        }
                    }}
                    className={presetName !== "" ? "" : "opacity-[0.1]"}
                >
                    Proceed
                </Button>
            </CardContent>
        </Card>
    );
};
