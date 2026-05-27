import { Button, Stack, Typography } from '@mui/material'

import { useAuth } from '@/features/auth/context/auth-context'
import { signOutUser } from '@/features/auth/services/auth.service'

export function HomePage() {
  const { user } = useAuth()

  async function handleLogout() {
    await signOutUser()
  }

  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h5">Voce esta logado</Typography>

      {user?.email && (
        <Typography color="text.secondary">{user.email}</Typography>
      )}

      <Button onClick={handleLogout} variant="contained">
        Sair
      </Button>
    </Stack>
  )
}
