import axios from "axios";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_API_URL;

//! フォルダを取得する
export const getFolder = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/folders`, config);
        return res.data.folder;
    } catch {
        toast.error("フォルダの取得に失敗しました");
        throw new Error();
    }
};

//! フォルダの中身を取得する
export const getFolderContent = async (token: string, folderId: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(`${url}/folder/vocab-lists/?id=${folderId}`, config);
        console.log(res.data);
        return res.data.vocab_list;
    } catch {
        toast.error("フォルダの中身の取得に失敗しました");
        return [];
    }
};

//! フォルダを作成する
export const createFolder = async (token: string, folderName: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.post(`${url}/folder/?name=${folderName}`, {}, config);
        toast.success("フォルダを作成しました");
    } catch {
        toast.error("フォルダの作成に失敗しました");
    }
};

//! フォルダを削除する
export const deleteFolder = async (token: string, folderId: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.delete(`${url}/folder/?id=${folderId}`, config);
        toast.success("フォルダを削除しました");
    } catch {
        toast.error("フォルダの削除に失敗しました");
    }
};

//! フォルダを更新する
export const updateFolder = async (token: string, folderId: string, folderName: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.put(`${url}/folder/?id=${folderId}&new_name=${folderName}`, {}, config);
        toast.success("フォルダを更新しました");
    } catch {
        toast.error("フォルダの更新に失敗しました");
    }
};
