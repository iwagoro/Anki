"use client";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge } from "@mui/x-charts/Gauge";
import { MdDelete, MdAdd, MdSearch } from "react-icons/md";
import { addWordToPreset, deletePreset } from "./data-util";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";

export const PresetCard = ({ name, description, length, known }: { name: string; description: string; length: number; known: number }) => {
    const [isExisted, setIsExisted] = useState(true);
    const [csv, setCSV] = useState("");
    return (
        <div className={`w-full md:w-[45%] ${isExisted === true ? " " : " hidden"}`}>
            <Card>
                <Link href={`/${length !== 0 ? name : "home"}`}>
                    <CardHeader>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>last seen :{description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-3">
                        <Gauge width={240} height={240} value={(known * 100) / length} text={`${known} / ${length}`} />
                    </CardContent>
                </Link>
                <CardFooter>
                    <div className="w-full flex items-center justify-start gap-2">
                        <Button variant="outline">
                            <MdDelete
                                onClick={async () => {
                                    setIsExisted(false);
                                    const date = format(new Date(), "yyyy-MM-dd");
                                    await deletePreset(name);
                                    toast(name + "was deleted sucessfully", { description: date });
                                }}
                            ></MdDelete>
                        </Button>
                        <Popover>
                            <PopoverTrigger>
                                <Button variant="outline">
                                    <MdAdd></MdAdd>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <CardHeader>
                                    <CardTitle>Add words from CSV</CardTitle>
                                    <CardDescription>currently, the CSV file should have the following columns: word, definition</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full">
                                        <Label className="w-full">Paste CSV here</Label>
                                        <textarea
                                            className="w-full border border-border"
                                            onChange={(e) => {
                                                if (e.target.value !== null) {
                                                    setCSV(e.target.value);
                                                }
                                            }}
                                        ></textarea>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button
                                        onClick={() => {
                                            if (csv !== "") {
                                                addWordToPreset(csv, name);
                                            }
                                            const date = format(new Date(), "yyyy-MM-dd");
                                            toast(name + "was added sucessfully", { description: date });
                                        }}
                                        className={csv !== "" ? "" : "opacity-[0.1]"}
                                    >
                                        Proceed
                                    </Button>
                                </CardFooter>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

/**
 * 
                        <Button variant="outline">
                            <MdAdd onClick={async () => await addWordToPreset(csv, name)}></MdAdd>
                        </Button>
 */
