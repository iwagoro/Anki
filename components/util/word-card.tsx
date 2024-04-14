"use client";
import { useState, useRef, useEffect, useContext } from "react";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { H2, H3, P } from "@/components/util/typography";
import ReactCardFlip from "react-card-flip";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { setAsForgot, setAsLearn, deleteWord } from "@/components/util/data-util";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

import { MdDelete, MdEdit } from "react-icons/md";
import { AppContext } from "@/components/util/provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const WordCardListView = ({ originWords }: { originWords: { word: string; definition: string; forgot: boolean }[] }) => {
    const param = useParams();
    const { user, isFocused } = useContext(AppContext);
    const [words, setWords] = useState<{ word: string; definition: string; forgot: boolean }[]>([]);
    useEffect(() => {
        setWords(originWords);
    }, [originWords]);
    return (
        <div className="flex flex-col gap-5">
            {words.map((word: { word: string; definition: string; forgot: boolean }, index: number) => (
                <div key={"listed-card" + index} className={isFocused && !word.forgot ? "hidden" : ""}>
                    <Card className={word.forgot ? "border-primary" : ""}>
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
                                        if (word.forgot) return;
                                        setWords((prev) => {
                                            prev[index].forgot = true;
                                            return [...prev];
                                        });
                                        setAsForgot(user, param.cards as string, word);
                                    }}
                                >
                                    <MdThumbDown></MdThumbDown>
                                </Button>
                                <Button
                                    className=" w-[300px] h-auto py-5 gap-3 items-center box-border ml-3"
                                    variant="outline"
                                    onClick={() => {
                                        if (!word.forgot) return;
                                        setWords((prev) => {
                                            prev[index].forgot = false;
                                            return [...prev];
                                        });
                                        setAsLearn(user, param.cards as string, word);
                                    }}
                                >
                                    <MdThumbUp></MdThumbUp>
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="w-full flex items-center justify-start gap-2">
                                <Button
                                    variant="outline"
                                    onClick={async () => {
                                        deleteWord(user, param.cards as string, word);
                                    }}
                                >
                                    <MdDelete></MdDelete>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export const WordCardFlip = ({ originWords }: { originWords: { word: string; forgot: boolean; definition: string }[] }) => {
    const [next, setNext] = useState(true);
    const [back, setBack] = useState(false);
    const { user, autoPlay, isFocused } = useContext(AppContext);
    const [isFlipped, setIsFlipped] = useState(false);

    const [words, setWords] = useState<{ word: string; definition: string; forgot: boolean }[]>([]);
    const [index, setIndex] = useState(0);
    const [quitCount, setQuitCount] = useState(0);
    const [focusWords, setFocusWords] = useState(words);
    const [focusIndex, setFocusIndex] = useState(0);
    const router = useRouter();
    const param = useParams();
    const cardStyle = "flex flex-col items-center justify-center max-w-md w-full p-10  h-[400px]";
    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const nextPage = () => {
        if (isFocused) {
            if (focusIndex < focusWords.length - 1) {
                setNext(true);
                setFocusIndex(focusIndex + 1);
                setQuitCount(0);
            } else {
                if (quitCount === 1) {
                    router.push("/home");
                }
                toast("Good job! All words are learned.", { description: "click again to quit." });
                setQuitCount(1);
                setNext(false);
            }
        } else {
            if (index < words.length - 1) {
                setNext(true);
                setIndex(index + 1);
                setQuitCount(0);
            } else {
                if (quitCount === 1) {
                    router.push("/home");
                }
                toast("Good job! All words are learned.", { description: "click again to quit." });
                setQuitCount(1);
                setNext(false);
            }
        }
    };

    const prevPage = () => {
        if (isFocused) {
            if (focusIndex > 0) {
                setBack(true);
                setFocusIndex(focusIndex - 1);
                setQuitCount(0);
            } else {
                if (quitCount === 1) {
                    router.push("/home");
                }
                toast("Good job! All words are learned.", { description: "click again to quit." });
                setQuitCount(1);
                setBack(false);
            }
        } else {
            if (index > 0) {
                setBack(true);
                setIndex(index - 1);
                setQuitCount(0);
            } else {
                if (quitCount === 1) {
                    router.push("/home");
                }
                toast("Good job! All words are learned.", { description: "click again to quit." });
                setQuitCount(1);
                setBack(false);
            }
        }
    };

    const autoFlip = () => {
        setTimeout(() => {
            setIsFlipped(true);

            setTimeout(() => {
                nextPage();
            }, 3000);
        }, 3000);
    };

    useEffect(() => {
        if (autoPlay) {
            setIsFlipped(false);
            autoFlip();
        }
    }, [autoPlay, index]);

    useEffect(() => {
        setWords(originWords);
        let data = originWords.filter((word) => {
            return word.forgot;
        });
        setFocusWords(data);
    }, [originWords]);

    return (
        <div className="w-full flex items-center justify-center">
            <div className=" pt-[70px] max-w-md w-full h-full flex flex-col pt-50  px-5  justify-between gap-5">
                <Progress value={isFocused ? ((focusIndex + 1) * 100) / focusWords.length : ((index + 1) * 100) / words.length}></Progress>

                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <div className="flex justify-center box-border ">
                        <Card className={cardStyle + "  " + (isFocused ? "border-primary" : words[index] && words[index].forgot ? "border-primary" : "")} onClick={flipCard}>
                            {isFocused ? <H2>{focusWords[focusIndex] && focusWords[focusIndex].word ? focusWords[focusIndex].word : "Nan"}</H2> : <H2>{words[index] && words[index].word ? words[index].word : "Nan"}</H2>}
                        </Card>
                    </div>
                    <div className="flex justify-center box-border ">
                        <Card className={cardStyle + "  " + (isFocused ? "border-primary" : words[index] && words[index].forgot ? "border-primary" : "")} onClick={flipCard}>
                            <CardContent className={isFlipped === false ? "hidden" : ""}>{isFocused ? <P>{focusWords[focusIndex] && focusWords[focusIndex].definition ? focusWords[focusIndex].definition : "Nan"}</P> : <P>{words[index] && words[index].definition ? words[index].definition : "Nan"}</P>}</CardContent>
                        </Card>
                    </div>
                </ReactCardFlip>

                <div className="w-full h-[100px] flex items-center">
                    <Button
                        className="max-w-[50%] w-full h-full gap-3 items-center"
                        variant="outline"
                        onClick={() => {
                            setIsFlipped(false);
                            nextPage();
                            if (isFocused) {
                                if (focusWords[focusIndex].forgot) return;
                                setFocusWords((prev) => {
                                    prev[focusIndex].forgot = true;
                                    return [...prev];
                                });
                                setAsForgot(user, param.cards as string, focusWords[focusIndex]);
                            } else {
                                if (words[index].forgot) return;
                                setWords((prev) => {
                                    prev[index].forgot = true;
                                    return [...prev];
                                });
                                setAsForgot(user, param.cards as string, words[index]);
                            }
                        }}
                    >
                        <MdThumbDown size={24}></MdThumbDown>
                        don't know
                    </Button>
                    <Button
                        className="max-w-[50%] w-full h-full gap-3 items-center"
                        variant="outline"
                        onClick={() => {
                            setIsFlipped(false);
                            nextPage();
                            if (isFocused) {
                                if (!focusWords[focusIndex].forgot) return;
                                setFocusWords((prev) => {
                                    prev[focusIndex].forgot = false;
                                    return [...prev];
                                });
                                setAsLearn(user, param.cards as string, focusWords[focusIndex]);
                            } else {
                                if (!words[index].forgot) return;
                                setWords((prev) => {
                                    prev[index].forgot = false;
                                    return [...prev];
                                });
                                setAsLearn(user, param.cards as string, words[index]);
                            }
                        }}
                    >
                        know
                        <MdThumbUp size={24}></MdThumbUp>
                    </Button>
                </div>

                <div className=" flex justify-between h-[100px] items-center gap-5">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsFlipped(false);
                            prevPage();
                        }}
                    >
                        <MdNavigateBefore size={32}></MdNavigateBefore>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => {
                            setIsFlipped(false);
                            nextPage();
                        }}
                    >
                        <MdNavigateNext size={32}></MdNavigateNext>
                    </Button>
                </div>
            </div>
        </div>
    );
};
