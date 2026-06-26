import styled from 'styled-components'

export const StyledPosterWrapper = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--cv-bg-secondary);
`

export const StyledPosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const StyledPosterFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cv-text-placeholder);
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem;
`