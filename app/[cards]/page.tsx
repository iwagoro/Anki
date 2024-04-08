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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function Home() {
    const [words, setWords] = useState<{ word: string; definition: string; forgot: boolean }[]>([]);
    const [hateWords, setHateWords] = useState<{ word: string; definition: string; forgot: boolean }[]>([]);
    const [index, setIndex] = useState(0);
    const [quitCount, setQuitCount] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [next, setNext] = useState(true);
    const [back, setBack] = useState(false);
    const { isList, isFocused, isHate } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const router = useRouter();
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
            const hate = data.filter((word: any) => word.forgot === true);
            setHateWords(hate);
            updateDate(param.cards as string);
        };
        fetchData();
        setQuitCount(0);
    }, []);

    const incrementIndex = () => {
        if (!isHate) {
            setShow(false);
            setIndex((index) => index + 1);
        } else {
            setShow(false);
            setIndex2((index2) => index2 + 1);
        }
    };

    const decrementIndex = () => {
        if (!isHate) {
            setShow(false);
            setIndex((index) => index - 1);
        } else {
            setShow(false);
            setIndex2((index2) => index2 - 1);
        }
    };

    useEffect(() => {
        if (!isHate) {
            if (words[index + 1] === undefined) setNext(false);
            else setNext(true);

            if (words[index - 1] === undefined) setBack(false);
            else setBack(true);
        } else {
            if (hateWords[index2 + 1] === undefined) setNext(false);
            else setNext(true);

            if (hateWords[index2 - 1] === undefined) setBack(false);
            else setBack(true);
        }
    }, [words, index, index2, isHate]);

    useEffect(() => {
        setShow(true);
    }, [index, index2, isHate]);

    return (
        <>
            {isList && (
                <div className="py-[70px]  max-w-md w-full h-full px-10 flex flex-col  gap-10 overflow-y-scroll">
                    {!isHate && <WordCard2 preset={param.cards as string} words={words}></WordCard2>}
                    {isHate && <WordCard2 preset={param.cards as string} words={hateWords}></WordCard2>}
                </div>
            )}
            {!isList && !isFocused && (
                <div {...handlers} className=" pt-[70px] max-w-md w-full h-full flex flex-col pt-50  px-10 justify-between gap-5">
                    <Progress value={!isHate ? ((index + 1) * 100) / words.length : ((index2 + 1) * 100) / hateWords.length}></Progress>
                    {show && !isHate && words[index] && <WordCard1 word={words[index].word} definition={words[index].definition} forgot={words[index].forgot} change={index}></WordCard1>}
                    {show && isHate && hateWords[index2] && <WordCard1 word={hateWords[index2].word} definition={hateWords[index2].definition} forgot={hateWords[index2].forgot} change={index}></WordCard1>}
                    {!show && <WordCard1 word="" definition="" forgot={false} change={index}></WordCard1>}
                    <div className="w-full h-[100px] flex items-center">
                        <Button
                            className="max-w-[50%] w-full h-full gap-3 items-center"
                            variant="outline"
                            onClick={() => {
                                if (!isHate) {
                                    setAsForgot(param.cards as string, index, words);
                                } else {
                                    setAsForgot(param.cards as string, index2, hateWords);
                                }
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
                                if (!isHate) {
                                    setAsLearn(param.cards as string, index, words);
                                } else {
                                    const fixedIndex = words.findIndex((word) => word.word === hateWords[index2].word);
                                    setAsLearn(param.cards as string, fixedIndex, words);
                                }
                                if (next !== false) {
                                    incrementIndex();
                                } else {
                                    if (quitCount === 0) {
                                        toast("you have finished the list", { description: "you can quit by clicking the button again" });
                                        setQuitCount(1);
                                    } else if (quitCount === 1) {
                                        toast("quited", { description: "you can see the list of words by clicking the list button" });
                                        router.push("/home");
                                        setQuitCount(0);
                                    }
                                }
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
