import { LoginForm } from '../components/LoginForm'
import { useLoginController } from '../controllers/useLoginController'

export const LoginPage = () => {
  const {
    credentials,
    fieldErrors,
    authError,
    isSubmitting,
    isPasswordVisible,
    updateField,
    togglePasswordVisibility,
    submitLogin,
  } = useLoginController()

  return (
    <LoginForm
      username={credentials.username}
      password={credentials.password}
      usernameError={fieldErrors.username}
      passwordError={fieldErrors.password}
      authError={authError}
      isSubmitting={isSubmitting}
      isPasswordVisible={isPasswordVisible}
      onUsernameChange={(value) => updateField('username', value)}
      onPasswordChange={(value) => updateField('password', value)}
      onTogglePasswordVisibility={togglePasswordVisibility}
      onSubmit={submitLogin}
    />
  )
}