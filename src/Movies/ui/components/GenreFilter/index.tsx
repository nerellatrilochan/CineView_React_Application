import { useTranslation } from 'react-i18next'
import type { Genre } from '@/Common'
import { StyledChip, StyledFilterBar } from './StyledComponents'

interface GenreFilterProps {
  genres: Genre[]
  activeGenreId: number | null
  onSelect: (genreId: number | null) => void
}

export const GenreFilter = ({
  genres,
  activeGenreId,
  onSelect,
}: GenreFilterProps) => {
  const { t } = useTranslation('movies')

  return (
    <StyledFilterBar aria-label={t('genreFilter.ariaLabel')}>
      <StyledChip
        type="button"
        $isActive={activeGenreId === null}
        onClick={() => onSelect(null)}
      >
        {t('genreFilter.all')}
      </StyledChip>
      {genres.map((genre) => (
        <StyledChip
          key={genre.id}
          type="button"
          $isActive={activeGenreId === genre.id}
          onClick={() => onSelect(genre.id)}
        >
          {genre.name}
        </StyledChip>
      ))}
    </StyledFilterBar>
  )
}