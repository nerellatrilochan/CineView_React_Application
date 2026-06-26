import styled from 'styled-components'

export const StyledHero = styled.section`
  position: relative;
  min-height: 24rem;
  display: flex;
  align-items: flex-end;
  padding: 2rem 1.5rem;
  background-color: #020617;
  overflow: hidden;

  @media (min-width: 768px) {
    min-height: 28rem;
    padding: 3rem 2rem;
  }
`

export const StyledBackdrop = styled.div<{ $imageUrl: string | null }>`
  position: absolute;
  inset: 0;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center top;
`

export const StyledBackdropOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #020617 10%, rgba(2, 6, 23, 0.4) 60%, rgba(2, 6, 23, 0.2));
`

export const StyledContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 40rem;
`

export const StyledTitle = styled.h2`
  margin: 0 0 0.75rem;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  color: #f8fafc;
`

export const StyledOverview = styled.p`
  margin: 0 0 1rem;
  color: #cbd5e1;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`

export const StyledTrailerButton = styled.button`
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #0284c7;
  color: #f8fafc;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0369a1;
  }
`