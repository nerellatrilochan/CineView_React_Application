import type { SubmitEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, TextInput } from '@/Common'
import {
  StyledAuthError,
  StyledCard,
  StyledForm,
  StyledPasswordField,
  StyledPasswordInputRow,
  StyledSubtitle,
  StyledTitle,
  StyledToggleButton,
} from './StyledComponents'

interface LoginFormProps {
  username: string
  password: string
  usernameError?: string
  passwordError?: string
  authError: string | null
  isSubmitting: boolean
  isPasswordVisible: boolean
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onTogglePasswordVisibility: () => void
  onSubmit: SubmitEventHandler<HTMLFormElement>
}

export const LoginForm = ({
  username,
  password,
  usernameError,
  passwordError,
  authError,
  isSubmitting,
  isPasswordVisible,
  onUsernameChange,
  onPasswordChange,
  onTogglePasswordVisibility,
  onSubmit,
}: LoginFormProps) => {
  const { t } = useTranslation('auth')

  return (
    <StyledCard>
      <StyledTitle>{t('login.title')}</StyledTitle>
      <StyledSubtitle>{t('login.subtitle')}</StyledSubtitle>

      <StyledForm onSubmit={onSubmit} noValidate>
        {authError && <StyledAuthError role="alert">{authError}</StyledAuthError>}

        <TextInput
          id="username"
          label={t('login.username')}
          value={username}
          error={usernameError}
          autoComplete="username"
          onChange={onUsernameChange}
        />

        <StyledPasswordField>
          <StyledPasswordInputRow>
            <TextInput
              id="password"
              label={t('login.password')}
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              error={passwordError}
              autoComplete="current-password"
              onChange={onPasswordChange}
            />
            <StyledToggleButton
              type="button"
              aria-label={
                isPasswordVisible ? t('login.hidePassword') : t('login.showPassword')
              }
              onClick={onTogglePasswordVisibility}
            >
              {isPasswordVisible ? t('login.hide') : t('login.show')}
            </StyledToggleButton>
          </StyledPasswordInputRow>
        </StyledPasswordField>

        <Button type="submit" isLoading={isSubmitting}>
          {t('login.submit')}
        </Button>
      </StyledForm>
    </StyledCard>
  )
}