import { useTranslation } from 'react-i18next'
import { ErrorBoundary, formatLocaleDate, PosterImage, SectionState } from '@/Common'
import type { AsyncStatus, Episode } from '@/Common'
import { LANGUAGE_TO_INTL, usePreferencesSnapshot } from '@/Preferences'
import {
  StyledEpisodeCard,
  StyledEpisodeHeader,
  StyledEpisodeList,
  StyledEpisodeMeta,
  StyledEpisodeOverview,
  StyledEpisodeTitle,
  StyledHeading,
  StyledNotFoundText,
  StyledSection,
  StyledCheckbox,
} from './StyledComponents'

interface EpisodeListProps {
  seasonName: string
  episodes: Episode[]
  status: AsyncStatus
  error?: string | null
  isNotFound?: boolean
}

const EpisodeListContent = ({
  seasonName,
  episodes,
  status,
  error,
  isNotFound,
}: EpisodeListProps) => {
  const { t } = useTranslation(['tvShows', 'common'])
  const { language } = usePreferencesSnapshot()
  const locale = LANGUAGE_TO_INTL[language]

  if (isNotFound) {
    return (
      <StyledSection>
        <StyledHeading>{seasonName}</StyledHeading>
        <StyledNotFoundText>{t('tvShows:seasons.notFound')}</StyledNotFoundText>
      </StyledSection>
    )
  }

  return (
    <StyledSection aria-label={t('tvShows:episodes.ariaLabel', { seasonName })}>
      <StyledHeading>{seasonName}</StyledHeading>
      <SectionState
        status={status}
        error={error}
        isEmpty={episodes.length === 0}
        emptyMessage={t('tvShows:episodes.empty')}
      >
        <StyledEpisodeList>
          {episodes.map((episode) => (
            <StyledEpisodeCard key={episode.id}>
              <PosterImage
                path={episode.still_path}
                alt={episode.name}
                aspectRatio="16 / 9"
              />
              <div>
                <StyledEpisodeHeader>
                  <StyledCheckbox
                    type="checkbox"
                    disabled
                    aria-label={t('common:markEpisodeWatchedSoon', {
                      number: episode.episode_number,
                    })}
                    title={t('common:episodeTrackingSoon')}
                  />
                  <div>
                    <StyledEpisodeTitle>
                      {episode.episode_number}. {episode.name}
                    </StyledEpisodeTitle>
                    <StyledEpisodeMeta>
                      {formatLocaleDate(episode.air_date, locale) || t('common:tba')}
                      {episode.runtime
                        ? ` · ${t('common:runtimeMinutes', { count: episode.runtime })}`
                        : ''}
                      {` · ★ ${episode.vote_average.toFixed(1)}`}
                    </StyledEpisodeMeta>
                  </div>
                </StyledEpisodeHeader>
                <StyledEpisodeOverview>{episode.overview}</StyledEpisodeOverview>
              </div>
            </StyledEpisodeCard>
          ))}
        </StyledEpisodeList>
      </SectionState>
    </StyledSection>
  )
}

export const EpisodeList = (props: EpisodeListProps) => (
  <ErrorBoundary>
    <EpisodeListContent {...props} />
  </ErrorBoundary>
)