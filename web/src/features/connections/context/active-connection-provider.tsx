import { type ReactNode, useMemo, useState } from 'react'

import { ActiveConnectionContext } from './active-connection-context'

const ACTIVE_CONNECTION_STORAGE_KEY = 'broadcast.activeConnectionId'

function getStoredActiveConnectionId() {
  return window.localStorage.getItem(ACTIVE_CONNECTION_STORAGE_KEY) ?? ''
}

export function ActiveConnectionProvider({
  children,
}: {
  children: ReactNode
}) {
  const [activeConnectionId, setActiveConnectionIdState] = useState(
    getStoredActiveConnectionId,
  )

  const value = useMemo(
    () => ({
      activeConnectionId,
      setActiveConnectionId: (connectionId: string) => {
        setActiveConnectionIdState(connectionId)
        window.localStorage.setItem(ACTIVE_CONNECTION_STORAGE_KEY, connectionId)
      },
    }),
    [activeConnectionId],
  )

  return (
    <ActiveConnectionContext.Provider value={value}>
      {children}
    </ActiveConnectionContext.Provider>
  )
}
