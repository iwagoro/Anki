"use client";
import { WordCard1, WordCard2 } from "@/components/util/word-card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getWords, setAsForgot, setAsLearn } from "@/components/util/data-util";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
export default function Home() {
    const [words, setWords] = useState([]);
    const [index, setIndex] = useState(0);
    const [next, setNext] = useState(true);
    const [back, setBack] = useState(false);
    const [isList, setIsList] = useState(false); // [cards] is a list of cards, so we need to check if it is a list or not
    const param = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWords(param.cards as string); // Cast param.cards to string
            setWords(data as []);
        };
        fetchData();
    }, []);

    const incrementIndex = () => {
        setIndex((index) => index + 1);
    };

    const decrementIndex = () => {
        setIndex((index) => index - 1);
    };

    useEffect(() => {
        if (words[index + 1] === undefined) setNext(false);
        else setNext(true);

        if (words[index - 1] === undefined) setBack(false);
        else setBack(true);
    }, [words, index]);

    return (
        <>
            <div className={`absolute z-40 max-w-lg w-full h-[70px] flex justify-end items-center px-10 bg-transparent ${isList ? "text-primary" : ""}`}>
                <TbArrowsExchange size={32} className="cursor-pointer" onClick={() => setIsList((prev) => !prev)}></TbArrowsExchange>
            </div>
            {isList !== true ? (
                <div className="max-w-md w-full h-full flex flex-col  px-10 justify-center gap-10">
                    <Progress value={((index + 1) * 100) / words.length}></Progress>
                    {words[index] && <WordCard1 word={(words[index] as { word: string }).word} definition={(words[index] as { definition: string }).definition} forgot={(words[index] as { forgot: boolean }).forgot}></WordCard1>}
                    <div className="w-full h-[100px] flex items-center">
                        <Button
                            className="max-w-[50%] w-full h-full gap-3 items-center"
                            variant="outline"
                            onClick={() => {
                                setAsForgot(param.cards as string, index, words);
                                incrementIndex();
                            }}
                        >
                            <MdThumbDown size={24}></MdThumbDown>
                            don't know
                        </Button>
                        <Button
                            className="max-w-[50%] w-full h-full gap-3 items-center"
                            variant="outline"
                            onClick={() => {
                                setAsLearn(param.cards as string, index, words);
                                incrementIndex();
                            }}
                        >
                            know
                            <MdThumbUp size={24}></MdThumbUp>
                        </Button>
                    </div>

                    <div className=" flex justify-between items-center gap-5">
                        <Button variant="outline" onClick={back !== false ? decrementIndex : () => {}} className={back !== false ? "" : "opacity-[0.1]"}>
                            <MdNavigateBefore size={32}></MdNavigateBefore>
                        </Button>

                        <Button variant="outline" onClick={next !== false ? incrementIndex : () => {}} className={next !== false ? "" : "opacity-[0.1]"}>
                            <MdNavigateNext size={32}></MdNavigateNext>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="py-[70px]  max-w-md w-full h-full px-10 flex flex-col  gap-10 overflow-y-scroll">
                    <WordCard2 preset={param.cards as string} words={words}></WordCard2>
                </div>
            )}
        </>
    );
}

/**
 */
