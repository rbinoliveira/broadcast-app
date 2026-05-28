import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Breadcrumbs,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'

type PageHeaderProps = {
  breadcrumbs: string[]
  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
}

export function PageHeader({
  breadcrumbs,
  search,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
}: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextRoundedIcon fontSize="small" />}
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <Typography
              key={crumb}
              sx={{
                color: isLast ? 'text.primary' : 'text.secondary',
                fontWeight: isLast ? 600 : 400,
              }}
              variant="body1"
            >
              {crumb}
            </Typography>
          )
        })}
      </Breadcrumbs>

      <FormControl
        sx={{ width: { xs: '100%', sm: '28ch' } }}
        variant="outlined"
      >
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
    </Stack>
  )
}
