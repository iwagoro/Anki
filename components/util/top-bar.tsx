"use client";
import { Large } from "@/components/util/typography";
import Link from "next/link";

import { useState, useEffect } from "react";
import { TbArrowsExchange } from "react-icons/tb";
import { AppContext } from "@/components/util/provider";
import { useContext } from "react";
import { Input } from "../ui/input";
import { MdBrightness5, MdBrightness2, MdOutlineAutoAwesome } from "react-icons/md";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { MdMenu } from "react-icons/md";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { VscLayoutMenubar } from "react-icons/vsc";
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { MdOutlineAutoMode } from "react-icons/md";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

import { useTheme } from "next-themes";
export const TopBar = () => {
    const { isList, setIsList, isFocused, setIsFocused, isHate, setIsHate, autoPlay, setAutoPlay } = useContext(AppContext);
    const { theme, setTheme } = useTheme();

    return (
        <>
            <div className="absolute z-50 max-w-2xl w-full h-[50px] flex justify-between items-center px-10  gap-10 bg-transparent">
                <Link href="/home">
                    <div className="flex gap-4 items-center bg-transparent">
                        <svg width="24" height="24" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_5_2)">
                                <path d="M120 149C120 140.163 127.163 133 136 133H262.242C277.879 133 285.222 152.332 273.528 162.713L146.622 275.368C136.301 284.529 120 277.203 120 263.402V149Z" fill={theme === "dark" ? "white" : "black"} />
                                <path d="M26.5604 271.049C20.0146 284.345 0 279.686 0 264.866V15C0 6.71573 6.71573 0 15 0H160H194.58C198.082 0 201.475 1.24496 204.168 3.51901L274.589 62.9705C278.017 65.8649 280 70.1581 280 74.6859V102.784C280 115.546 265.076 122.478 255.324 114.245L162.726 36.0709C155.449 29.9273 144.348 32.1518 140 40.625L120 81.25L80 162.5L26.5604 271.049Z" fill={theme === "dark" ? "white" : "black"} />
                            </g>
                            <defs>
                                <clipPath id="clip0_5_2">
                                    <rect width="280" height="280" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <h2 className="scroll-m-20  text-[24px] font-semibold tracking-tight first:mt-0">Anki</h2>
                    </div>
                </Link>
                {/* <Input type="text" placeholder="full-text searching is not available" className="h-8" onChange={() => {}}></Input> */}
                <Sheet>
                    <SheetTrigger>
                        <MdMenu size={24} />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col justify-start items-start gap-5">
                        <SheetHeader className="pb-5 border-b-[1px] border-border">
                            <SheetTitle className="flex justify-start items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                                </Avatar>
                                Test User
                            </SheetTitle>
                            <SheetDescription className="text-left">Currently the only user is a test user. We plan to implement authentication with a Google account sometime in the future.</SheetDescription>
                        </SheetHeader>
                        <div className="w-full flex flex-col gap-4  pb-5 border-b-[1px] border-border">
                            {/* <SheetClose
                                className={`flex gap-5 items-center bg-transparent cursor-pointer  ${isList ? "text-primary" : ""}`}
                                onClick={() => {
                                    if (isList) {
                                        toast("turn off List Mode", { description: "You can see the list of words by clicking the list button" });
                                    } else {
                                        toast("List Mode", { description: "You can see the list of words by clicking the list button" });
                                    }
                                    setIsList((prev: boolean) => !prev);
                                    setIsFocused(false);
                                }}
                            >
                                <TbArrowsExchange size={24}></TbArrowsExchange>
                                <Large>List Mode</Large>
                            </SheetClose> */}
                            <SheetClose
                                className={`flex gap-5 items-center  bg-transparent curosr-pointer  ${theme === "dark" ? "text-white" : "text-black"}`}
                                onClick={() => {
                                    setTheme(theme === "dark" ? "light" : "dark");
                                    toast("Theme Changed", { description: "You can change the theme by clicking the button" });
                                }}
                            >
                                {theme === "dark" ? <MdBrightness5 size={24} /> : <MdBrightness2 size={24} />}
                                <Large>Change Color</Large>
                            </SheetClose>

                            <SheetClose
                                className={`flex gap-5 items-center bg-transparent cursor-pointer  ${isFocused ? "text-primary" : ""}`}
                                onClick={() => {
                                    if (isFocused) {
                                        toast("turn off Database Mode", { description: "You can see the list of words by clicking the list button" });
                                    } else {
                                        toast("Database Mode", { description: "You can see the list of words by clicking the list button" });
                                    }
                                    setIsFocused((prev: boolean) => !prev);
                                    setIsList(false);
                                }}
                            >
                                <VscLayoutMenubar size={24}></VscLayoutMenubar>
                                <Large>Database Mode</Large>
                            </SheetClose>
                            <SheetClose
                                className={`flex gap-5 items-center bg-transparent cursor-pointer  ${isHate ? "text-primary" : ""}`}
                                onClick={() => {
                                    if (isHate) {
                                        toast("turn off Focus Modee", { description: "You can see the list of words by clicking the list button" });
                                    } else {
                                        toast("Focus Mode", { description: "You can see the list of words by clicking the list button" });
                                    }
                                    setIsHate((prev: boolean) => !prev);
                                }}
                            >
                                {isHate ? <LuLightbulb size={24} /> : <LuLightbulbOff size={24} />}
                                <Large>Only You don't know</Large>
                            </SheetClose>
                            <SheetClose
                                className={`flex gap-5 items-center bg-transparent cursor-pointer  ${autoPlay ? "text-primary" : ""}`}
                                onClick={() => {
                                    if (autoPlay) {
                                        toast("turn off Autoplay", { description: "You can see the list of words by clicking the list button" });
                                    } else {
                                        toast("Autoplay", { description: "You can see the list of words by clicking the list button" });
                                    }
                                    setAutoPlay((prev: boolean) => !prev);
                                }}
                            >
                                <MdOutlineAutoMode size={24}></MdOutlineAutoMode>
                                <Large>Autoplay</Large>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <Toaster></Toaster>
        </>
    );
};
