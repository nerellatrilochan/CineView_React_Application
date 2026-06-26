import styled from 'styled-components'

export const StyledFilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0 1.5rem 1rem;
`

export const StyledChip = styled.button<{ $isActive: boolean }>`
  flex-shrink: 0;
  padding: 0.5rem 0.875rem;
  border-radius: 9999px;
  border: 1px solid ${({ $isActive }) => ($isActive ? '#38bdf8' : '#334155')};
  background-color: ${({ $isActive }) => ($isActive ? '#0c4a6e' : '#1e293b')};
  color: ${({ $isActive }) => ($isActive ? '#e0f2fe' : '#cbd5e1')};
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    border-color: #38bdf8;
  }
`