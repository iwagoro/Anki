"use client";
import { useState, useEffect, useContext, use } from "react";
import useFolder from "./useFolder";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { File } from "lucide-react";

import Link from "next/link";
export default function Home() {
    const { wordLists } = useFolder();
    const [color, setColor] = useState("#000000");

    const getRandomPastelColor = () => {
        const colors = ["deepskyblue", "limegreen", "blueviolet", "orange", "crimson", "slateblue", "oranged"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        const randomColor = getRandomPastelColor();
        setColor(randomColor);
        console.log(randomColor);
    }, []);
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5 ">
            <div className="w-full grid grid-cols-2 gap-5">
                {Array.isArray(wordLists) &&
                    wordLists.map((list, index) => (
                        <Link key={index} href={{ pathname: "/word-list", query: { name: list?.name } }}>
                            <Card key={index}>
                                <CardHeader className="w-full flex flex-row items-center">
                                    <div className={` p-3 rounded-xl mr-3`} style={{ backgroundColor: color }}>
                                        <File size={28} />
                                    </div>
                                    <div className="flex-col">
                                        <CardTitle>{list?.name}</CardTitle>
                                        <CardDescription>total : {list?.len}</CardDescription>
                                        <CardDescription>correct : {list?.correct}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Progress value={list?.correct / list?.len} />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
