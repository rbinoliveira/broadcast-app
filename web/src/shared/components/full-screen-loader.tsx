import { CircularProgress } from '@mui/material'

export function FullScreenLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <CircularProgress />
    </div>
  )
}
