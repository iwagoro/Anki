"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { H2, H3, P } from "@/components/util/typography";
import ReactCardFlip from "react-card-flip";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { setAsForgot, setAsLearn, deleteWord, editWord } from "@/components/util/data-util";

import { MdDelete, MdEdit } from "react-icons/md";

export const WordCard1 = ({ word, definition, forgot, change }: { word: string; definition: string; forgot?: boolean; change?: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        setIsFlipped(false);
    }, [change]);

    const cardStyle = "flex flex-col items-center justify-center max-w-md w-full p-10  h-[400px]";

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className="flex justify-center box-border ">
                <Card className={forgot === true ? "border-primary" + " " + cardStyle : cardStyle} onClick={flipCard}>
                    <H2>{word}</H2>
                </Card>
            </div>
            <div className="flex justify-center box-border ">
                <Card className={forgot === true ? "border-primary" + " " + cardStyle : cardStyle} onClick={flipCard}>
                    <CardContent className={isFlipped === false ? "hidden" : ""}>
                        <P>{definition}</P>
                    </CardContent>
                </Card>
            </div>
        </ReactCardFlip>
    );
};

export const WordCard3 = ({ word, definition, forgot, change }: { word: string; definition: string; forgot?: boolean; change?: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {
        setInterval(() => {
            flipCard();
        }, 3000);
    }, []);

    const cardStyle = "flex flex-col items-center justify-center max-w-md w-full p-10  h-[400px]";

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className="flex justify-center box-border ">
                <Card className={forgot === true ? "border-primary" + " " + cardStyle : cardStyle} onClick={flipCard}>
                    <H2>{word}</H2>
                </Card>
            </div>
            <div className="flex justify-center box-border ">
                <Card className={forgot === true ? "border-primary" + " " + cardStyle : cardStyle} onClick={flipCard}>
                    <CardContent className={isFlipped === false ? "hidden" : ""}>
                        <P>{definition}</P>
                    </CardContent>
                </Card>
            </div>
        </ReactCardFlip>
    );
};

export const WordCard2 = ({ preset, words }: Readonly<{ preset: string; words: { word: string; definition: string; forgot: boolean }[] }>) => {
    const [forgotIndex, setForgotIndex] = useState<number[]>([]);
    const [deletedIndex, setDeletedIndex] = useState<number[]>([]);
    return (
        <>
            {words.map((word: { word: string; definition: string; forgot: boolean }, index: number) => (
                <Card key={"listed-card" + index} className={`${word.forgot === true || forgotIndex.includes(index) ? "border-primary" : ""} ${deletedIndex.includes(index) ? "hidden" : ""}`}>
                    <CardHeader>
                        <CardTitle>{word.word}</CardTitle>
                        <CardDescription>{word.definition}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-auto flex items-center">
                            <Button
                                className=" w-[300px] h-auto py-5 gap-3 items-center box-border mr-3"
                                variant="outline"
                                onClick={() => {
                                    setAsForgot(preset, index, words);
                                    setForgotIndex((prev) => [...prev, index]);
                                }}
                            >
                                <MdThumbDown></MdThumbDown>
                            </Button>
                            <Button
                                className=" w-[300px] h-auto py-5 gap-3 items-center box-border ml-3"
                                variant="outline"
                                onClick={() => {
                                    setAsLearn(preset, index, words);
                                    setForgotIndex((prev) => prev.filter((i) => i !== index));
                                }}
                            >
                                <MdThumbUp></MdThumbUp>
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full flex items-center justify-start gap-2">
                            {/* <Button
                                variant="outline"
                                onClick={async () => {
                                    deleteWord(preset, index, words);
                                }}
                            >
                                <MdEdit></MdEdit>
                            </Button> */}
                            <Button
                                variant="outline"
                                onClick={async () => {
                                    deleteWord(preset, index, words);
                                    setDeletedIndex((prev) => [...prev, index]);
                                }}
                            >
                                <MdDelete></MdDelete>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
};
