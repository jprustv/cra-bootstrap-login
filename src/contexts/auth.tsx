import React, { createContext, useEffect, useState } from 'react'
// import * as auth from '../services/auth'

interface IAuthContext {
  signed : boolean,
  user : object | null,
  signIn(username: string, password: string) : Promise<void>, 
  error : string,
  signOut() : void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider : React.FC = ({ children }) => {

  const [ user, setUser ] = useState<object | null>(null)
  const [ error, setError ] = useState('')

  useEffect(() => {
    const userFromStorageString = localStorage.getItem('user')
    const userFromStorage = userFromStorageString !== null && JSON.parse(userFromStorageString)
    setUser(userFromStorage)
  }, [])

  async function signIn(username :string, password : string) {
    // Lógica para Fazer Login na API deve ser colocada aqui..

    // const response = await auth.signIn()
    const response = {
      status : 'OK',
      user : {
        name : username
      }
    }

    if (response.status === 'OK' && response.user) {
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
    } else {
      setError('Login failed')
    }
  }

  async function signOut() {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value ={{
      signed : Boolean(user),
      user,
      signIn,
      error,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider
}
