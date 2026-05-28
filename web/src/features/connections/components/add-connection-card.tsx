import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { ButtonBase, Card, Typography } from '@mui/material'

type AddConnectionCardProps = {
  onClick: () => void
}

export function AddConnectionCard({ onClick }: AddConnectionCardProps) {
  return (
    <Card
      variant="outlined"
      className="min-h-[150px] border-dashed bg-transparent"
    >
      <ButtonBase
        aria-label="Nova conexão"
        onClick={onClick}
        className="h-full min-h-[150px] w-full text-muted transition-colors duration-200 hover:bg-hover hover:text-brand"
      >
        <div className="flex flex-col items-center gap-2">
          <AddRoundedIcon />
          <Typography className="font-semibold" variant="body2">
            Nova conexão
          </Typography>
        </div>
      </ButtonBase>
    </Card>
  )
}
