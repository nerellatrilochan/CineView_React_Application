import type { SubmitEventHandler } from 'react'
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
}: LoginFormProps) => (
  <StyledCard>
    <StyledTitle>Sign in to CineView</StyledTitle>
    <StyledSubtitle>Browse movies and TV shows tailored for you.</StyledSubtitle>

    <StyledForm onSubmit={onSubmit} noValidate>
      {authError && <StyledAuthError role="alert">{authError}</StyledAuthError>}

      <TextInput
        id="username"
        label="Username"
        value={username}
        error={usernameError}
        autoComplete="username"
        onChange={onUsernameChange}
      />

      <StyledPasswordField>
        <StyledPasswordInputRow>
          <TextInput
            id="password"
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            error={passwordError}
            autoComplete="current-password"
            onChange={onPasswordChange}
          />
          <StyledToggleButton
            type="button"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            onClick={onTogglePasswordVisibility}
          >
            {isPasswordVisible ? 'Hide' : 'Show'}
          </StyledToggleButton>
        </StyledPasswordInputRow>
      </StyledPasswordField>

      <Button type="submit" isLoading={isSubmitting}>
        Sign in
      </Button>
    </StyledForm>
  </StyledCard>
)