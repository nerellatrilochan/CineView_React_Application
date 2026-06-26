import { Component, type ErrorInfo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledErrorContainer } from './StyledComponents'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

const ErrorFallback = () => {
  const { t } = useTranslation('common')

  return (
    <StyledErrorContainer>
      <h2>{t('errorBoundaryTitle')}</h2>
      <p>{t('errorBoundaryDescription')}</p>
    </StyledErrorContainer>
  )
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }

    return this.props.children
  }
}