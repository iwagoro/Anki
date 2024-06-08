"use client";

import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import { WordProvider } from "./wordProvider";
import useAddPage from "./useAddPage";

const Home = () => {
    const { breadcrumb, pageContent } = useAddPage();

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <WordProvider>
                <Breadcrumb>
                    <BreadcrumbList>{breadcrumb}</BreadcrumbList>
                </Breadcrumb>
                {pageContent}
            </WordProvider>
        </div>
    );
};

export default Home;
