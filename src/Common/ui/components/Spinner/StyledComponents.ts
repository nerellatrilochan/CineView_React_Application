import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const StyledSpinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 3px solid #334155;
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`