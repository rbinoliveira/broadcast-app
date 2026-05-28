import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import {
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
  Typography,
} from '@mui/material'
import type { FormEventHandler, ReactNode } from 'react'

import { AppButton } from '@/shared/components/app-button'

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
          className: 'bg-black/68 backdrop-blur-[2px]',
        },
        paper: {
          elevation: 0,
          className:
            'overflow-hidden rounded-xl border border-white/12 bg-surface shadow-overlay',
        },
      }}
    >
      <form className="flex flex-col" noValidate onSubmit={onSubmit}>
        <DialogTitle
          component="div"
          className="flex items-start justify-between gap-4 border-t-[3px] border-brand p-6 pb-4"
        >
          <div className="flex min-w-0 flex-row gap-3">
            {icon ? (
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/15 text-brand">
                {icon}
              </div>
            ) : null}

            <div className="flex min-w-0 flex-col gap-1">
              <Typography component="h2" variant="h6">
                {title}
              </Typography>
              {description ? (
                <Typography color="text.secondary" variant="body2">
                  {description}
                </Typography>
              ) : null}
            </div>
          </div>

          <AppButton
            iconOnly
            aria-label="Fechar"
            disabled={isSubmitting}
            onClick={onClose}
            size="small"
            className="mt-0.5 shrink-0"
          >
            <CloseRoundedIcon fontSize="small" />
          </AppButton>
        </DialogTitle>

        <DialogContent className="px-6 py-4">
          <div className="flex flex-col gap-4">{children}</div>
        </DialogContent>

        <DialogActions className="gap-2 border-t border-divider px-6 py-4">
          <AppButton
            disabled={isSubmitting}
            onClick={onClose}
            className="min-w-30"
            variant="outlined"
          >
            {cancelLabel}
          </AppButton>
          <AppButton
            isLoading={isSubmitting}
            className="min-w-30"
            type="submit"
            variant="contained"
          >
            {submitLabel}
          </AppButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}
