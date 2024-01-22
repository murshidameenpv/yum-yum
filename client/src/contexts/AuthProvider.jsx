import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth ,GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import app from '../firebase/firebase.config'
const provider = new GoogleAuthProvider();

export const AuthContext = createContext()
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)

    //create an account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //signup with gmail account
    const signUpWithGmail = () => {
        return signInWithPopup(auth, provider)
    }

    //login using email password
    const login = (email,password) => {
        return signInWithEmailAndPassword(auth, email, password);

    }

    //logout
    const logout = () => {
        return signOut(auth);
    }

    //update user profile
    const updateUserProfile = ({ name,photoURL }) => {
       return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
    }
    
    //check signed-in user
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
              setUser(currentUser)
              setLoading(false)
          } else {
            // User is signed out
            // ...
          }
        });
      return () => {
          return unsubscribe()
        }
    },[])

    

    const authInfo = {
      user,
      createUser,
      signUpWithGmail,
      login,
      logout,
      updateUserProfile,
    };
  return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider