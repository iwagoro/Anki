"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Large } from "@/components/ui/typography";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/provider/provider";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { FileSpreadsheet, Image, Folder } from "lucide-react";
import Link from "next/link";
//! ユーザーのログアウト
export const logOut = async () => {
    auth.signOut()
        .then(() => {
            toast("logged out ");
        })
        .catch((error) => {
            toast("error logging out");
        });
};

export const Drawer = () => {
    const { theme, setTheme } = useTheme();
    const { user } = useContext(AppContext);
    const router = useRouter();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent className=" flex flex-col justify-start items-start gap-5">
                <SheetHeader className="flex justify-start">
                    <SheetTitle className="text-left">User detail</SheetTitle>
                    <SheetDescription>{user && user.email}</SheetDescription>
                </SheetHeader>
                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <div
                        className={`flex gap-5 items-center  bg-transparent curosr-pointer  ${theme === "dark" ? "text-white" : "text-black"}`}
                        onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                    >
                        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                        <Large>Change Color</Large>
                    </div>
                </SheetClose>
                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <div
                        className={`flex gap-5 items-center  bg-transparent curosr-pointer`}
                        onClick={() => {
                            logOut();
                            router.push("/auth");
                        }}
                    >
                        <LogOut size={24} />
                        <Large>Log out</Large>
                    </div>
                </SheetClose>

                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <Link href="/add-word/?type=csv&step=0" className={`flex gap-5 items-center  bg-transparent curosr-pointer`}>
                        <FileSpreadsheet size={24} />
                        <Large>Add Word From CSV</Large>
                    </Link>
                </SheetClose>
                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <Link href="/add-word/?type=image&step=0" className={`flex gap-5 items-center  bg-transparent curosr-pointer`}>
                        <Image size={24} />
                        <Large>Add Word From Image</Large>
                    </Link>
                </SheetClose>
                <SheetClose className="w-full pb-5 border-b-[1px] border-border" asChild>
                    <Link href="/folder" className={`flex gap-5 items-center  bg-transparent curosr-pointer`}>
                        <Folder size={24} />
                        <Large>Add Folder</Large>
                    </Link>
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
};
