"use client";
import { useContext, useState } from "react";
import { Breadcrumb as BC, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { AddContext } from "./add-provider";
import { usePathname, useSearchParams } from "next/navigation";
export default function Breadcrumb() {
    const searchParams = useSearchParams();
    const type = usePathname().split("/")[2] || "";
    const list_id = searchParams.get("list_id") || "";
    const step = useSearchParams().get("step") || "";

    return (
        <BC>
            <BreadcrumbList>
                <BreadcrumbItem>
                    {step === "0" ? (
                        <BreadcrumbPage>Select Target List</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink asChild>
                            <Link href={`/add-word/?step=0&list_id=${list_id}`}>Select Target List</Link>
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    {step === "1" ? (
                        <BreadcrumbPage>Upload Image</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink asChild>
                            <Link href={`/add-word/image/?step=1&list_id=${list_id}`}>Upload Image</Link>
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    {step === "2" ? (
                        <BreadcrumbPage>Select Words</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink asChild>
                            <Link href={`/add-word/image/?step=2&list_id=${list_id}`}>Select Words</Link>
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    {step === "3" ? (
                        <BreadcrumbPage>Confirm</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink asChild>
                            <Link href={`/add-word/image/?step=3&list_id=${list_id}`}>Confirm</Link>
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
            </BreadcrumbList>
        </BC>
    );
}
