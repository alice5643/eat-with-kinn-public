# Home Domain (🏠)

The home domain holds marketing surfaces and entry experiences that introduce buyers and prospective sellers to Kinn.

## Current pages
- `Homepage.jsx` – marketing homepage for logged-out visitors.
- `HomepageAuthenticatedPage.jsx` – dashboard-style landing for authenticated buyers/sellers.
- `OurMissionPage.jsx` – mission storytelling page.

## Next steps
- Migrate existing `src/Pages/Homepage.jsx` logic here if needed or retire it in favour of the new `Homepage` implementation.
- Move related shared components (e.g., hero sections, value cards) into `src/domains/home/components` as they are extracted from the page markup.
- Update routing in `src/App.jsx` to point to `domains/home` pages once migration is complete.
