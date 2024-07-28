import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

type Props = {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<Props> = ({ className, ...props }) => (
  <input
    className={`px-3 py-2 rounded-[4px] text-sm min-w-72 ${className}`}
    {...props}
  />
)
