## ADDED Requirements

### Requirement: Production hosting serves the new app

The repo-root `firebase.json` hosting `public` SHALL point at the new app's
static export (`apps/toki-website/out`) so production serves the new site.

#### Scenario: Production serves new site

- **WHEN** the production site is deployed and visited
- **THEN** it serves the new `apps/toki-website` build

### Requirement: CI builds and deploys the new app

The CI workflows SHALL build (Node 22) and deploy the new app's static export to
Firebase Hosting on the appropriate triggers.

#### Scenario: Merge deploys new app

- **WHEN** changes land on the deploy trigger
- **THEN** CI builds `apps/toki-website` and deploys its export to production hosting

### Requirement: SEO parity

The new app SHALL provide per-route document titles and meta description
matching legacy via the App Router metadata API, and SHALL publish a sitemap.

#### Scenario: Per-route metadata

- **WHEN** each route is loaded or crawled
- **THEN** its title and meta description match the legacy values and a sitemap is available

### Requirement: Analytics present

The new app SHALL include the Google Tag Manager container used by legacy
(`GTM-WDW2RJB`).

#### Scenario: GTM loaded

- **WHEN** the site loads
- **THEN** the GTM container is initialized

### Requirement: Fonts and assets ported

The custom font (`xingothic-tc`), favicon, and sprite assets SHALL be present so
typography and imagery match legacy.

#### Scenario: Fonts and assets render

- **WHEN** the site renders
- **THEN** text uses the custom font and the favicon/sprite assets load as in legacy

### Requirement: Legacy site preserved as a reachable exhibit

The legacy site SHALL remain deployed and reachable as a frozen exhibit at a
separate location, not overwritten by the cutover.

#### Scenario: Legacy still reachable

- **WHEN** the legacy exhibit location is visited after cutover
- **THEN** the 2022 site still loads and runs

### Requirement: Parity check before promotion

A final parity check against legacy SHALL be completed before promoting the new
app to production.

#### Scenario: Parity verified

- **WHEN** the cutover is performed
- **THEN** the new app has been verified visually against legacy across the three routes beforehand
