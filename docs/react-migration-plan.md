# React migration kickoff plan

This branch starts an incremental migration from the current DOM-script architecture to modern React components while keeping the existing site working.

## Goals

- Preserve the current look/feel and animation behavior.
- Migrate page-by-page so existing pages continue shipping.
- Move content into reusable component/data structures.
- Avoid a big-bang rewrite.

## Proposed migration order

1. **Scaffold React runtime in parallel**
   - Add `react` + `react-dom` and JSX Babel support.
   - Add a new webpack entry + HTML page at `/react/index.html` for side-by-side development.

2. **Migrate the home page first**
   - Break into components:
     - `SiteHeader`
     - `Hero`
     - `FeaturedProject`
     - `ProjectList`
     - `SiteFooter`
   - Move project list to data objects (title, url, hover image).

3. **Move animation logic into hooks**
   - `useFeaturedCircleSpin` (anime.js)
   - `useAnimatedTypeInView` (in-view + gsap)
   - `useHoverReveal` (current hover class behavior)

4. **Migrate project pages one by one**
   - internet
   - world-cup
   - uk-election
   - hello-google

5. **Finish and switch default entry**
   - Route/link cleanup
   - Remove legacy DOM-entry files once parity is achieved.

## Current source mapping (for componentization)

- Home markup: `index.html`
- Home interactions/animations: `src/index.js`
- Project page scripts:
  - `src/project/internet.js`
  - `src/project/world-cup.js`
  - `src/project/uk-election.js`
  - `src/onepage/hello-google.js`

## Definition of done for phase 1

- New React page runs through webpack in development and production.
- Home page static layout is rendered from React components.
- Existing styles are reused.
- No visual regressions in key sections (header, featured block, project list, footer).
