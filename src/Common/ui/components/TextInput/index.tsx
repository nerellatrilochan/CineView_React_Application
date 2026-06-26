import { StyledError, StyledField, StyledInput, StyledLabel } from './StyledComponents'

interface TextInputProps {
  id: string
  label: string
  value: string
  type?: string
  error?: string
  autoComplete?: string
  onChange: (value: string) => void
}

export const TextInput = ({
  id,
  label,
  value,
  type = 'text',
  error,
  autoComplete,
  onChange,
}: TextInputProps) => (
  <StyledField>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
    <StyledInput
      id={id}
      type={type}
      value={value}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      onChange={(event) => onChange(event.target.value)}
    />
    {error && (
      <StyledError id={`${id}-error`} role="alert">
        {error}
      </StyledError>
    )}
  </StyledField>
)