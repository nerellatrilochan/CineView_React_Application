import { PosterImage } from '@/Common'
import type { PersonSummary } from '@/Common'
import { StyledCard, StyledDepartment, StyledName } from './StyledComponents'

interface PersonCardProps {
  person: PersonSummary
}

export const PersonCard = ({ person }: PersonCardProps) => (
  <StyledCard>
    <PosterImage path={person.profile_path} alt={person.name} aspectRatio="2 / 3" />
    <StyledName>{person.name}</StyledName>
    {person.known_for_department && (
      <StyledDepartment>{person.known_for_department}</StyledDepartment>
    )}
  </StyledCard>
)