import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Typography } from '@mui/material'

import { AppButton } from '@/shared/components/app-button'

type ContactsHeaderProps = {
  onNew: () => void
}

export function ContactsHeader({ onNew }: ContactsHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <Typography component="h1" variant="h4">
        Contatos
      </Typography>

      <AppButton
        startIcon={<AddRoundedIcon />}
        variant="contained"
        onClick={onNew}
      >
        Novo contato
      </AppButton>
    </div>
  )
}
