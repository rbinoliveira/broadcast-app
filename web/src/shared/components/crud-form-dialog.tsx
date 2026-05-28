import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import type { FormEventHandler, ReactNode } from 'react'

type CrudFormDialogProps = {
  cancelLabel?: string
  children: ReactNode
  description?: string
  icon?: ReactNode
  isSubmitting?: boolean
  maxWidth?: DialogProps['maxWidth']
  onClose: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  open: boolean
  submitLabel?: string
  submittingLabel?: string
  title: string
}

export function CrudFormDialog({
  cancelLabel = 'Cancelar',
  children,
  description,
  icon,
  isSubmitting = false,
  maxWidth = 'sm',
  onClose,
  onSubmit,
  open,
  submitLabel = 'Salvar',
  submittingLabel = 'Salvando...',
  title,
}: CrudFormDialogProps) {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      onClose={onClose}
      open={open}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(0, 0, 0, 0.68)',
          },
        },
        paper: {
          sx: (theme) => ({
            backgroundImage: 'none',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1.5,
            boxShadow: (theme.vars || theme).palette.baseShadow,
            overflow: 'hidden',
            ...theme.applyStyles('dark', {
              bgcolor: 'hsl(220, 28%, 8%)',
              borderColor: alpha(theme.palette.common.white, 0.12),
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.65)',
            }),
          }),
        },
      }}
    >
      <Stack component="form" noValidate onSubmit={onSubmit}>
        <DialogTitle
          component="div"
          sx={{
            alignItems: 'flex-start',
            borderColor: 'primary.main',
            borderTop: '3px solid',
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
            p: 3,
            pb: 2,
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ minWidth: 0 }}>
            {icon ? (
              <Box
                sx={(theme) => ({
                  alignItems: 'center',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.22),
                  borderRadius: 1,
                  color: 'primary.main',
                  display: 'flex',
                  flexShrink: 0,
                  height: 38,
                  justifyContent: 'center',
                  mt: 0.25,
                  width: 38,
                  ...theme.applyStyles('dark', {
                    bgcolor: alpha(theme.palette.primary.main, 0.14),
                    borderColor: alpha(theme.palette.primary.main, 0.28),
                  }),
                })}
              >
                {icon}
              </Box>
            ) : null}

            <Stack spacing={0.5} sx={{ minWidth: 0 }}>
              <Typography component="h2" variant="h6">
                {title}
              </Typography>
              {description ? (
                <Typography color="text.secondary" variant="body2">
                  {description}
                </Typography>
              ) : null}
            </Stack>
          </Stack>

          <IconButton
            aria-label="Fechar"
            disabled={isSubmitting}
            onClick={onClose}
            size="small"
            sx={{ flexShrink: 0, mt: 0.25 }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Stack spacing={2}>{children}</Stack>
        </DialogContent>

        <DialogActions
          sx={{
            borderColor: 'divider',
            borderTop: '1px solid',
            gap: 1,
            px: 3,
            py: 2,
          }}
        >
          <Button disabled={isSubmitting} onClick={onClose} variant="outlined">
            {cancelLabel}
          </Button>
          <Button
            disabled={isSubmitting}
            sx={{ minWidth: 120 }}
            type="submit"
            variant="contained"
          >
            {isSubmitting ? (
              <>
                <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
                {submittingLabel}
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  )
}
