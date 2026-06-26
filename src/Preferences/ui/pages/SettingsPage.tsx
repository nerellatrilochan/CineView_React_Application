import { SettingsForm } from '../components/SettingsForm'
import { useSettingsController } from '../controllers/useSettingsController'

export const SettingsPage = () => {
  const {
    language,
    theme,
    region,
    setLanguage,
    setRegion,
    toggleTheme,
    handleLogout,
  } = useSettingsController()

  return (
    <SettingsForm
      language={language}
      theme={theme}
      region={region}
      onLanguageChange={setLanguage}
      onRegionChange={setRegion}
      onToggleTheme={toggleTheme}
      onLogout={handleLogout}
    />
  )
}