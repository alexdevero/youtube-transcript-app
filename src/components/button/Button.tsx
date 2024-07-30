import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

type Props = {
  disabled?: boolean
} & HTMLAttributes<HTMLButtonElement>

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  disabled,
  ...props
}) => (
  <button
    className={`bg-blue-500 text-sm text-white px-4 py-2 rounded ${className}${disabled ? ' opacity-50 cursor-not-allowed' : ''}`}
    {...props}
    disabled={disabled}
  >
    {children}
  </button>
)
