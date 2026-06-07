import React, { ReactNode, createContext, useState } from 'react'

export interface AppContextContent {
  isAnimating: boolean
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextContent>({
  isAnimating: false,
  setIsAnimating: () => {
    return null
  },
})

export interface AppProviderProps {
  children?: ReactNode
}

export const AppProvider = (props: AppProviderProps): JSX.Element => {
  const { children } = props
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <AppContext.Provider
      value={{
        isAnimating,
        setIsAnimating,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
