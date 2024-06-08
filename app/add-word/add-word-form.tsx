"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { ChevronRight, FileSpreadsheet, Image } from "lucide-react";
import Link from "next/link";
import { WordContext } from "./wordProvider";
import { useContext } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DominoSpinner, WaveSpinner } from "react-spinners-kit";

type Inputs = {
    listName: string;
    file: FileList;
};

export default function AddWordFromImage() {
    const { addWordsFromImage, isLoading, addWordsFromCsv } = useContext(WordContext);
    //! react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    //! useSearchParam
    const searchParams = useSearchParams();
    const addType = searchParams.get("type");

    //! 画像から文章を取得
    const handleImageSubmit: SubmitHandler<Inputs> = (data) => {
        if (addType === "image") addWordsFromImage(data.listName, data.file[0]);
        else if (addType === "csv") {
            const reader = new FileReader();
            reader.onload = () => {
                //解析結果がreader.resultに代入されている
                // console.log(reader.result);
                addWordsFromCsv(data.listName, reader.result as string);
            };

            //テキストファイルの場合
            reader.readAsText(data.file[0]);
        }
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Add Words</CardTitle>
                    <CardDescription>Add words from Image</CardDescription>
                </CardHeader>
                <CardContent className="w-full flex gap-5">
                    <Link href="/add-word/?type=csv&step=0" className="w-full">
                        <Button variant="outline" className={`w-full ${addType === "csv" && "border-primary"} flex items-center gap-2 py-6`}>
                            <FileSpreadsheet size={18} />
                            From CSV
                        </Button>
                    </Link>
                    <Link href="/add-word/?type=image&step=0" className="w-full">
                        <Button variant="outline" className={`w-full ${addType === "image" && "border-primary"} flex items-center gap-2 py-6`}>
                            <Image size={18} />
                            From Image
                        </Button>
                    </Link>
                </CardContent>
                <form onSubmit={handleSubmit(handleImageSubmit)}>
                    <CardContent>
                        <Label>List Name</Label>
                        <Input type="text" placeholder="type the list name" {...register("listName", { required: true })} />
                        {errors.listName && <span>This field is required</span>}
                    </CardContent>
                    <CardContent>
                        <Label>Upload Image</Label>
                        <Input type="file" accept={addType === "csv" ? ".csv" : ".jpg,.jpeg,.png"} {...register("file", { required: true })} />
                        {errors.file && <span>This field is required</span>}
                    </CardContent>
                    <CardFooter className="w-full justify-between">
                        <Button type="submit">Add</Button>
                    </CardFooter>
                </form>
            </Card>
            <Dialog open={isLoading}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Loading...</DialogTitle>
                        <DialogDescription>Please wait while we process your request.</DialogDescription>
                    </DialogHeader>

                    <div className="w-full flex justify-center">
                        <DominoSpinner size={140} color="crimson" />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
