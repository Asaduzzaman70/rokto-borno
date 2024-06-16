import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.config";

export const CreateContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // loader
    const [loader, setLoader] = useState(true);

    // Register
    const register = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // Set User Name, PhotoURL
    const namePhotoUrl = (name, photo) => {
        setLoader(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // login with password
    const logIn = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Log in method
    const logInWithMedia = (arg) => {
        if (arg === 'google') {
            const googleProvider = new GoogleAuthProvider();
            setLoader(true);
            return signInWithPopup(auth, googleProvider);
        }
        else if (arg == 'gitHub') {
            const gitHubProvider = new GithubAuthProvider();
            setLoader(true);
            return signInWithPopup(auth, gitHubProvider);
        }
    }

    // Sign Out
    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }

    // Get User information
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            const userEmail = currentUser?.uid || user?.uid;
            const loaderUser = { uId: userEmail };
            console.log('User:------->', currentUser);
            setUser(currentUser);
            setLoader(false); // Set loader to false after authentication state is determined
        });
        return () => {
            unSubscribe();
        }
    }, []);


    // console.log(user);

    const authInfo = {
        user,
        setUser,
        loader,
        register,
        namePhotoUrl,
        logIn,
        logInWithMedia,
        logOut,
    }
    return (
        <CreateContext.Provider value={authInfo}>
            {children}
        </CreateContext.Provider>
    );
};

export default AuthProvider;