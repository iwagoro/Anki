import { app } from "@/components/util/firebase";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

import { getFirestore, setDoc } from "firebase/firestore";
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
    console.log("hi");
    console.log(preset, index);
    const docRef = doc(db, "user", "test", "presets", preset);
    words[index].forgot = true;
    updateDoc(docRef, { words: words });
};

export const setAsLearn = async (preset: string, index: number, words: any) => {
    console.log("hi");
    console.log(preset, index);
    const docRef = doc(db, "user", "test", "presets", preset);
    words[index].forgot = false;
    updateDoc(docRef, { words: words });
};
