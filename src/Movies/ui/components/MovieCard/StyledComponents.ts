import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledCard = styled.article`
  position: relative;
  width: 10.5rem;
`

export const StyledCardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`

export const StyledTitle = styled.h3`
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #f8fafc;
  line-height: 1.3;
`

export const StyledRatingWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`

export const StyledWatchlistWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`