import type { ReactNode } from 'react'
import { StyledScrollRow } from './StyledComponents'

interface HorizontalScrollRowProps {
  children: ReactNode
}

export const HorizontalScrollRow = ({ children }: HorizontalScrollRowProps) => (
  <StyledScrollRow>{children}</StyledScrollRow>
)