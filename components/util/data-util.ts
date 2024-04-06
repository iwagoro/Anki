import { app } from "@/components/util/firebase";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

import { deleteDoc, getFirestore, setDoc } from "firebase/firestore";
import { format } from "date-fns";
import { getDocs, collection, doc, getDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export const getPresets = async () => {
    const presets: any[] = [];
    const querySnapshot = await getDocs(collection(db, "user", "test", "presets"));
    querySnapshot.forEach((doc) => {
        presets.push(doc.data());
    });
    return presets;
};

export const deletePreset = async (name: string) => {
    const docRef = doc(db, "user", "test", "presets", name);
    await deleteDoc(docRef);
};

export const addWordToPreset = async (csv: string, preset: string) => {
    csv = csv.toLowerCase();
    const words = parse(csv, {
        columns: true,
    });
    words.forEach((word: any) => {
        word.forgot = true;
    });
    const docRef = doc(db, "user", "test", "presets", preset.replaceAll(" ", "-"));
    const prevWords = (await getDoc(docRef)).data()?.words ?? [];
    const newWords = [...prevWords, ...words];
    console.log(preset, newWords.length, words.known, newWords);
    await setDoc(docRef, {
        name: preset.replaceAll(" ", "-"),
        length: newWords.length,
        known: prevWords.known || 0,
        words: newWords,
    });
};

export const addWordFromCSV = async (csv: string, preset: string) => {
    csv = csv.toLowerCase();
    const words = parse(csv, {
        columns: true,
    });
    words.forEach((word: any) => {
        word.forgot = true;
    });
    const docRef = doc(db, "user", "test", "presets", preset.replaceAll(" ", "-"));
    await setDoc(docRef, {
        name: preset.replaceAll(" ", "-"),
        length: words.length,
        known: 0,
        words: words,
    });
};

export const getWords = async (preset: string) => {
    const querySnapshot = await getDoc(doc(db, "user", "test", "presets", preset));
    const words = querySnapshot.data()?.words ?? [];
    return words;
};

export const setAsForgot = async (preset: string, index: number, words: any) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    console.log(index);
    words[index].forgot = true;
    let cnt = 0;
    words.map((word: any) => {
        if (word.forgot === false) {
            cnt++;
        }
    });
    updateDoc(docRef, { words: words, known: cnt });
};

export const setAsLearn = async (preset: string, index: number, words: any) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    words[index].forgot = false;
    let cnt = 0;
    words.map((word: any) => {
        if (word.forgot === false) {
            cnt++;
        }
    });

    updateDoc(docRef, { words: words, known: cnt });
};

export const updateDate = async (preset: string) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    const date = format(new Date(), "yyyy-MM-dd");

    await updateDoc(docRef, { description: date });
};

export const deleteWord = async (preset: string, index: number, words: any) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    words.splice(index, 1);
    let cnt = 0;
    words.map((word: any) => {
        if (word.forgot === false) {
            cnt++;
        }
    });
    updateDoc(docRef, { words: words, length: words.length, known: cnt });
};

export const editWord = async (preset: string, index: number, words: any, word: string, definition: string) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    words[index].word = word;
    words[index].definition = definition;
    updateDoc(docRef, { words: words });
};
