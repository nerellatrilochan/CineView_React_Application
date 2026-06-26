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
    if (searches.length === 0) return null
  
    return (
      <StyledSection aria-label="Recent searches">
        <StyledHeader>
          <StyledHeading>Recent Searches</StyledHeading>
          <StyledClearButton type="button" onClick={onClear}>
            Clear
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