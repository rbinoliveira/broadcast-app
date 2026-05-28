import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { ButtonBase, Card, Stack, Typography } from '@mui/material'

type AddConnectionCardProps = {
  onClick: () => void
}

export function AddConnectionCard({ onClick }: AddConnectionCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{ minHeight: 150, borderStyle: 'dashed', bgcolor: 'transparent' }}
    >
      <ButtonBase
        aria-label="Nova conexão"
        onClick={onClick}
        sx={{
          width: '100%',
          height: '100%',
          minHeight: 150,
          color: 'text.secondary',
          transition: 'color 0.2s, background-color 0.2s',
          '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
        }}
      >
        <Stack spacing={1} sx={{ alignItems: 'center' }}>
          <AddRoundedIcon />
          <Typography sx={{ fontWeight: 600 }} variant="body2">
            Nova conexão
          </Typography>
        </Stack>
      </ButtonBase>
    </Card>
  )
}
