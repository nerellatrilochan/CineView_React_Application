import styled from 'styled-components'

export const StyledScrollRow = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;

  & > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #334155;
    border-radius: 9999px;
  }
`