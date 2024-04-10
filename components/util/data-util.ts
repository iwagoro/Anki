import { app } from "@/components/util/firebase";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

import { arrayRemove, arrayUnion, deleteDoc, getFirestore, increment, setDoc } from "firebase/firestore";
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
    console.log(words);
    await updateDoc(docRef, { words: arrayUnion(...words) });
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

export const setAsForgot = async (preset: string, word: any) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    await updateDoc(docRef, { words: arrayRemove(word) });
    await updateDoc(docRef, { words: arrayUnion({ ...word, forgot: true }) });
};

export const setAsLearn = async (preset: string, word: any) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    await updateDoc(docRef, { words: arrayRemove(word) });
    await updateDoc(docRef, { words: arrayUnion({ ...word, forgot: false }) });
};

export const updateDate = async (preset: string) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    const date = format(new Date(), "yyyy-MM-dd");

    await updateDoc(docRef, { description: date });
};

export const deleteWord = async (preset: string, word: any) => {
    const docRef = doc(db, "user", "test", "presets", preset);
    updateDoc(docRef, { words: arrayRemove(word), length: increment(-1) });
};
