"use client";
import { useEffect, useState } from "react";
import { PresetCard } from "@/components/util/preset-card";
import { getPresets, addWordFromCSV } from "@/components/util/data-util";
import { AddCard } from "@/components/util/add-card";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
    const [presets, setPresets] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getPresets();
            setPresets(data as []);
        };
        fetchData();
    }, []);

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
