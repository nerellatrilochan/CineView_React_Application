import { useTranslation } from 'react-i18next'
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

export const SeasonList = ({ showId, seasons }: SeasonListProps) => {
  const { t } = useTranslation('tvShows')

  return (
    <StyledSection aria-label={t('seasons.ariaLabel')}>
      <StyledHeading>{t('seasons.title')}</StyledHeading>
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
}