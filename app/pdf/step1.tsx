"use client";

import { useContext, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppContext } from "@/provider/provider";

import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";

// PDF.js workerのURLを設定
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Step1() {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const { user } = useContext(AppContext);
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = usePathname().split("/")[2];
    const list_id = searchParams.get("list_id");
    const viewerRef = useRef(null);

    const onUpload = () => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
        }
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Upload Image</CardTitle>
                    <CardDescription>Upload a PDF file</CardDescription>
                    <CardDescription>.pdf files are supported</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label className="text-md font-bold">Create New</Label>
                    <Input type="file" accept=".pdf" className="mt-2" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                </CardContent>
                <div className="relative mx-[18px] mb-[18px] flex items-center">
                    <Separator className="w-full" />
                    <Label className="absolute left-1/2 transform -translate-x-1/2 bg-card px-2">OR</Label>
                </div>
                <CardFooter>
                    <Button className="w-full" disabled={!file} onClick={onUpload}>
                        Upload
                    </Button>
                </CardFooter>
            </Card>
            {fileUrl && (
                <div ref={viewerRef} style={{ height: "500px", width: "500px", border: "1px solid black" }}>
                    <Document file={fileUrl}>
                        <Page pageNumber={1} />
                    </Document>
                </div>
            )}
        </>
    );
}
