import { useTranslation } from 'react-i18next'
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_REGIONS,
} from '../../../core/constants/Preferences.constants'
import type { AppLanguage, AppRegion, AppTheme } from '../../../core/types/Preferences.types'
import {
  StyledDescription,
  StyledLabel,
  StyledLogoutButton,
  StyledPage,
  StyledSection,
  StyledSelect,
  StyledSubtitle,
  StyledThemeToggle,
  StyledTitle,
} from './StyledComponents'

interface SettingsFormProps {
  language: AppLanguage
  theme: AppTheme
  region: AppRegion
  onLanguageChange: (language: AppLanguage) => void
  onRegionChange: (region: AppRegion) => void
  onToggleTheme: () => void
  onLogout: () => void
}

export const SettingsForm = ({
  language,
  theme,
  region,
  onLanguageChange,
  onRegionChange,
  onToggleTheme,
  onLogout,
}: SettingsFormProps) => {
  const { t } = useTranslation(['preferences', 'common'])

  return (
    <StyledPage>
      <StyledTitle>{t('preferences:title')}</StyledTitle>
      <StyledSubtitle>{t('preferences:subtitle')}</StyledSubtitle>

      <StyledSection>
        <StyledLabel htmlFor="language-select">{t('preferences:language.label')}</StyledLabel>
        <StyledDescription>{t('preferences:language.description')}</StyledDescription>
        <StyledSelect
          id="language-select"
          value={language}
          onChange={(event) => onLanguageChange(event.target.value as AppLanguage)}
        >
          {SUPPORTED_LANGUAGES.map((code) => (
            <option key={code} value={code}>
              {t(`preferences:languages.${code}`)}
            </option>
          ))}
        </StyledSelect>
      </StyledSection>

      <StyledSection>
        <StyledLabel htmlFor="region-select">{t('preferences:region.label')}</StyledLabel>
        <StyledDescription>{t('preferences:region.description')}</StyledDescription>
        <StyledSelect
          id="region-select"
          value={region}
          onChange={(event) => onRegionChange(event.target.value as AppRegion)}
        >
          {SUPPORTED_REGIONS.map((code) => (
            <option key={code} value={code}>
              {t(`preferences:regions.${code}`)}
            </option>
          ))}
        </StyledSelect>
      </StyledSection>

      <StyledSection>
        <StyledLabel>{t('preferences:theme.label')}</StyledLabel>
        <StyledDescription>{t('preferences:theme.description')}</StyledDescription>
        <StyledThemeToggle
          type="button"
          aria-label={
            theme === 'dark'
              ? t('preferences:theme.toggleToLight')
              : t('preferences:theme.toggleToDark')
          }
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? t('preferences:theme.light') : t('preferences:theme.dark')}
        </StyledThemeToggle>
      </StyledSection>

      <StyledSection>
        <StyledLabel>{t('preferences:logout.label')}</StyledLabel>
        <StyledDescription>{t('preferences:logout.description')}</StyledDescription>
        <StyledLogoutButton type="button" onClick={onLogout}>
          {t('preferences:logout.action')}
        </StyledLogoutButton>
      </StyledSection>
    </StyledPage>
  )
}