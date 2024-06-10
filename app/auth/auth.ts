import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";
import { addUser, getUserInfo } from "@/lib/api/user";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signUp = async () => {
    console.log("signing up");
    signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        try {
            const res = token && (await addUser(token));
            window.location.href = "/";
        } catch {
            await deleteUser(auth.currentUser!);
        }
    });
};

export const signIn = async () => {
    console.log("signing in");
    signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        try {
            const res = token && (await addUser(token));
            window.location.href = "/";
        } catch {}
    });
};
