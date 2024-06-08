import axios from "axios";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_API_URL;

//! 全ての単語帳を取得
export const getVocabLists = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/vocab-list`, config);
        return res.data.vocab_list;
    } catch {
        return [];
    }
};

//! フォルダーに属さない単語帳を取得
export const getVocabListsNotInFolder = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/vocab-list/unfoldered`, config);
        return res.data.vocab_list;
    } catch {
        return [[], 0, 0];
    }
};

//! 指定した英単語帳の単語を取得
export const getVocabListWords = async (token: string, vocabListId: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/vocab-list/?name=${vocabListId}`, config);
        return res.data.words;
    } catch {
        return [];
    }
};

//! 単語帳をフォルダに移動
export const moveVocabListToFolder = async (token: string, vocabListId: number, folderId: number) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/vocab-list/folder/?list_id=${vocabListId}&folder_id=${folderId}`, {}, config);
        toast.success("単語帳をフォルダに移動しました");
    } catch {
        toast.error("単語帳の移動に失敗しました");
    }
};

//! 単語帳をフォルダから削除
export const removeVocabListFromFolder = async (token: string, vocabListId: number, folderId: number) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.delete(`${url}/vocab-list/folder/?list_id=${vocabListId}&folder_id=${folderId}`, config);
        toast.success("単語帳をフォルダから削除しました");
    } catch {
        toast.error("単語帳の削除に失敗しました");
    }
};

//! 単語帳の名前を変更
export const updateVocabListName = async (token: string, vocabListId: number, newName: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.put(`${url}/vocab-list/?id=${vocabListId}&new_name=${newName}`, {}, config);
        toast.success("単語帳の名前を変更しました");
    } catch {
        toast.error("単語帳の更新に失敗しました");
    }
};

//! 単語帳を削除
export const deleteVocabList = async (token: string, vocabListId: number) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.delete(`${url}/vocab-list/?id=${vocabListId}`, config);
        toast.success("単語帳を削除しました");
    } catch {
        toast.error("単語帳の削除に失敗しました");
    }
};
