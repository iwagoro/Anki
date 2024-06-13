"use client";

import { useState, createContext, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { userType, folderType, vocabListType, wordType } from "@/lib/types";
import { getUserInfo } from "@/lib/api/user";
import { PushSpinner } from "react-spinners-kit";
import { getVocabListsNotInFolder } from "@/lib/api/vocab-list";
import { getFolder } from "@/lib/api/folder";

import useVocabList from "@/lib/localStorage/useVocabList";
import useFolder from "@/lib/localStorage/useFolder";
import LoadingDialog from "@/components/util/loading-dialog";

export const AppContext = createContext(
    {} as {
        user: userType;
        setUser: React.Dispatch<React.SetStateAction<userType>>;
        vocabLists: vocabListType[];
        setVocabLists: React.Dispatch<React.SetStateAction<vocabListType[]>>;
        folders: folderType[];
        setFolders: React.Dispatch<React.SetStateAction<folderType[]>>;
        difficultWords: wordType[];
        setDifficultWords: React.Dispatch<React.SetStateAction<wordType[]>>;
        recentId: number[];
        addRecentVocabList: (list_id: number) => void;
        isLoading: boolean;
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    //?　状態管理
    //* ユーザ情報
    const [user, setUser] = useState<userType>({} as userType);
    //* 単語帳リスト
    const [vocabLists, setVocabLists] = useState<vocabListType[]>([]);
    //* フォルダリスト
    const [folders, setFolders] = useState<folderType[]>([]);
    //* 苦手な単語リスト
    const [difficultWords, setDifficultWords] = useState<wordType[]>([]);
    //* 認証状態  0: loading, 1: login, 2: logout
    const [authStatus, setAuthStatus] = useState<0 | 1 | 2>(0);
    //* lodingかどうか
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //? ローカルストレージ関連
    //* 単語帳リスト
    const { savedVocabList, updateVocabList, addRecentVocabList, recentId } = useVocabList();
    //* フォルダリスト
    const { savedFolder, updateFolder } = useFolder();

    //? ルーティング関連
    const path = usePathname();
    const router = useRouter();

    //! 認証状態の確認
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
                }
                //? ログアウト
                else {
                    setUser({} as userType);
                    setAuthStatus(2);
                    router.push("/auth");
                }
            });
        else setAuthStatus(2);
    }, []);

    //! フォルダと単語帳の更新
    useEffect(() => {
        if (user.token) {
            Promise.all([getVocabListsNotInFolder(user.token), getFolder(user.token)]).then(([vocabLists, folders]) => {
                updateVocabList(vocabLists);
                updateFolder(folders);
            });
        }
    }, [user]);

    //! stateにローカルストレージのデータをセット
    useEffect(() => {
        setVocabLists(savedVocabList);
        setFolders(savedFolder);
    }, [savedVocabList, savedFolder]);

    const contextValue = { user, setUser, vocabLists, setVocabLists, folders, setFolders, difficultWords, setDifficultWords, recentId, addRecentVocabList, isLoading, setIsLoading };
    return (
        <AppContext.Provider value={contextValue}>
            {authStatus !== 0 ? children : <PushSpinner size={50} color="crimson" />}
            <LoadingDialog isLoading={isLoading} />
        </AppContext.Provider>
    );
};
