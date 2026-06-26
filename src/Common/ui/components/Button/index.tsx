import type { ReactNode } from 'react'
import { StyledButton } from './StyledComponents'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  onClick?: () => void
}

export const Button = ({
  children,
  type = 'button',
  isLoading = false,
  onClick,
}: ButtonProps) => (
  <StyledButton type={type} disabled={isLoading} onClick={onClick}>
    {isLoading ? 'Please wait…' : children}
  </StyledButton>
)