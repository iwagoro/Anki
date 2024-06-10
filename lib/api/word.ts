import axios from "axios";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_API_URL;

//! csvから単語を追加
export const addWordsFromCsv = async (token: string, listName: string, csv: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.post(`${url}/word/csv/?vocab_list=${listName}`, { content: csv }, config);
        toast.success("単語の追加に成功しました");
    } catch {
        toast.error("単語の追加に失敗しました");
        throw new Error();
    }
};

//! 画像から単語を追加
export const addWordsFromImage = async (token: string, listName: string, file: any) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        };
        const res = await axios.post(`${url}/word/image/?vocab_list=${listName}`, { file }, config);
        return res.data.text;
    } catch {
        toast.error("単語の追加に失敗しました");
        return "";
    }
};

//! 単語の意味を取得する
export const getWordMeaning = async (token: string, sentence: string, phrase: string[]) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log(phrase);
        const request = {
            sentence: sentence,
            phrases: phrase,
        };
        const res = await axios.post(`${url}/word/meaning`, request, config);
        return res.data.meanings;
    } catch {
        toast.error("単語の意味の取得に失敗しました");
        return "";
    }
};

//!　単語のcorrect,incorectを更新
export const updateWordState = async (token: string, words: { id: number; learned: boolean | null }[]) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.put(`${url}/word`, { words: words }, config);
        return res.data;
    } catch {
        toast.error("単語の更新に失敗しました");
    }
};
