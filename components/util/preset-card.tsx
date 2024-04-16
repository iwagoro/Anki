"use client";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge } from "@mui/x-charts/Gauge";
import { MdDelete, MdAdd, MdSearch } from "react-icons/md";
import { addWordToPreset, deletePreset, exportWordsToCSV } from "./data-util";
import { useState, useContext } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";
import { H3 } from "./typography";
import { Textarea } from "../ui/textarea";
import { AppContext } from "./provider";
import { CiExport } from "react-icons/ci";

export const PresetCard = ({ name, description, length, known }: { name: string; description: string; length: number; known: number }) => {
    const [csv, setCSV] = useState("");
    const { user } = useContext(AppContext);
    const data = [
        {
            name: "A",
            x: length,
            fill: "#96908D",
        },
        {
            name: "B",
            x: known,
            fill: "#f97316",
        },
    ];

    const style = {
        top: "50%",
        right: 0,
        transform: "translate(0, -50%)",
        lineHeight: "24px",
    };
    return (
        <div className={`w-full h-full `}>
            <Card>
                <Link href={`/${length !== 0 ? name : "home"}`}>
                    <CardHeader>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>last seen :{description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                        <RadialBarChart width={150} height={150} data={data} innerRadius="60%" outerRadius="100%">
                            <RadialBar dataKey="x" />
                            <text x={75} y={75} textAnchor="middle" dominantBaseline="middle" className="text-md font-semibold " style={{ fill: "#96908d" }}>
                                {known}/{length}
                            </text>
                        </RadialBarChart>
                    </CardContent>
                </Link>
                <CardFooter>
                    <div className="w-full grid grid-cols-3 justify-items-center">
                        <MdDelete
                            className="cursor-pointer"
                            onClick={async () => {
                                const date = format(new Date(), "yyyy-MM-dd");
                                await deletePreset(user, name);
                                toast(name + "was deleted sucessfully", { description: date });
                            }}
                        ></MdDelete>
                        <Popover>
                            <PopoverTrigger>
                                <MdAdd className="cursor-pointer"></MdAdd>
                            </PopoverTrigger>
                            <PopoverContent>
                                <CardHeader>
                                    <CardTitle>Add words from CSV</CardTitle>
                                    <CardDescription>currently, the CSV file should have the following columns: word, definition</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full">
                                        <Label className="w-full">Paste CSV here</Label>
                                        <Textarea
                                            placeholder="word, definition"
                                            onChange={(e) => {
                                                if (e.target.value !== null) {
                                                    setCSV(e.target.value);
                                                }
                                            }}
                                        ></Textarea>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button
                                        onClick={() => {
                                            if (csv !== "") {
                                                addWordToPreset(user, csv, name);
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

                        <CiExport
                            className="cursor-pointer"
                            onClick={async (e) => {
                                toast("copied to clipboard");
                                const csv = await exportWordsToCSV(user, name);
                                navigator.clipboard.writeText(csv);
                            }}
                        ></CiExport>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};
