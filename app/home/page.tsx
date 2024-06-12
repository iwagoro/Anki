"use client";
import React, { use, useState, useEffect } from "react";
import { LoadingDialog } from "@/components/util/loading-dialog";
import useHome from "./useHome";
import Dashboard from "./dashboard";
import VocabLists from "./vocab-list/vocab-lists";
import Folders from "./folder/folders";
import DifficultList from "./difficult-list/difficult-list";

export default function Home() {
    const { isLoading } = useHome();

    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <Dashboard />
            <DifficultList />
            <Folders />
            <VocabLists />
            <LoadingDialog isLoading={isLoading} />
        </div>
    );
}
