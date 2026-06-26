import { useTranslation } from 'react-i18next'
import {
  ErrorBoundary,
  getProfileUrl,
  HorizontalScrollRow,
  PosterImage,
  SectionState,
} from '@/Common'
import type { AsyncStatus, CastMember } from '@/Common'
import {
  StyledCastCard,
  StyledCastName,
  StyledCharacter,
  StyledHeading,
  StyledSection,
} from './StyledComponents'

interface CastCarouselProps {
  cast: CastMember[]
  status: AsyncStatus
  error?: string | null
}

const CastCarouselContent = ({ cast, status, error }: CastCarouselProps) => {
  const { t } = useTranslation('movies')

  return (
    <StyledSection aria-label={t('cast.ariaLabel')}>
      <StyledHeading>{t('cast.title')}</StyledHeading>
      <SectionState status={status} error={error} isEmpty={cast.length === 0}>
        <HorizontalScrollRow>
          {cast.map((member) => (
            <StyledCastCard key={member.id}>
              <PosterImage
                path={getProfileUrl(member.profile_path)}
                alt={member.name}
                aspectRatio="2 / 3"
              />
              <StyledCastName>{member.name}</StyledCastName>
              <StyledCharacter>{member.character}</StyledCharacter>
            </StyledCastCard>
          ))}
        </HorizontalScrollRow>
      </SectionState>
    </StyledSection>
  )
}

export const CastCarousel = (props: CastCarouselProps) => (
  <ErrorBoundary>
    <CastCarouselContent {...props} />
  </ErrorBoundary>
)