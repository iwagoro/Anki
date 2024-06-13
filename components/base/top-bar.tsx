"use client";
import Link from "next/link";
import { Drawer } from "./drawer";
import { useContext } from "react";
import { AppContext } from "@/provider/provider";
export const TopBar = () => {
    const { user } = useContext(AppContext);
    return (
        <div className="absolute top-0 z-50 max-w-3xl w-full h-[50px] flex justify-center px-5 items-center  bg-background  ">
            <div className="w-full h-full flex justify-between items-center gap-10">
                {user.token ? (
                    <>
                        <Link href="/home">
                            <div className="flex items-center">
                                <h2 className="scroll-m-20  text-[24px] font-semibold tracking-tight first:mt-0">Anki</h2>
                            </div>
                        </Link>

                        <Drawer />
                    </>
                ) : (
                    <Link href="/auth">
                        <div className="flex items-center">
                            <h2 className="scroll-m-20  text-[24px] font-semibold tracking-tight first:mt-0">Anki</h2>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};
