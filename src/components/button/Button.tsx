import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

type Props = {} & HTMLAttributes<HTMLButtonElement>

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={`bg-blue-500 text-sm text-white px-4 py-2 rounded ${className}`}
    {...props}
  >
    {children}
  </button>
)
