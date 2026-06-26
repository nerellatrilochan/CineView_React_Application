import styled from 'styled-components'

export const StyledSection = styled.section`
  padding: 1rem 1.5rem;
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

export const StyledHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
  color: #f8fafc;
`

export const StyledClearButton = styled.button`
  border: none;
  background: none;
  color: #38bdf8;
  cursor: pointer;
  font-size: 0.875rem;
`

export const StyledChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const StyledChip = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid #334155;
  background-color: #1e293b;
  color: #e2e8f0;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    border-color: #38bdf8;
  }
`