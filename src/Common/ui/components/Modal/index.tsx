import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { StyledCloseButton, StyledDialog, StyledOverlay } from './StyledComponents'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  ariaLabel: string
}

export const Modal = ({ isOpen, onClose, children, ariaLabel }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <StyledOverlay role="presentation" onClick={onClose}>
      <StyledDialog
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(event) => event.stopPropagation()}
      >
        <StyledCloseButton type="button" aria-label="Close" onClick={onClose}>
          ×
        </StyledCloseButton>
        {children}
      </StyledDialog>
    </StyledOverlay>,
    document.body,
  )
}