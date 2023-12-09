import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../../firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider()
  const axiosPublic = useAxiosPublic()

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  const googleSignIn = () => {
    return signInWithPopup(auth,provider)
}
  const updateUserProfile = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logout,
    updateUserProfile,
    googleSignIn
  };
  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth,currentUser => {
        setUser(currentUser);
        console.log('current user is ', currentUser)
        if(currentUser) {
            const userInfo = {email : currentUser.email};
            axiosPublic.post('/jwt', userInfo)
            .then(res => {
               if(res.data.token) {
                localStorage.setItem('access-token', res.data.token)
                setLoading(false)
               }
            })
            
        }
        else {
            localStorage.removeItem('access-token')
            setLoading(false)
        }
        
    })
    return ()=> {
        unsubscribe()
    }
},[axiosPublic]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
