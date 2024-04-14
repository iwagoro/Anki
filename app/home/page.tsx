"use client";
import { useEffect, useState, useContext } from "react";
import { PresetCard } from "@/components/util/preset-card";
import { getPresets, addWordFromCSV } from "@/components/util/data-util";
import { AddCard } from "@/components/util/add-card";
import { useParams } from "next/navigation";
import { collection, doc, onSnapshot, getFirestore, DocumentData } from "firebase/firestore";
import { AppContext } from "@/components/util/provider";

import { app } from "@/components/util/firebase";
export default function Home() {
    const [presets, setPresets] = useState<{ name: string; description: string; length: number; known: number }[]>([]);
    const { user } = useContext(AppContext);
    const db = getFirestore(app);
    useEffect(() => {
        const fetchData = async () => {
            const docRef = collection(db, "user", user, "presetNames");
            onSnapshot(docRef, (snapshot) => {
                let data = [] as any[];
                snapshot.docs.forEach((doc: DocumentData) => {
                    let result = doc.data();
                    delete result.words;
                    data.push(result);
                });
                setPresets(data);
            });
        };
        if (user !== "") fetchData();
    }, [user]);

    return (
        <div className="py-[70px] w-full h-full px-5   overflow-scroll hidden-scrollbar">
            <AddCard></AddCard>
            <div className="mt-10 gap-10 flex flex-wrap justify-between">
                {presets.map((preset: { name: string; description: string; length: number; known: number }) => (
                    <PresetCard key={preset.name} name={preset.name} description={preset.description} length={preset.length} known={preset.known}></PresetCard>
                ))}
                <div className="flex-1 min-w-[240px]"></div>
            </div>
        </div>
    );
}
