import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Box, Button, Typography } from '@mui/material'

type ContactsHeaderProps = {
  onNew: () => void
}

export function ContactsHeader({ onNew }: ContactsHeaderProps) {
  return (
    <Box
      sx={{
        alignItems: { xs: 'flex-start', sm: 'center' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        justifyContent: 'space-between',
      }}
    >
      <Typography component="h2" variant="h4">
        Contatos
      </Typography>

      <Button
        startIcon={<AddRoundedIcon />}
        variant="contained"
        onClick={onNew}
      >
        Novo contato
      </Button>
    </Box>
  )
}
