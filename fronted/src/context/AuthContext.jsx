import {createContext, useState, useContext, useEffect } from 'react'
import axios from '../api/axios'
import Cookie from 'js-cookie'

export const AuthContext = createContext() 

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, setErrors] = useState(null)

  const signin = async (data) => {
    try {
      const response = await axios.post('/signin', data)
      console.log(response)
      setUser(response.data)
      setIsAuth(true);

      return response.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }

      setErrors([error.response.data])
    }
  }

  const signup = async (data) =>{
    try {
      const response = await axios.post('/signup', data)
      setUser(response.data)
      setIsAuth(true);

      return response.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }

      setErrors([error.response.data])
    }
  };


  useEffect(() => {
    if (Cookie.get('token')) {
      axios
      .get('/profile')  
      .then((response) => {
        setUser(response.data)
        setIsAuth(true)
      })
      .catch((error) => {
        console.log(error)
        setIsAuth(false)
        setUser(null)
      })
    }
  }, []);

  return (
    <AuthContext.Provider value={{
        user,
        isAuth,
        errors,
        signup,
        signin
    }}>
      {children}
    </AuthContext.Provider>
  )
}
