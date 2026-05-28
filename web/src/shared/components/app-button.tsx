import {
  Button,
  type ButtonProps,
  CircularProgress,
  IconButton,
  type IconButtonProps,
} from '@mui/material'
import { forwardRef, type MouseEvent } from 'react'

const SPINNER_SIZE = 18

type LoadingProps = {
  isLoading?: boolean
}

type AppButtonProps =
  | ({ iconOnly?: false } & LoadingProps & ButtonProps)
  | ({ iconOnly: true } & LoadingProps & IconButtonProps)

function classes(...values: (string | false | undefined)[]) {
  return values.filter(Boolean).join(' ')
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(props, ref) {
    if (props.iconOnly) {
      const {
        iconOnly: _iconOnly,
        isLoading = false,
        children,
        ...rest
      } = props

      return (
        <IconButton
          ref={ref}
          {...rest}
          aria-busy={isLoading}
          disabled={rest.disabled || isLoading}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={SPINNER_SIZE} />
          ) : (
            children
          )}
        </IconButton>
      )
    }

    const {
      iconOnly: _iconOnly,
      isLoading = false,
      children,
      className,
      onClick,
      startIcon,
      ...rest
    } = props

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
      if (isLoading) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    return (
      <Button
        ref={ref}
        {...rest}
        aria-busy={isLoading}
        aria-disabled={isLoading || undefined}
        className={classes(isLoading && 'pointer-events-none', className)}
        onClick={handleClick}
        startIcon={isLoading ? undefined : startIcon}
      >
        {isLoading ? (
          <>
            <CircularProgress
              color="inherit"
              size={SPINNER_SIZE}
              className="mr-2"
            />
            {children}
          </>
        ) : (
          children
        )}
      </Button>
    )
  },
)
