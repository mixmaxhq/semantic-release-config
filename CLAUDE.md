# semantic-release-config — repo card

> A map, not a manual. Keep it ~1 screen; point to detail, don't inline it.

## What it is
Shared `semantic-release` configuration for all Mixmax repos, published as `@mixmaxhq/semantic-release-config`. Provides three preset configs (package, module, service) that enforce conventional commits, changelog generation, and npm/GitHub release steps.

## serves
role: Reusable semantic-release presets consumed by all Mixmax repos that publish npm packages or cut GitHub releases
referenced-by: [any Mixmax repo using `semantic-release`, e.g. monorepo-frontend, monorepo-billing, and other `@mixmaxhq/*` packages]

## Code map
- Package preset (npm publishing + changelog + git tag) -> `package/index.js`
- Module preset (no npm publish, CHANGELOG omitted) -> `module/index.js`
- Service preset (production/master-production branches, no npm publish) -> `service/index.js`
- Self-release config (uses package preset) -> `.releaserc.json`

## Conventions
- Three preset flavours: `package` (npm-published lib), `module` (GitHub-release-only, no npm), `service` (deploys to production/master-production branches).
- Consumers reference a preset via `"extends": "@mixmaxhq/semantic-release-config/package"` (or `/module`, `/service`) in their `.releaserc.json`.
- Commit types follow the Commitizen conventional-commit list; `chore(deps)` triggers a patch release automatically.
- This repo is itself versioned with semantic-release using the `package` preset — bump it via `GH_TOKEN=xxx npx semantic-release --no-ci`.

## Gotchas
- `service/index.js` only releases from `production` or `master-production` branches — PRs merged to `master` will NOT cut a release.
- `module/index.js` skips the `@semantic-release/changelog` and `@semantic-release/git` steps, so no CHANGELOG is committed back to the repo.
- No tests (`npm test` exits 1) — lint is the only CI check (`npm run ci`).

## Run / test
```bash
npm run lint          # ESLint — only CI check
GH_TOKEN=xxx npx semantic-release --no-ci   # publish a new version manually
```

## Load the matching domain card
This repo is cross-cutting tooling — it owns no product domain, so there is no domain card to load. When working here, load the card of the consuming service/domain if the change is driven by its needs.
