## 1. Content model

- [ ] 1.1 Port `baseTypes.ts` types into the new app
- [ ] 1.2 Convert `tempDatas.json` into a typed TS content module (profile, skillCategories, works)
- [ ] 1.3 Add a sanitizer and render the profile description as sanitized rich-text

## 2. Shared UI components

- [ ] 2.1 Recreate Box / MessageBox-equivalent / scrollable wrapper as own Tailwind components
- [ ] 2.2 Build the Nav (and header/footer chrome) styled with theme tokens, reading the visibility state from the scene store

## 3. Pages

- [ ] 3.1 Build the home page reproducing the legacy home layer
- [ ] 3.2 Build the about page: bio + skill categories + sub-skill blocks + per-skill level indicators
- [ ] 3.3 Build the work page: work blocks with banner, name, and external link

## 4. Faithful styling

- [ ] 4.1 Port exact legacy values (colors, spacing, type) into Tailwind/arbitrary values/scoped CSS
- [ ] 4.2 Verify each page visually against legacy at the key breakpoints

## 5. Remove legacy styling stack

- [ ] 5.1 Remove all Emotion usage from the new app
- [ ] 5.2 Remove `@psycholog-studio/ui` and confirm neither it nor `@emotion/css` remains in dependencies
