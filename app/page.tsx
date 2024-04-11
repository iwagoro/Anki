"use client";
import { use, useEffect, useContext } from "react";
import { AppContext } from "@/components/util/provider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/components/util/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
    const { user, setUser } = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        const fetchData = async () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUser(user.email || "");
                } else {
                    setUser("");
                    router.push("/login");
                }
            });
            return unsubscribe;
        };
        fetchData();
    }, []);
    return <></>;
}

/**
 */
