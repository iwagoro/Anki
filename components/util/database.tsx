"use client";
interface wordProp {
    word: string;
    definition: string;
    forgot: boolean;
}
import { useTheme } from "next-themes";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableCaption, TableHead } from "@/components/ui/table";
import { Tab } from "@mui/material";
export const DataTable = ({ words }: { words: wordProp[] }) => {
    const { theme } = useTheme();
    return (
        <div className="py-[70px]  max-w-md w-full h-full px-10 flex flex-col  gap-10 overflow-y-scroll hidden-scrollbar">
            <Table className="border border-border ">
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">#</TableHead>
                        <TableHead className="font-bold">word</TableHead>
                        <TableHead className="font-bold">definition</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {words.map((word, index) => {
                        return (
                            <TableRow key={index} className={`${index % 2 === 1 ? (theme === "light" ? "bg-gray-100" : "bg-gray-900") : ""}`}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{word.word}</TableCell>
                                <TableCell>{word.definition}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
