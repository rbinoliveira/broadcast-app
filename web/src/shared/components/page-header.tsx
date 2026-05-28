import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Breadcrumbs,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material'

type PageHeaderProps = {
  breadcrumbs: string[]
  search?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
}

export function PageHeader({
  breadcrumbs,
  search,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
}: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextRoundedIcon fontSize="small" />}
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <Typography
              key={crumb}
              className={
                isLast
                  ? 'font-semibold text-foreground'
                  : 'font-normal text-muted'
              }
              variant="body1"
            >
              {crumb}
            </Typography>
          )
        })}
      </Breadcrumbs>

      {onSearchChange ? (
        <FormControl className="w-full sm:w-[34ch]" variant="outlined">
          <OutlinedInput
            inputProps={{ 'aria-label': 'buscar' }}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            }
            value={search}
          />
        </FormControl>
      ) : null}
    </div>
  )
}
