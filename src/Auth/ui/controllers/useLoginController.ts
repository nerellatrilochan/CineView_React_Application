import { useState, type SubmitEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '@/Common'
import { REDIRECT_QUERY_PARAM } from '../../core/constants/Auth.constants'
import { loginFormSchema } from '../../core/types/index.zod'
import type { LoginFieldErrors, LoginCredentials } from '../../core/types/Auth.types'
import { useAuthController } from './useAuthController'

const getFieldErrors = (
  credentials: LoginCredentials,
  translate: (key: string) => string,
): LoginFieldErrors => {
  const result = loginFormSchema.safeParse(credentials)
  if (result.success) return {}

  const fieldErrors: LoginFieldErrors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (field === 'username' || field === 'password') {
      fieldErrors[field] = translate(`auth:validation.${issue.message}`)
    }
  }
  return fieldErrors
}

export const useLoginController = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuthController()

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  })
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({})
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const updateField = (field: keyof LoginCredentials, value: string) => {
    setCredentials((previous) => ({ ...previous, [field]: value }))
    setFieldErrors((previous) => ({ ...previous, [field]: undefined }))
    setAuthError(null)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((previous) => !previous)
  }

  const submitLogin: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const validationErrors = getFieldErrors(credentials, t)
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    setAuthError(null)
    const isValid = await login(credentials)
    setIsSubmitting(false)
    if (!isValid) {
      setAuthError(t('auth:login.invalidCredentials'))
      return
    }
    const redirectPath = searchParams.get(REDIRECT_QUERY_PARAM) || ROUTES.HOME
    navigate(redirectPath, { replace: true })
  }

  return {
    credentials,
    fieldErrors,
    authError,
    isSubmitting,
    isPasswordVisible,
    updateField,
    togglePasswordVisibility,
    submitLogin,
  }
}