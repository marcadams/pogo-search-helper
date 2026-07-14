# Pokémon GO Search Helper

A static React + TypeScript app for assembling Pokémon GO search strings.

## Local prerequisites

- Node.js 22 LTS recommended. Current Vite requires Node.js 20.19+ or 22.12+.
- npm, included with Node.js.
- Git, optional but recommended.
- AWS CLI v2, only needed for command-line AWS deployment.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The deployable static files are written to `dist/`.

## Deploy choices

### Simplest: AWS Amplify Hosting

Connect a GitHub repository in the Amplify console. Use:

- Build command: `npm run build`
- Output directory: `dist`

Amplify supplies HTTPS and a public URL without manually configuring S3 and CloudFront.

### AWS-native static site: private S3 + CloudFront

Use S3 for the build files and CloudFront for HTTPS and public delivery. Keep the S3 bucket private and use CloudFront Origin Access Control.

Upload a build:

```bash
npm run build
aws s3 sync dist/ s3://YOUR_BUCKET_NAME --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths '/*'
```

The included convenience script can upload to S3:

```bash
npm run deploy:s3 --bucket=YOUR_BUCKET_NAME
```

CloudWatch is optional monitoring and alerting. It is not the web host.

## Suggested next features

- Named presets stored in localStorage
- Import/export preset JSON
- Search-term documentation and examples
- Compound groups with nested AND/OR logic
- Mobile installability as a PWA
- Shareable URLs that encode a search string
- Automated deployment from GitHub Actions

## Updating Pokémon GO search terms

Edit `src/searchOptions.ts`. Search terms are deliberately data-driven so game vocabulary can be maintained separately from the UI.
