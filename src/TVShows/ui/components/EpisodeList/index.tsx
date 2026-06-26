import { ErrorBoundary, PosterImage, SectionState } from '@/Common'
import type { AsyncStatus, Episode } from '@/Common'
import {
  StyledEpisodeCard,
  StyledEpisodeHeader,
  StyledEpisodeList,
  StyledEpisodeMeta,
  StyledEpisodeOverview,
  StyledEpisodeTitle,
  StyledHeading,
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

const formatAirDate = (date: string): string => {
  if (!date) return 'TBA'
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const EpisodeListContent = ({
  seasonName,
  episodes,
  status,
  error,
  isNotFound,
}: EpisodeListProps) => {
  if (isNotFound) {
    return (
      <StyledSection>
        <StyledHeading>{seasonName}</StyledHeading>
        <p style={{ color: '#94a3b8' }}>Season not found.</p>
      </StyledSection>
    )
  }

  return (
    <StyledSection aria-label={`${seasonName} episodes`}>
      <StyledHeading>{seasonName}</StyledHeading>
      <SectionState
        status={status}
        error={error}
        isEmpty={episodes.length === 0}
        emptyMessage="No episodes available."
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
                    aria-label={`Mark episode ${episode.episode_number} as watched (coming soon)`}
                    title="Episode tracking — coming in Milestone 6"
                  />
                  <div>
                    <StyledEpisodeTitle>
                      {episode.episode_number}. {episode.name}
                    </StyledEpisodeTitle>
                    <StyledEpisodeMeta>
                      {formatAirDate(episode.air_date)}
                      {episode.runtime ? ` · ${episode.runtime} min` : ''}
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