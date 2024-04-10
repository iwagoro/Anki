import { getAuth } from "firebase/auth";
import { app } from "@/components/util/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

const auth = getAuth(app);
const db = getFirestore(app);

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            return user;
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            return "";
        });
};

const createUserDoc = (user: any) => {
    const docRef = doc(db, "user", user.email, "presets", "default");
    setDoc(docRef, {
        description: "0000-00-00",
        known: 0,
        length: 0,
        name: "default",
        words: [],
    });
};

export const createUser = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            // Signed in
            const user = userCredential.user;
            createUserDoc(user);
            console.log("user", user);

            return user;
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            return "";
        });
};

export const signIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            // Signed in
            const user = userCredential.user;
            // ...
            return user;
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            return "";
        });
};

export const logOut = async () => {
    auth.signOut()
        .then(() => {
            console.log("logged out ");
            toast("Logged out", { description: "success" });
        })
        .catch((error) => {
            console.log("error logging out");
            toast("Error logging out", { description: "error" });
        });
};
