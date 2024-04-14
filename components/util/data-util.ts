import { app } from "@/components/util/firebase";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

import { arrayRemove, arrayUnion, deleteDoc, getFirestore, increment, setDoc } from "firebase/firestore";
import { format } from "date-fns";
import { getDocs, collection, doc, getDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export const getPresets = async (user: string) => {
    const presets: any[] = [];
    const querySnapshot = await getDocs(collection(db, "user", user, "presetNames"));
    querySnapshot.forEach((doc) => {
        presets.push(doc.data());
    });
    return presets;
};

export const deletePreset = async (user: string, name: string) => {
    const docRef = doc(db, "user", user, "presetNames", name);
    const docRef2 = doc(db, "user", user, "presets", name);
    await deleteDoc(docRef);
    await deleteDoc(docRef2);
};

export const addWordToPreset = async (user: string, csv: string, preset: string) => {
    csv = csv.toLowerCase();
    const words = parse(csv, {
        columns: true,
    });
    words.forEach((word: any) => {
        word.forgot = true;
    });
    const docRef = doc(db, "user", user, "presets", preset.replaceAll(" ", "-"));
    await updateDoc(docRef, { words: arrayUnion(...words), length: increment(words.length) });
};

export const addWordFromCSV = async (user: string, csv: string, preset: string) => {
    csv = csv.toLowerCase();
    const words = parse(csv, {
        columns: true,
    });
    words.forEach((word: any) => {
        word.forgot = true;
    });
    const docRef = doc(db, "user", user, "presets", preset.replaceAll(" ", "-"));
    const docRef2 = doc(db, "user", user, "presetNames", preset.replaceAll(" ", "-"));
    await setDoc(docRef2, {
        name: preset.replaceAll(" ", "-"),
        length: words.length,
        known: 0,
    });
    await setDoc(docRef, {
        name: preset.replaceAll(" ", "-"),
        length: words.length,
        known: 0,
        words: words,
    });
};

export const getWords = async (user: string, preset: string) => {
    const querySnapshot = await getDoc(doc(db, "user", user, "presets", preset));
    const words = querySnapshot.data()?.words ?? [];
    return words;
};

export const setAsForgot = async (user: string, preset: string, word: any) => {
    const docRef = doc(db, "user", user, "presets", preset);
    const docRef2 = doc(db, "user", user, "presetNames", preset);
    await updateDoc(docRef, { words: arrayRemove(word) });
    await updateDoc(docRef, { words: arrayUnion({ ...word, forgot: true }), known: increment(-1) });
    updateDoc(docRef2, { known: increment(-1) });
};

export const setAsLearn = async (user: string, preset: string, word: any) => {
    const docRef = doc(db, "user", user, "presets", preset);
    const docRef2 = doc(db, "user", user, "presetNames", preset);
    await updateDoc(docRef, { words: arrayRemove(word) });
    await updateDoc(docRef, { words: arrayUnion({ ...word, forgot: false }), known: increment(1) });
    updateDoc(docRef2, { known: increment(1) });
};

export const updateDate = async (user: string, preset: string) => {
    const docRef = doc(db, "user", user, "presets", preset);
    const docRef2 = doc(db, "user", user, "presetNames", preset);
    const date = format(new Date(), "yyyy-MM-dd");

    await updateDoc(docRef, { description: date });
    updateDoc(docRef2, { description: date });
};

export const deleteWord = async (user: string, preset: string, word: any) => {
    const docRef = doc(db, "user", user, "presets", preset);
    const docRef2 = doc(db, "user", user, "presetNames", preset);
    if (word.forgot) {
        await updateDoc(docRef, { words: arrayRemove(word), length: increment(-1) });
    } else {
        updateDoc(docRef, { words: arrayRemove(word), length: increment(-1), known: increment(-1) });
        updateDoc(docRef2, { length: increment(-1), known: increment(-1) });
    }
};

export const exportWordsToCSV = async (user: string, preset: string) => {
    const querySnapshot = await getDoc(doc(db, "user", user, "presets", preset));
    const words = querySnapshot.data()?.words ?? [];
    let csv = "word,definition\n";
    words.forEach((word: any) => {
        csv += `${word.word},${word.definition}\n`;
    });
    return csv;
};
