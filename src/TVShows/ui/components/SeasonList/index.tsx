import { buildSeasonDetailPath } from '@/Common'
import type { SeasonSummary } from '@/Common'
import {
  StyledHeading,
  StyledSection,
  StyledSeasonLink,
  StyledSeasonTabs,
} from './StyledComponents'

interface SeasonListProps {
  showId: number
  seasons: SeasonSummary[]
}

export const SeasonList = ({ showId, seasons }: SeasonListProps) => (
  <StyledSection aria-label="Seasons">
    <StyledHeading>Seasons</StyledHeading>
    <StyledSeasonTabs>
      {seasons.map((season) => (
        <StyledSeasonLink
          key={season.id}
          to={buildSeasonDetailPath(showId, season.season_number)}
        >
          {season.name}
        </StyledSeasonLink>
      ))}
    </StyledSeasonTabs>
  </StyledSection>
)