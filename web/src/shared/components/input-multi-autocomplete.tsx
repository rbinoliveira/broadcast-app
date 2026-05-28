import {
  Autocomplete,
  FormControl,
  FormLabel,
  Paper,
  type PaperProps,
  TextField,
  type TextFieldProps,
} from '@mui/material'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

type InputMultiAutocompleteOption = {
  id: string
}

function AutocompletePaper({ className, ...props }: PaperProps) {
  return (
    <Paper
      {...props}
      elevation={8}
      className={[
        'mt-1.5 overflow-hidden border border-divider bg-surface dark:border-white/12 dark:bg-surface-raised',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

type InputMultiAutocompleteProps<
  TFieldValues extends FieldValues,
  TOption extends InputMultiAutocompleteOption,
> = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'error' | 'helperText'
> & {
  control: Control<TFieldValues>
  getOptionLabel: (option: TOption) => string
  isOptionEqualToValue?: (option: TOption, value: TOption) => boolean
  label?: string
  name: Path<TFieldValues>
  options: TOption[]
}

export function InputMultiAutocomplete<
  TFieldValues extends FieldValues,
  TOption extends InputMultiAutocompleteOption,
>({
  control,
  fullWidth,
  getOptionLabel,
  isOptionEqualToValue = (option, value) => option.id === value.id,
  label,
  name,
  options,
  placeholder,
  ...props
}: InputMultiAutocompleteProps<TFieldValues, TOption>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedIds = (
          Array.isArray(field.value) ? field.value : []
        ) as string[]
        const selectedOptions = options.filter((option) =>
          selectedIds.includes(option.id),
        )

        return (
          <FormControl fullWidth={fullWidth}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Autocomplete
              disableCloseOnSelect
              filterSelectedOptions
              fullWidth={fullWidth}
              getOptionLabel={getOptionLabel}
              isOptionEqualToValue={isOptionEqualToValue}
              multiple
              noOptionsText="Nenhum item encontrado"
              onChange={(_, nextValue) => {
                field.onChange(nextValue.map((option) => option.id))
              }}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...props}
                  color={fieldState.error ? 'error' : 'primary'}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  id={name}
                  placeholder={selectedOptions.length ? undefined : placeholder}
                  variant="outlined"
                />
              )}
              slots={{ paper: AutocompletePaper }}
              slotProps={{
                chip: { size: 'small', className: 'm-0 max-w-full' },
                listbox: {
                  className:
                    'py-1 [&_.MuiAutocomplete-option]:mx-1 [&_.MuiAutocomplete-option]:my-0.5 [&_.MuiAutocomplete-option]:rounded-md',
                },
              }}
              className="[&_.MuiAutocomplete-input]:min-w-[5ch] [&_.MuiAutocomplete-input]:py-0! [&_.MuiOutlinedInput-root]:h-auto! [&_.MuiOutlinedInput-root]:min-h-10 [&_.MuiOutlinedInput-root]:flex-wrap [&_.MuiOutlinedInput-root]:content-center [&_.MuiOutlinedInput-root]:items-center [&_.MuiOutlinedInput-root]:gap-1.5 [&_.MuiOutlinedInput-root]:py-1.5"
              value={selectedOptions}
            />
          </FormControl>
        )
      }}
    />
  )
}
