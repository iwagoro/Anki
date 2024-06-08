import axios from "axios";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_API_URL;

//! ユーザー情報を取得する
export const getUserInfo = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log(`${url}/user`);
        const res = await axios.get(`${url}/user`, config);
        return res.data.user;
    } catch {
        toast.error("ユーザー情報の取得に失敗しました");
        throw new Error();
    }
};

//! ユーザを追加する
export const addUser = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${url}/user`, {}, config);
    } catch {
        toast.error("ユーザーの追加に失敗しました");
        throw new Error();
    }
};

//! ユーザを削除する
export const deleteUser = async (token: string) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.delete(`${url}/user`, config);
    } catch {
        toast.error("ユーザーの削除に失敗しました");
        throw new Error();
    }
};
