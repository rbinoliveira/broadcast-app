import { createContext, useContext } from 'react'

export type ActiveConnectionContextValue = {
  activeConnectionId: string
  setActiveConnectionId: (connectionId: string) => void
}

export const ActiveConnectionContext = createContext<
  ActiveConnectionContextValue | undefined
>(undefined)

export function useActiveConnection() {
  const context = useContext(ActiveConnectionContext)

  if (!context) {
    throw new Error(
      'useActiveConnection deve ser usado dentro de ActiveConnectionProvider',
    )
  }

  return context
}
