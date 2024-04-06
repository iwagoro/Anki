import { app } from "@/components/util/firebase";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

import { getFirestore, setDoc } from "firebase/firestore";
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

export const makePreset = async (name: string) => {
    const docRef = doc(db, "user", "test", "presets", name);
    await setDoc(docRef, {
        name: name,
        length: 10,
        known: 5,
        words: [],
    });
};

export const addWordFromCSV = async (csv: string, preset: string) => {
    const words = parse(csv, {
        columns: true,
    });
    words.forEach((word: any) => {
        word.forgot = false;
    });
    const docRef = doc(db, "user", "test", "presets", preset);
    await setDoc(docRef, {
        name: preset,
        length: words.length,
        known: words.length,
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
        if (word.forgot !== true) {
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
        if (word.forgot !== true) {
            cnt++;
        }
    });

    updateDoc(docRef, { words: words, known: cnt });
};

export const updateDate = async (preset: string) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    const date = format(new Date(), "yyyy-MM-dd");

    console.log(date);
    await updateDoc(docRef, { description: "last seen :" + date });
};
