"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { H2, H3, P } from "@/components/util/typography";
import ReactCardFlip from "react-card-flip";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { setAsForgot, setAsLearn } from "@/components/util/data-util";

export const WordCard1 = ({ word, definition, forgot }: Readonly<{ word: string; definition: string; forgot: boolean }>) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const cardStyle = "flex flex-col items-center justify-center max-w-md w-full  h-[500px]";

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className="flex justify-center box-border ">
                <Card className={forgot === true ? "bg-red-100" + " " + cardStyle : cardStyle} onClick={flipCard}>
                    <H2>{word}</H2>
                </Card>
            </div>
            <div className="flex justify-center box-border ">
                <Card className={forgot === true ? "bg-red-100" + " " + cardStyle : cardStyle} onClick={flipCard}>
                    <P>{definition}</P>
                </Card>
            </div>
        </ReactCardFlip>
    );
};

export const WordCard2 = ({ preset, words }: Readonly<{ preset: string; words: { word: string; definition: string; forgot: boolean }[] }>) => {
    const [forgotIndex, setForgotIndex] = useState<number[]>([]);
    return (
        <>
            {words.map((word: { word: string; definition: string; forgot: boolean }, index: number) => (
                <Card key={"listed-card" + index} className={word.forgot === true || forgotIndex.includes(index) ? "bg-red-100" : ""}>
                    <CardHeader>
                        <CardTitle>{word.word}</CardTitle>
                        <CardDescription>{word.definition}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-auto flex items-center">
                            <Button
                                className=" w-[300px] h-auto gap-3 items-center"
                                variant="outline"
                                onClick={() => {
                                    setAsForgot(preset, index, words);
                                    setForgotIndex((prev) => [...prev, index]);
                                }}
                            >
                                <MdThumbDown size={24}></MdThumbDown>
                                don't know
                            </Button>
                            <Button
                                className=" w-[300px] h-auto gap-3 items-center"
                                variant="outline"
                                onClick={() => {
                                    setAsLearn(preset, index, words);
                                    setForgotIndex((prev) => prev.filter((i) => i !== index));
                                }}
                            >
                                know
                                <MdThumbUp size={24}></MdThumbUp>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};
