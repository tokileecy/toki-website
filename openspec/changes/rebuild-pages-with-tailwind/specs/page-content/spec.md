## ADDED Requirements

### Requirement: Typed content model

The site content SHALL be defined in a typed TS module covering the profile
(name and rich-text description), skill categories (each containing skills with a
0–100 level), and works (each with name, external url, and responsive banner
data), replacing the legacy `tempDatas.json`.

#### Scenario: Content is typed and complete

- **WHEN** the app reads its content
- **THEN** it loads profile, skill categories with leveled skills, and works from the typed model with no untyped JSON access

### Requirement: Profile rich-text is sanitized

The profile description rich-text/HTML SHALL be sanitized before rendering.

#### Scenario: Description renders safely

- **WHEN** the profile description is displayed
- **THEN** it renders the intended formatting with any unsafe markup stripped

### Requirement: Home page reproduces legacy

The home page SHALL reproduce the legacy home layer's layout and copy.

#### Scenario: Home content

- **WHEN** the home route is viewed
- **THEN** its content and layout match the legacy home layer

### Requirement: About page reproduces legacy skills

The about page SHALL reproduce the legacy about layer: the bio and the skill
categories with sub-skill blocks and per-skill level indicators.

#### Scenario: Skills with levels

- **WHEN** the about route is viewed
- **THEN** the skill categories render with their skills and each skill's level shown as in legacy

### Requirement: Work page reproduces legacy portfolio

The work page SHALL reproduce the legacy work layer: each work shown with its
banner, name, and a working external link.

#### Scenario: Work blocks

- **WHEN** the work route is viewed
- **THEN** each work renders with its banner and name and links to the correct external url

### Requirement: Styled with Tailwind, matching legacy values

The pages and shared UI SHALL be styled with Tailwind v4 using the theme tokens,
reproducing the legacy visual values (colors, spacing, type) rather than
re-idiomatizing.

#### Scenario: Visual parity

- **WHEN** a page is compared to its legacy counterpart
- **THEN** the layout and styling are visually indistinguishable to a human viewer

### Requirement: Emotion and internal UI library removed

The new app SHALL contain no dependency on Emotion or `@psycholog-studio/ui`.

#### Scenario: Clean dependencies

- **WHEN** the app's dependencies are inspected
- **THEN** neither `@emotion/css` nor `@psycholog-studio/ui` is present
