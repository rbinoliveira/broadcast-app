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

type InputMaskedTextProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'error' | 'helperText'
> & {
  control: Control<TFieldValues>
  mask: (value: string) => string
  name: Path<TFieldValues>
}

export function InputMaskedText<TFieldValues extends FieldValues>({
  control,
  fullWidth,
  label,
  mask,
  name,
  ...props
}: InputMaskedTextProps<TFieldValues>) {
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
            fullWidth={fullWidth}
            helperText={fieldState.error?.message}
            id={name}
            onChange={(event) => field.onChange(mask(event.target.value))}
            value={mask(String(field.value ?? ''))}
            variant="outlined"
          />
        </FormControl>
      )}
    />
  )
}
