"use client";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge } from "@mui/x-charts/Gauge";
import { MdDelete, MdAdd, MdSearch } from "react-icons/md";

import Link from "next/link";

export const PresetCard = ({ name, description, length, known }: { name: string; description: string; length: number; known: number }) => {
    return (
        <Link href={`/${name}`} className="w-full md:w-[45%]">
            <Card>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-3">
                    <Gauge width={240} height={240} value={(known * 100) / length} text={`${known} / ${length}`} />
                    <div className="w-full flex items-center justify-start gap-2">
                        <Button variant="outline">
                            <MdDelete></MdDelete>
                        </Button>
                        <Button variant="outline">
                            <MdAdd></MdAdd>
                        </Button>
                        <Button variant="outline">
                            <MdSearch></MdSearch>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

/**
 */
