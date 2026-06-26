#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Creating Milestone 5 folders..."

mkdir -p src/Collection/core/types
mkdir -p src/Collection/core/constants
mkdir -p src/Collection/core/utils
mkdir -p src/Collection/data/stores/WatchlistStore
mkdir -p src/Collection/data/hooks
mkdir -p src/Collection/ui/controllers
mkdir -p src/Collection/ui/components/WatchlistCard
mkdir -p src/Collection/ui/components/WatchlistFilters
mkdir -p src/Collection/ui/components/WatchlistEmptyState

echo "Creating new Milestone 5 files..."

# core
touch src/Collection/core/types/Watchlist.types.ts
touch src/Collection/core/types/index.zod.ts
touch src/Collection/core/constants/Watchlist.constants.ts
touch src/Collection/core/utils/WatchlistMediaKey.utils.ts
touch src/Collection/core/utils/WatchlistSort.utils.ts

# data
touch src/Collection/data/stores/WatchlistStore/index.ts
touch src/Collection/data/stores/WatchlistStore/WatchlistStore.test.ts
touch src/Collection/data/stores/context.ts
touch src/Collection/data/stores/providers.tsx
touch src/Collection/data/hooks/useWatchlistSnapshot.ts
touch src/Collection/data/hooks/useWatchlistMediaToggle.ts

# ui
touch src/Collection/ui/controllers/useWatchlistPageController.ts
touch src/Collection/ui/components/WatchlistCard/index.tsx
touch src/Collection/ui/components/WatchlistCard/StyledComponents.ts
touch src/Collection/ui/components/WatchlistFilters/index.tsx
touch src/Collection/ui/components/WatchlistFilters/StyledComponents.ts
touch src/Collection/ui/components/WatchlistEmptyState/index.tsx
touch src/Collection/ui/components/WatchlistEmptyState/StyledComponents.ts

echo "Existing files to UPDATE (already in repo):"
echo "  src/Collection/ui/pages/WatchlistPage.tsx"
echo "  src/Collection/index.ts"
echo "  src/main.tsx"
echo "  src/Common/ui/components/WatchlistToggle/index.tsx"
echo "  src/Common/ui/components/WatchlistToggle/StyledComponents.ts"
echo "  src/Movies/ui/components/MovieCard/index.tsx"
echo "  src/Movies/ui/components/MovieMetadata/index.tsx"
echo "  src/TVShows/ui/components/TVShowMetadata/index.tsx"
echo "  src/Auth/ui/components/Navbar/index.tsx"
echo "  src/Auth/ui/components/Navbar/StyledComponents.ts"
echo "  src/Preferences/data/i18n/locales/en/collection.json"
echo "  src/Preferences/data/i18n/locales/es/collection.json"
echo "  src/Preferences/data/i18n/locales/en/common.json"
echo "  src/Preferences/data/i18n/locales/es/common.json"

echo "Done. Paste code into each file listed above."