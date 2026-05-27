import {
  FormControl,
  FormLabel,
  TextField,
  type TextFieldProps,
} from '@mui/material'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

type InputTextProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'error' | 'helperText'
> & {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
}

export function InputText<TFieldValues extends FieldValues>({
  control,
  fullWidth,
  label,
  name,
  ...props
}: InputTextProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth={fullWidth}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <TextField
            {...props}
            {...field}
            color={fieldState.error ? 'error' : 'primary'}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            id={name}
            fullWidth={fullWidth}
            variant="outlined"
          />
        </FormControl>
      )}
    />
  )
}
