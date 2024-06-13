"use client";
import { useState, useEffect, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { H2, H3, P } from "@/components/ui/typography";
import ReactCardFlip from "react-card-flip";
import { Button } from "@/components/ui/button";
import { X, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

import useWordList from "./useWordList";

import useWord from "@/lib/localStorage/useWord";

export const WordCardFlip = () => {
    const { words, setWords, updateState } = useWordList();
    const [isFlipped, setIsFlipped] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [index, setIndex] = useState(0);

    const cardStyle = `flex flex-col items-center justify-center w-full p-10 h-full ${words[index]?.learned ? "" : "border-primary"}`;
    const flipCard = () => setIsFlipped(!isFlipped);

    const nextPage = () => {
        if (index < words.length - 1) {
            setIsShow(false);
            setIndex(index + 1);

            setTimeout(() => setIsShow(true), 500);
        }
    };

    const prevPage = () => {
        if (index > 0) {
            setIsShow(false);
            setIndex(index - 1);
            setTimeout(() => setIsShow(true), 500);
        }
    };

    const handleCollect = async (wordId: number, isCollect: boolean) => {
        try {
            if (isCollect) {
                updateState(wordId, true);
                setWords(words.map((word) => (word.id === wordId ? { ...word, learned: true } : word)));
                console.log(isCollect);
                nextPage();
            } else {
                updateState(wordId, false);
                setWords(words.map((word) => (word.id === wordId ? { ...word, learned: false } : word)));
                console.log(words);
                nextPage();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col px-5  gap-10">
            <div className="w-full h-fit flex flex-col gap-5">
                <Progress value={((index + 1) * 100) / words.length} />
                <Label className="w-full text-center">
                    {index + 1}/{words.length}
                </Label>
            </div>
            <div className="w-full flex-1">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerStyle={{ height: "100%", width: "100%" }}>
                    <Card className={`${cardStyle} h-full`} onClick={flipCard}>
                        <H2>{words[index]?.word || "Nan"}</H2>
                    </Card>
                    <Card className={`${cardStyle} h-full`} onClick={flipCard}>
                        {isShow && <P>{words[index]?.definition || "Nan"}</P>}
                    </Card>
                </ReactCardFlip>
            </div>

            <div className="w-full h-fit flex flex-col gap-5">
                <div className="w-full flex items-center gap-5">
                    <Button className="w-full py-8" variant="outline" onClick={() => handleCollect(words[index].id, false)}>
                        <X size={24} className="text-primary" />
                    </Button>
                    <Button className="w-full py-8" variant="outline" onClick={() => handleCollect(words[index].id, true)}>
                        <Check size={24} className="text-[limegreen]" />
                    </Button>
                </div>
                <div className="flex justify-between items-center gap-5">
                    <Button
                        variant="outline"
                        className="py-8"
                        onClick={() => {
                            setIsFlipped(false);
                            prevPage();
                        }}
                    >
                        <ChevronLeft size={32} />
                    </Button>
                    <Button
                        variant="outline"
                        className="py-8"
                        onClick={() => {
                            setIsFlipped(false);
                            nextPage();
                        }}
                    >
                        <ChevronRight size={32} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
