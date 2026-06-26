import { StyledPage, StyledSubtitle, StyledTitle } from './StyledComponents'

interface PlaceholderPageProps {
  title: string
  description?: string
}

export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <StyledPage>
    <StyledTitle>{title}</StyledTitle>
    {description && <StyledSubtitle>{description}</StyledSubtitle>}
  </StyledPage>
)