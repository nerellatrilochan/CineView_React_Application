import styled from 'styled-components'

export const StyledSection = styled.section`
  padding: 1rem 1.5rem 2rem;
`

export const StyledHeading = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: var(--cv-text-primary);
`

export const StyledNotFoundText = styled.p`
  margin: 0;
  color: var(--cv-text-muted);
`

export const StyledEpisodeList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StyledEpisodeCard = styled.li`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--cv-border);
  border-radius: 0.75rem;
  background-color: var(--cv-bg-secondary);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

export const StyledEpisodeHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`

export const StyledEpisodeTitle = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--cv-text-primary);
`

export const StyledEpisodeMeta = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.8125rem;
  color: var(--cv-text-muted);
`

export const StyledEpisodeOverview = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--cv-text-secondary);
`

export const StyledCheckbox = styled.input`
  margin-top: 0.25rem;
  width: 1rem;
  height: 1rem;
  cursor: not-allowed;
  opacity: 0.6;
`