import { Select, type SelectProps } from '@mui/material'

export function AppSelect<TValue = unknown>({
  className,
  disabled,
  sx,
  ...props
}: SelectProps<TValue>) {
  const cursorClasses = disabled
    ? 'cursor-default [&_.MuiSelect-icon]:cursor-default [&_.MuiSelect-select]:cursor-default [&_input]:cursor-default'
    : 'cursor-pointer [&_.MuiSelect-select]:cursor-pointer'

  return (
    <Select
      disabled={disabled}
      className={[
        'h-10 p-0',
        '[&_.MuiSelect-select]:flex [&_.MuiSelect-select]:min-h-10 [&_.MuiSelect-select]:items-center [&_.MuiSelect-select]:px-3 [&_.MuiSelect-select]:py-0',
        '[&_.MuiSelect-icon]:pointer-events-none',
        cursorClasses,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      sx={[
        {
          p: 0,
          '& .MuiSelect-select': {
            alignItems: 'center',
            boxSizing: 'border-box',
            cursor: disabled ? 'default' : 'pointer',
            display: 'flex',
            height: '100%',
            minHeight: '100%',
            padding: '0 40px 0 12px !important',
            width: '100%',
          },
          '& .MuiSelect-icon': {
            pointerEvents: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  )
}
