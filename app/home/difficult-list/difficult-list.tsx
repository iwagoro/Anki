"use client";
import { useContext } from "react";
import { AppContext } from "@/provider/provider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function DifficultList() {
    const { difficultWords } = useContext(AppContext);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Difficult Words</CardTitle>
                <CardDescription>Words you've marked as difficult</CardDescription>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-center text-primary">You have {difficultWords?.length} difficult words</CardDescription>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Try</Button>
            </CardFooter>
        </Card>
    );
}
