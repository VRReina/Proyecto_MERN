import { useState, useEffect, createContext } from "react"
import { Auth, User } from "../api"
import { hasExpiredToken } from "../utils"


const userController = new User
const authController = new Auth

export const AuthContext = createContext()

export function AuthProvider(props){

    const { children } = props
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        (async() => {
            const accessToken = authController.getAccessToken()
            const refreshToken = authController.geRefreshtAccessToken()
            
            if (hasExpiredToken(accessToken)) {
                if (hasExpiredToken(refreshToken)) {
                    logout()
                } else {
                  await reLogin(refreshToken)
                }               
            } else {
                await login(accessToken)
            }

            setLoading(false)
        })()

    }, [])

    const reLogin = async (refreshToken) => {
        try{
            const {accessToken} = await authController.refreshAccessToken(refreshToken)
            authController.setAccessToken(accessToken)
            await login (accessToken)
        } catch (error) {
            console.error(error)
        }
        
    }

    const login = async (accessToken) => {
        try{
            
            const response = await userController.getMe(accessToken)
            delete response.password          
            setUser(response)
            setToken(accessToken)
            
        } catch ( error) {
            console.log(error)
            
        }
    }

    const logout = () =>{
        setUser(null)
        setToken(null)
        authController.removeTokens()
    }

    const data = {
        accessToken: token,
        user,
        login,
        logout,
    }

  if(loading) return null

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}