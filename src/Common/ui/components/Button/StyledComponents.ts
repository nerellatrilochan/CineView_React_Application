import styled from 'styled-components'

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #0284c7;
  color: #f8fafc;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #0369a1;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`