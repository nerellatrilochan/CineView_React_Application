import { useTranslation } from 'react-i18next'
import {
  StyledChip,
  StyledChipList,
  StyledClearButton,
  StyledHeader,
  StyledHeading,
  StyledSection,
} from './StyledComponents'

interface RecentSearchesProps {
  searches: string[]
  onSelect: (query: string) => void
  onClear: () => void
}

export const RecentSearches = ({ searches, onSelect, onClear }: RecentSearchesProps) => {
  const { t } = useTranslation('search')

  if (searches.length === 0) return null

  return (
    <StyledSection aria-label={t('recent.ariaLabel')}>
      <StyledHeader>
        <StyledHeading>{t('recent.title')}</StyledHeading>
        <StyledClearButton type="button" onClick={onClear}>
          {t('recent.clear')}
        </StyledClearButton>
      </StyledHeader>
      <StyledChipList>
        {searches.map((search) => (
          <StyledChip key={search} type="button" onClick={() => onSelect(search)}>
            {search}
          </StyledChip>
        ))}
      </StyledChipList>
    </StyledSection>
  )
}