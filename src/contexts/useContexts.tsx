/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
type signInType = {
  usuario: string
  password: string
  e: any
}

type useContextType = {
  isAuthenticated: boolean
  signIn: any
  isLoading: boolean
  showSideBar: boolean
  setShowSideBar: any
  componentToShowHome: any
  setComponentToShowHome: any
  logout: any
  userInfo: any
}
export const Context = createContext({} as useContextType)

export function ContextProvider({ children }: any) {
  const navigate = useNavigate()
  const cookies = parseCookies()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showSideBar, setShowSideBar] = useState(false)
  const [componentToShowHome, setComponentToShowHome] = useState('one')
  const [userInfo, setUserInfo] = useState()
  useEffect(() => {
    const cookiesVerify = cookies['auth-token']
    const verifyUser = async () => {
      if (cookiesVerify) {
        try {
          const response = await api.get('/verifyTokenMe')
          setUserInfo(response.data.user)
          setIsAuthenticated(true)
          if (window.location.pathname === '/login') {
            navigate('/dashboard')
          }
          
        } catch (err) {
          alert('Sessao expirida, realizar login novamente')
          navigate('/')
          console.log(err)
        }
      }
    }
    verifyUser()
    setIsLoading(false)
  }, [isAuthenticated])

  const signIn = async ({ usuario, password }: signInType) => {
    try {
      const response = await api.post('/realizarlogin', { usuario, password })
      const { token, user } = response.data
      setIsAuthenticated(true)
      setUserInfo(user)
      setCookie(undefined, 'auth-token', token, {
        maxAge: 60 * 60 * 1,
      })
      api.defaults.headers['x-access-token'] = `${token}`
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }
  const logout = () => {
    destroyCookie(undefined, 'auth-token')
    setIsAuthenticated(false)
    navigate('/login')
  }
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        signIn,
        isLoading,
        showSideBar,
        setShowSideBar,
        componentToShowHome,
        setComponentToShowHome,
        logout,
        userInfo,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContexts = () => useContext(Context)
