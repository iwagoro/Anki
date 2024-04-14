import { getAuth } from "firebase/auth";
import { app } from "@/components/util/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

const auth = getAuth(app);
const db = getFirestore(app);

export const createUserDoc = (user: any) => {
    const docRef = doc(db, "user", user, "presets", "default");
    setDoc(docRef, {
        description: "0000-00-00",
        known: 0,
        length: 0,
        name: "default",
        words: [],
    });
};
