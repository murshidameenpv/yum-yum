import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider.jsx'

function useAuth() {
    const auth = useContext(AuthContext)
  return auth
}

export default useAuth