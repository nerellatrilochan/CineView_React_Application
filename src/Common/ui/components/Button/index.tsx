import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
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
}: ButtonProps) => {
  const { t } = useTranslation('common')

  return (
    <StyledButton type={type} disabled={isLoading} onClick={onClick}>
      {isLoading ? t('pleaseWait') : children}
    </StyledButton>
  )
}