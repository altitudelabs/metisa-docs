# Metisa Documentation

Published with [Gitbook](https://github.com/GitbookIO/gitbook).

# Development

1. Clone repository

2. Download Gitbooks CLI (skip if done)

You need to download Gitbooks CLI first if you haven't. Install globally for convenience:

```
npm install -g gitbook-cli
```

3. Run locally

Changes will be live reloaded in dev mode.

```
npm run docs:watch
```

# Deploy

1. Publish book to `gh-pages` branch and host on Github Pages

```
npm run docs:publish
```

2. View at [https://altitudelabs.github.io/metisa-docs/](https://altitudelabs.github.io/metisa-docs/)
