const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createBrandedPost1() {
  const width = 1080;
  const height = 1080;

  // Background image resized to 1080x1080
  const bg = await sharp('public/festivals/dussehra-minimal.jpg')
    .resize(width, height)
    .toBuffer();

  // Clean vector SVG overlay
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottomVignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0" />
          <stop offset="50%" stop-color="#05070e" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#020306" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="topVignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#020306" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#020306" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Top subtle vignette -->
      <rect x="0" y="0" width="${width}" height="180" fill="url(#topVignette)" />

      <!-- Bottom readability vignette -->
      <rect x="0" y="620" width="${width}" height="460" fill="url(#bottomVignette)" />

      <!-- Top Brand Header -->
      <g transform="translate(540, 85)" text-anchor="middle">
        <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="14" font-weight="700" letter-spacing="7" fill="#E2B150">
          VERVE NOVA TECHNOLOGIES
        </text>
      </g>

      <!-- Bottom Festive Typography -->
      <g transform="translate(540, 885)" text-anchor="middle">
        <!-- Devanagari Greeting Subtitle (No letter-spacing to preserve proper ligatures) -->
        <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans Devanagari', 'Mangal', sans-serif"
              font-size="18" font-weight="700" fill="#E2B150" opacity="0.95">
          ॥ शुभ दशहरा ॥
        </text>

        <!-- Main Title -->
        <text y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="46" font-weight="900" letter-spacing="8" fill="#FFFFFF">
          HAPPY DUSSEHRA
        </text>

        <!-- Brand Core Line -->
        <text y="86" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="15" font-weight="600" letter-spacing="4" fill="#D4AF37" opacity="0.95">
          TRIUMPH OF VISION, PRECISION &amp; PURPOSE
        </text>

        <!-- Fine dividing line -->
        <line x1="-140" y1="112" x2="140" y2="112" stroke="rgba(212, 175, 55, 0.3)" stroke-width="1" />

        <!-- Footer domain -->
        <text y="136" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="12" font-weight="600" letter-spacing="3" fill="rgba(255, 255, 255, 0.45)">
          VERVENOVATECH.COM
        </text>
      </g>
    </svg>
  `);

  await sharp(bg)
    .composite([{ input: svgOverlay, blend: 'over' }])
    .jpeg({ quality: 96 })
    .toFile('public/festivals/dussehra-post-branded.jpg');

  console.log('Post 1 updated: dussehra-post-branded.jpg');
}

async function createBrandedPost2() {
  const width = 1080;
  const height = 1080;

  // Background image resized to 1080x1080
  const bg = await sharp('public/festivals/dashami-minimal.jpg')
    .resize(width, height)
    .toBuffer();

  // Clean vector SVG overlay
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottomVignette2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0" />
          <stop offset="50%" stop-color="#05070e" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#020306" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="topVignette2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#020306" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#020306" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Top subtle vignette -->
      <rect x="0" y="0" width="${width}" height="180" fill="url(#topVignette2)" />

      <!-- Bottom readability vignette -->
      <rect x="0" y="620" width="${width}" height="460" fill="url(#bottomVignette2)" />

      <!-- Top Brand Header -->
      <g transform="translate(540, 85)" text-anchor="middle">
        <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="14" font-weight="700" letter-spacing="7" fill="#E2B150">
          VERVE NOVA TECHNOLOGIES
        </text>
      </g>

      <!-- Bottom Festive Typography -->
      <g transform="translate(540, 885)" text-anchor="middle">
        <!-- Devanagari Greeting Subtitle (No letter-spacing to preserve proper ligatures) -->
        <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans Devanagari', 'Mangal', sans-serif"
              font-size="18" font-weight="700" fill="#E2B150" opacity="0.95">
          ॥ शुभ विजयादशमी ॥
        </text>

        <!-- Main Title -->
        <text y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="44" font-weight="900" letter-spacing="7" fill="#FFFFFF">
          VIJAYADASHAMI
        </text>

        <!-- Brand Core Line -->
        <text y="86" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="15" font-weight="600" letter-spacing="4" fill="#D4AF37" opacity="0.95">
          BURN THE INEFFICIENCIES • SCALE THE VISION
        </text>

        <!-- Fine dividing line -->
        <line x1="-140" y1="112" x2="140" y2="112" stroke="rgba(212, 175, 55, 0.3)" stroke-width="1" />

        <!-- Footer domain -->
        <text y="136" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="12" font-weight="600" letter-spacing="3" fill="rgba(255, 255, 255, 0.45)">
          VERVENOVATECH.COM
        </text>
      </g>
    </svg>
  `);

  await sharp(bg)
    .composite([{ input: svgOverlay, blend: 'over' }])
    .jpeg({ quality: 96 })
    .toFile('public/festivals/dashami-post-branded.jpg');

  console.log('Post 2 updated: dashami-post-branded.jpg');
}

async function main() {
  await createBrandedPost1();
  await createBrandedPost2();
  console.log('Regenerated successfully!');
}

main().catch(console.error);
