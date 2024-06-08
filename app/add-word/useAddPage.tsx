"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import AddWordFromImage from "./add-word-form";

import Link from "next/link";
import SelectWords from "./select-words";
import ConfirmWord from "./confirm-word";

export default function useAddPage() {
    const searchParams = useSearchParams();
    const stepContent = ["Upload File", "Select Words", "Confirm"];
    const addType = searchParams.get("type");
    const step = searchParams.get("step");
    const [pageContent, setPageContent] = useState<React.ReactNode>(null);

    const breadcrumb = stepContent.map((item, i) => {
        return (
            <BreadcrumbItem key={i}>
                {step === i.toString() ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{item}</BreadcrumbPage>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />
                    </>
                ) : (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/add-word/?type=${addType}&step=${i}`}>{item}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />
                    </>
                )}
            </BreadcrumbItem>
        );
    });

    useEffect(() => {
        switch (step) {
            case "0":
                setPageContent(<AddWordFromImage />);
                break;
            case "1":
                setPageContent(<SelectWords />);
                break;
            case "2":
                setPageContent(<ConfirmWord />);
                break;
            default:
                setPageContent(null);
                break;
        }
    }, [step]);

    return { breadcrumb, pageContent, addType, step };
}
