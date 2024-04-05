import { WordCard1 } from "@/components/util/word-card";

import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="max-w-md w-full h-full flex flex-col justify-center gap-10">
            <WordCard1 word="apple" definition="a red snack"></WordCard1>
            <div className=" flex justify-between items-center gap-5">
                <Button variant="outline">don't know</Button>
                <Button variant="outline">know</Button>
            </div>
        </div>
    );
}

/**
 */
