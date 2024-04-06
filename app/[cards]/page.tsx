"use client";
import { WordCard1, WordCard2 } from "@/components/util/word-card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getWords, setAsForgot, setAsLearn, updateDate } from "@/components/util/data-util";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../../components/util/provider";
import { useContext } from "react";
import { DataTable } from "@/components/util/database";
export default function Home() {
    const [words, setWords] = useState<{ word: string; definition: string; forgot: boolean }[]>([]);
    const [index, setIndex] = useState(0);
    const [next, setNext] = useState(true);
    const [back, setBack] = useState(false);
    const { isList, isFocused } = useContext(AppContext);
    const param = useParams();
    const handlers = useSwipeable({
        onSwiped: (event) => {
            console.log(event);
            if (event.dir == "Right") {
                if (back !== false) decrementIndex();
            }
            if (event.dir == "Left") {
                if (next !== false) incrementIndex();
            }
        },
        trackMouse: true, //マウス操作でのスワイプを許可する場合はtrue
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWords(param.cards as string); // Cast param.cards to string
            const shuffled = data.sort(() => Math.random() - 0.5);
            setWords(shuffled as { word: string; definition: string; forgot: boolean }[]);
            updateDate(param.cards as string);
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
            {isList && (
                <div className="py-[70px]  max-w-md w-full h-full px-10 flex flex-col  gap-10 overflow-y-scroll">
                    <WordCard2 preset={param.cards as string} words={words}></WordCard2>
                </div>
            )}
            {!isList && !isFocused && (
                <div {...handlers} className=" pt-[70px] max-w-md w-full h-full flex flex-col pt-50  px-10 justify-between gap-5">
                    <Progress value={((index + 1) * 100) / words.length}></Progress>
                    {words[index] && <WordCard1 word={words[index].word} definition={words[index].definition} forgot={words[index].forgot} change={index}></WordCard1>}

                    <div className="w-full h-[100px] flex items-center">
                        <Button
                            className="max-w-[50%] w-full h-full gap-3 items-center"
                            variant="outline"
                            onClick={() => {
                                setAsForgot(param.cards as string, index, words);
                                if (next !== false) incrementIndex();
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
                                if (next !== false) incrementIndex();
                            }}
                        >
                            know
                            <MdThumbUp size={24}></MdThumbUp>
                        </Button>
                    </div>

                    <div className=" flex justify-between h-[100px] items-center gap-5">
                        <Button variant="outline" onClick={back !== false ? decrementIndex : () => {}} className={back !== false ? "" : "opacity-[0.1]"}>
                            <MdNavigateBefore size={32}></MdNavigateBefore>
                        </Button>

                        <Button variant="outline" onClick={next !== false ? incrementIndex : () => {}} className={next !== false ? "" : "opacity-[0.1]"}>
                            <MdNavigateNext size={32}></MdNavigateNext>
                        </Button>
                    </div>
                </div>
            )}
            {isFocused && <DataTable words={words}></DataTable>}
        </>
    );
}

/**
 */
