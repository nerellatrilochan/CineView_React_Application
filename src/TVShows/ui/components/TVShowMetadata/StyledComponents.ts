import styled from 'styled-components'

export const StyledMetadata = styled.section`
  padding: 1.5rem;
  color: var(--cv-text-secondary);
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
  color: var(--cv-text-primary);
`

export const StyledMetaList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 0;
  list-style: none;
  color: var(--cv-text-muted);
  font-size: 0.875rem;
`

export const StyledOverview = styled.p`
  margin: 0;
  line-height: 1.6;
  color: var(--cv-text-secondary);
  max-width: 48rem;
`

export const StyledTrailerButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--cv-accent);
  color: var(--cv-text-primary);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--cv-accent-hover);
  }
`