import styled from 'styled-components'

export const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
  text-align: left;
`

export const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0;
`

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  background-color: #0f172a;
  color: #f8fafc;
  font-size: 0.875rem;

  &:focus {
    outline: 2px solid #38bdf8;
    outline-offset: 1px;
  }

  &[aria-invalid='true'] {
    border-color: #f87171;
  }
`

export const StyledError = styled.span`
  font-size: 0.75rem;
  color: #fca5a5;
`