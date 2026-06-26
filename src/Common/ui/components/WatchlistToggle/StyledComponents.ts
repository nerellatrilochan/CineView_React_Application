import styled from 'styled-components'

export const StyledWatchlistButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid #334155;
  border-radius: 9999px;
  background-color: rgba(15, 23, 42, 0.85);
  color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.7;

  &:hover {
    color: #e2e8f0;
  }
`