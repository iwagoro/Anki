"use client";

import { useState, createContext, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { userType } from "@/lib/types";
import { getUserInfo } from "@/lib/api/user";
import { PushSpinner } from "react-spinners-kit";

export const AppContext = createContext(
    {} as {
        user: userType;
        setUser: React.Dispatch<React.SetStateAction<userType>>;
    }
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userType>({} as userType);
    const [authStatus, setAuthStatus] = useState<0 | 1 | 2>(0); // 0: loading, 1: login, 2: logout
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (path !== "/auth")
            onAuthStateChanged(auth, async (user) => {
                //?　ログイン
                if (user) {
                    try {
                        const token = await getIdToken(user);
                        const userInfo = await getUserInfo(token);
                        setUser({ ...userInfo, token });
                        setAuthStatus(1);
                    } catch {
                        setAuthStatus(2);
                        router.push("/auth");
                    }
                    //? ログアウト
                } else {
                    setUser({} as userType);
                    setAuthStatus(2);
                    router.push("/auth");
                }
            });
        else setAuthStatus(2);
    }, []);

    const contextValue = { user, setUser };
    return <AppContext.Provider value={contextValue}>{authStatus !== 0 ? children : <PushSpinner size={50} color="crimson" />}</AppContext.Provider>;
};
