"use client";
import { useState, useEffect, useContext, createContext } from "react";
import { AppContext } from "@/provider/provider";
import { useRouter } from "next/navigation";
import { addWordsFromCsv as addWords, addWordsFromImage as addWords2, getWordMeaning as getMeaning } from "@/lib/api/word";
import { set } from "react-hook-form";

export const WordContext = createContext(
    {} as {
        text: string;
        csv: { word: string; definition: string }[];
        words: string[];
        selectedWordIndex: boolean[];
        setSelectedWordIndex: React.Dispatch<React.SetStateAction<boolean[]>>;
        selectedWords: string[];
        addWordsFromCsv: (name: string, csv: string) => void;
        addWordsFromImage: (name: string, image: File) => void;
        getWordMeaning: () => void;
        makePhrase: () => void;
        createVocabList: (phrases: { word: string; definition: string }[]) => void;
        isLoading: boolean;
        isCompleted: boolean;
    }
);

export const WordProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(AppContext);
    const [text, setText] = useState<string>("");
    const [csv, setCsv] = useState<{ word: string; definition: string }[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [selectedWordIndex, setSelectedWordIndex] = useState<boolean[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [vocabListName, setVocabListName] = useState<string>("test");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const router = useRouter();

    //! テキストを単語に分割
    useEffect(() => {
        if (text) {
            const wordArray = text.split(" ");
            setWords(wordArray);
            setSelectedWordIndex(new Array(wordArray.length).fill(false));
        }
    }, [text]);

    //! CSVファイルから単語を追加
    const addWordsFromCsv = async (name: string, csv: string) => {
        setIsLoading(true);
        user!.token && addWords(user.token, name, csv);
        setIsLoading(false);
    };

    //! 画像から文章を取得
    const addWordsFromImage = async (name: string, image: File) => {
        setIsLoading(true);
        setVocabListName(name);
        const res = user!.token && (await addWords2(user.token, name, image));
        setText(res);
        setIsLoading(false);
        router.push("/add-word/?type=image&step=1");
    };

    //! 選択された単語を取得
    const makePhrase = () => {
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
        console.log(result);
        return result;
    };

    //! 単語の意味を取得
    const getWordMeaning = async () => {
        if (user.token) {
            setIsLoading(true);
            setCsv([]);
            const phrases = makePhrase();
            const response = await getMeaning(user.token, text, phrases);
            console.log(response);
            setCsv(response);
            setIsLoading(false);
            router.push("/add-word/?type=image&step=2");
        }
    };

    //! 単語帳に追加
    const createVocabList = (phrases: { word: string; definition: string }[]) => {
        setIsLoading(true);
        const csvString = ["word,definition", phrases.map((item) => `${item.word},${item.definition}`).join("\n")].join("\n");

        console.log(csvString);
        user.token && addWords(user.token, vocabListName, csvString);

        setIsLoading(false);
    };

    const contextValue = {
        text,
        csv,
        words,
        selectedWordIndex,
        setSelectedWordIndex,
        selectedWords,
        addWordsFromCsv,
        addWordsFromImage,
        getWordMeaning,
        makePhrase,
        createVocabList,
        isLoading,
        isCompleted,
    };

    return <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>;
};
