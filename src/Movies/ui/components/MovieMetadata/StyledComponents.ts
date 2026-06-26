import styled from 'styled-components'

export const StyledMetadata = styled.section`
  padding: 1.5rem;
  color: #e2e8f0;
`

export const StyledTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`

export const StyledTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: #f8fafc;
`

export const StyledMetaList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 0;
  list-style: none;
  color: #94a3b8;
  font-size: 0.875rem;
`

export const StyledOverview = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #cbd5e1;
  max-width: 48rem;
`

export const StyledTagline = styled.p`
  margin: 0 0 0.75rem;
  font-style: italic;
  color: #94a3b8;
`