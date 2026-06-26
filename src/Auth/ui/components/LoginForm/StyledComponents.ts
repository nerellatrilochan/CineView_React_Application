import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 24rem;
`

export const StyledCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
`

export const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 0.5rem;
`

export const StyledSubtitle = styled.p`
  color: #94a3b8;
  margin: 0 0 2rem;
  text-align: center;
`

export const StyledAuthError = styled.p`
  width: 100%;
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: #450a0a;
  color: #fecaca;
  font-size: 0.875rem;
  text-align: center;
`

export const StyledPasswordField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
`

export const StyledPasswordInputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  width: 100%;
`

export const StyledToggleButton = styled.button`
  flex-shrink: 0;
  height: 2.75rem;
  padding: 0 0.875rem;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  background-color: #1e293b;
  color: #e2e8f0;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #334155;
  }
`