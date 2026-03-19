'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { AppUser } from './messages'

interface UserContextType {
  activeUser: AppUser | null
  setActiveUser: (user: AppUser) => void
  clearActiveUser: () => void
}

const UserContext = createContext<UserContextType>({
  activeUser: null,
  setActiveUser: () => {},
  clearActiveUser: () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [activeUser, setActiveUserState] = useState<AppUser | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('activeUser') as AppUser | null
    if (stored) setActiveUserState(stored)
  }, [])

  function setActiveUser(user: AppUser) {
    sessionStorage.setItem('activeUser', user)
    setActiveUserState(user)
  }

  function clearActiveUser() {
    sessionStorage.removeItem('activeUser')
    setActiveUserState(null)
  }

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser, clearActiveUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useActiveUser() {
  return useContext(UserContext)
}
