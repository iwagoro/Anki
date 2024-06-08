"use client";
import React from "react";
import { WordContext } from "./wordProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DominoSpinner, WaveSpinner } from "react-spinners-kit";

export default function SelectWords() {
    const { text, isLoading, csv, words, selectedWordIndex, setSelectedWordIndex, selectedWords, addWordsFromCsv, addWordsFromImage, getWordMeaning, makePhrase } = useContext(WordContext);
    const randomWidths = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) + 50);

    return (
        <>
            <div className="w-full flex flex-col justify-start items-start gap-5">
                <div className="w-full flex flex-col justify-start items-start gap-5">
                    <p className="text-2xl font-bold">Extracted Sentences</p>
                    <div className="flex flex-wrap">
                        {words.length === 0
                            ? Array.from({ length: 50 }).map((_, index) => (
                                  <Skeleton key={index} className={`animate-pulse rounded-md bg-muted h-10 my-1 mr-1`} style={{ width: `${randomWidths[index]}px` }} />
                              ))
                            : words.map((word, index) => (
                                  <span
                                      key={index}
                                      className={`px-1 py-1 my-1 rounded-md cursor-pointer font-normal text-xl
                                  ${selectedWordIndex[index + 1] && "rounded-r-none "} 
                                  ${selectedWordIndex[index - 1] && "rounded-l-none "}  
                                  ${selectedWordIndex[index] && "bg-primary "}`}
                                      onClick={() =>
                                          setSelectedWordIndex((prev) => {
                                              const copy = [...prev];
                                              copy[index] = !copy[index];
                                              return copy;
                                          })
                                      }
                                  >
                                      {word}
                                  </span>
                              ))}
                    </div>
                    <Button onClick={getWordMeaning} className="w-full text-xl font-semibold">
                        create Vocab List!
                    </Button>
                </div>
            </div>

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
