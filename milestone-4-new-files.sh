#!/bin/bash

mkdir -p \
src/Preferences/core/types \
src/Preferences/core/constants \
src/Preferences/data/stores/PreferencesStore \
src/Preferences/data/i18n/locales/en \
src/Preferences/data/i18n/locales/es \
src/Preferences/data/hooks \
src/Preferences/ui/controllers \
src/Preferences/ui/components/SettingsForm \
src/Common/core/utils

touch \
src/Preferences/core/types/Preferences.types.ts \
src/Preferences/core/types/index.zod.ts \
src/Preferences/core/constants/Preferences.constants.ts \
src/Preferences/data/stores/PreferencesStore/index.ts \
src/Preferences/data/stores/PreferencesStore/PreferencesStore.test.ts \
src/Preferences/data/stores/providers.tsx \
src/Preferences/data/i18n/index.ts \
src/Preferences/data/i18n/locales/en/common.json \
src/Preferences/data/i18n/locales/en/auth.json \
src/Preferences/data/i18n/locales/en/movies.json \
src/Preferences/data/i18n/locales/en/tvShows.json \
src/Preferences/data/i18n/locales/en/search.json \
src/Preferences/data/i18n/locales/en/collection.json \
src/Preferences/data/i18n/locales/en/preferences.json \
src/Preferences/data/i18n/locales/es/common.json \
src/Preferences/data/i18n/locales/es/auth.json \
src/Preferences/data/i18n/locales/es/movies.json \
src/Preferences/data/i18n/locales/es/tvShows.json \
src/Preferences/data/i18n/locales/es/search.json \
src/Preferences/data/i18n/locales/es/collection.json \
src/Preferences/data/i18n/locales/es/preferences.json \
src/Preferences/data/hooks/usePreferencesSnapshot.ts \
src/Preferences/ui/controllers/useSettingsController.ts \
src/Preferences/ui/components/SettingsForm/index.tsx \
src/Preferences/ui/components/SettingsForm/StyledComponents.ts \
src/Common/core/utils/FormatDate.utils.ts

echo "✅ All Preferences module files created successfully!"