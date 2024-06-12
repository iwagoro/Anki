"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AddContext } from "./add-provider";
import { AppContext } from "@/provider/provider";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { getWordMeaning } from "@/lib/api/word";

export default function Step2() {
    const { sentence, selectedWords, setSelectedWords, phrases, setPhrases } = useContext(AddContext);
    const { user } = useContext(AppContext);
    const [words, setWords] = useState<string[]>([]);
    const [selectedWordIndex, setSelectedWordIndex] = useState<boolean[]>(Array(words.length).fill(false));
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = usePathname().split("/")[2];
    const list_id = searchParams.get("list_id");

    useEffect(() => {
        sentence !== "" && setWords(sentence.split(" "));
    }, [sentence]);

    //! 選択された単語を取得
    const makeWordSets = () => {
        const result = [];
        setSelectedWords([]);
        let streak = 0;
        for (let i = 0; i <= words.length; i++) {
            if (selectedWordIndex[i]) {
                streak++;
            } else {
                if (streak) result.push(words.slice(i - streak, i).join(" "));
                streak = 0;
            }
        }
        return result;
    };

    //! 単語の意味を取得
    const getMeaning = async () => {
        if (user.token) {
            const wordSets = makeWordSets();
            try {
                const res = getWordMeaning(user.token, sentence, wordSets);
                return res;
            } catch {
                throw new Error("Failed to get meaning");
            }
        }
    };

    const onSubmit = () => {
        getMeaning().then((res) => {
            console.log(res);
            setPhrases(res);
            // const url = `/add-word/${type}/?step=3&list_id=${list_id}`;
            // router.push(url);
        });
    };

    return (
        <>
            <div className="w-full flex flex-col justify-start items-start gap-5">
                <div className="w-full flex flex-col justify-start items-start gap-5">
                    <p className="text-2xl font-bold">Extracted Sentences</p>
                    <div className="flex flex-wrap">
                        {words.length !== 0 &&
                            words.map((word, index) => (
                                <span
                                    key={index}
                                    className={`px-1 py-1 my-1 rounded-md cursor-pointer font-normal text-xl
                                  ${selectedWordIndex[index + 1] && "rounded-r-none "} 
                                  ${selectedWordIndex[index - 1] && "rounded-l-none "}  
                                  ${selectedWordIndex[index] && "bg-primary "}`}
                                    onClick={() =>
                                        setSelectedWordIndex((prev) => {
                                            const copy = [...prev];
                                            copy[index] = !copy[index];
                                            return copy;
                                        })
                                    }
                                >
                                    {word}
                                </span>
                            ))}
                    </div>
                    <Button className="w-full text-xl font-semibold onClick=" onClick={onSubmit}>
                        create Vocab List!
                    </Button>
                </div>
            </div>
        </>
    );
}
