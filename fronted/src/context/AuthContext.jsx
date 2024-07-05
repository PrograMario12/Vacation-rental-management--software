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

/**
 * Provides authentication functionality to the application.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The AuthProvider component.
 */
export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, setErrors] = useState(null)

  /**
   * Signs in the user with the provided data.
   * @param {Object} data - The user data.
   * @returns {Promise<Object>} A promise that resolves to the response data.
   */
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

  /**
   * Signs up the user with the provided data.
   * @param {Object} data - The user data.
   * @returns {Promise<Object>} A promise that resolves to the response data.
   */
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

  /**
   * Signs out the user.
   * @returns {Promise<void>} A promise that resolves when the user is signed out.
   */
  const signout = async () => {
    await axios.post('/signout');
    setUser(null);
    setIsAuth(false);
  }

  useEffect(() => {
    if (Cookie.get('token')) {
      axios
      .get('/profile')  
      .then((response) => {
        setUser(response.data)
        setIsAuth(true)
      })
      .catch((error) => {
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
        signin,
        signout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
