import styled from 'styled-components'

export const StyledRatingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  background-color: color-mix(in srgb, var(--cv-bg-primary) 85%, transparent);
  color: #fbbf24;
  font-size: 0.75rem;
  font-weight: 600;
`