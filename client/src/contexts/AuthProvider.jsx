import React, { createContext, useState } from 'react'


export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const [user,setUser] = useState("Jomon")
    const authInfo = {
        user
    }
  return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider