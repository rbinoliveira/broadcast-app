import { CircularProgress, Stack } from '@mui/material'

export function FullScreenLoader() {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress />
    </Stack>
  )
}
