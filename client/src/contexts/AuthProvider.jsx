import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth ,GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import app from '../firebase/firebase.config'
import useAxiosPublic from '../hooks/useAxiosPublic';
const provider = new GoogleAuthProvider();

export const AuthContext = createContext()
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const axiosPublic = useAxiosPublic();
    
    //create an account
  const createUser = (email, password) => {
      setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password )
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
    const logOut = async () => {
      await signOut(auth);
      setIsAuthenticated(false); // User is not authenticated after logout
    }

    //update user profile
  const updateUserProfile = (name, photoURL ) => {
      // console.log(name,photoURL,"qqqqqqqqqqqq");
       return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
    }
    
    //check signed-in user
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          const userInfo  = {email:currentUser.email}
          axiosPublic.post("/jwt", userInfo)
            .then((response) => {
              if (response.data.token) {
               localStorage.setItem("access_token",response.data.token)
             }
            })
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is authenticated
        }
        setLoading(false)
      });
      return () => {
          return unsubscribe()
        }
    },[])

    

    const authInfo = {
      user,
      loading,
      createUser,
      signUpWithGmail,
      login,
      logOut,
      updateUserProfile,
      isAuthenticated,
    };
  return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider