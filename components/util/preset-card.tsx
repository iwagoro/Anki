"use client";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";

import { Gauge } from "@mui/x-charts/Gauge";
import Link from "next/link";

export const PresetCard = ({ name, description, length, known }: { name: string; description: string; length: number; known: number }) => {
    return (
        <Link href={`/${name}`} className="w-full md:w-[45%]">
            <Card>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Gauge width={240} height={240} value={(known * 100) / length} text={`${known} / ${length}`} />
                </CardContent>
            </Card>
        </Link>
    );
};

/**
 */
