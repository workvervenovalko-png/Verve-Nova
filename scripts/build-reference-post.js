const sharp = require('sharp');
const fs = require('fs');

async function buildDussehraPost() {
  const width = 1080;
  const height = 1080;

  // Prepare Verve Nova Logo as buffer (resized to height 48px)
  const logoBuffer = await sharp('public/vnt-logo.png')
    .resize({ height: 50 })
    .toBuffer();

  const svgContent = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Radial Gradient -->
      <radialGradient id="bgGrad" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="60%" stop-color="#FBFBFE" />
        <stop offset="100%" stop-color="#EEF3FA" />
      </radialGradient>

      <!-- Right Wave Gradient in Verve Nova Royal Blue -->
      <linearGradient id="waveBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1B67B2" />
        <stop offset="35%" stop-color="#144d85" />
        <stop offset="80%" stop-color="#0A2540" />
        <stop offset="100%" stop-color="#061627" />
      </linearGradient>

      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>

      <!-- Title Gradient (Verve Nova Royal Blue to Golden Amber) -->
      <linearGradient id="titleBlueGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1B67B2" />
        <stop offset="45%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>

      <!-- 3D Gold Weapon Gradients -->
      <linearGradient id="metalGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFBEB" />
        <stop offset="20%" stop-color="#FEF08A" />
        <stop offset="55%" stop-color="#F59E0B" />
        <stop offset="85%" stop-color="#B45309" />
        <stop offset="100%" stop-color="#78350F" />
      </linearGradient>

      <linearGradient id="metalBlade" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="25%" stop-color="#FDE047" />
        <stop offset="65%" stop-color="#D97706" />
        <stop offset="100%" stop-color="#78350F" />
      </linearGradient>

      <!-- Marigold Flower Gradient -->
      <radialGradient id="marigold" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="30%" stop-color="#FBBF24" />
        <stop offset="70%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#92400E" />
      </radialGradient>

      <!-- Red Festive Silk Cloth Gradient -->
      <linearGradient id="clothRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EF4444" />
        <stop offset="30%" stop-color="#DC2626" />
        <stop offset="70%" stop-color="#991B1B" />
        <stop offset="100%" stop-color="#450A0A" />
      </linearGradient>

      <!-- Lord Rama Silhouette Gradient -->
      <linearGradient id="ramaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.95" />
        <stop offset="55%" stop-color="#EA580C" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#1B67B2" stop-opacity="0.4" />
      </linearGradient>

      <!-- Drop Shadows -->
      <filter id="shadowWave" x="-20%" y="-10%" width="140%" height="120%">
        <feDropShadow dx="-16" dy="16" stdDeviation="28" flood-color="#0a1b33" flood-opacity="0.38" />
      </filter>

      <filter id="shadowWeapon" x="-25%" y="-10%" width="150%" height="120%">
        <feDropShadow dx="-14" dy="20" stdDeviation="22" flood-color="#000000" flood-opacity="0.75" />
      </filter>
    </defs>

    <!-- Canvas Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Top-Left Mandala -->
    <g opacity="0.85">
      <circle cx="80" cy="80" r="185" stroke="#1B67B2" stroke-width="1.5" stroke-dasharray="5 5" fill="none" opacity="0.35"/>
      <circle cx="80" cy="80" r="150" stroke="#F59E0B" stroke-width="2.5" fill="none" opacity="0.4"/>
      <circle cx="80" cy="80" r="120" stroke="#1B67B2" stroke-width="1" fill="none" opacity="0.3"/>
      <!-- Radial rays -->
      <path d="M-80 80 L240 80 M80 -80 L80 240 M-33 -33 L193 193 M-33 193 L193 -33" stroke="#D97706" stroke-width="1.2" opacity="0.35" />
      <!-- Petals -->
      <g fill="#F59E0B" opacity="0.18">
        <path d="M80 0 C95 40 95 80 80 95 C65 80 65 40 80 0 Z"/>
        <path d="M80 160 C95 120 95 95 80 80 C65 95 65 120 80 160 Z"/>
        <path d="M0 80 C40 95 80 95 95 80 C80 65 40 65 0 80 Z"/>
        <path d="M160 80 C120 95 95 95 80 80 C95 65 120 65 160 80 Z"/>
      </g>
      <circle cx="80" cy="80" r="35" fill="#1B67B2" opacity="0.12"/>
      <circle cx="80" cy="80" r="18" fill="#F59E0B" opacity="0.3"/>
    </g>

    <!-- Bottom-Left Mandala -->
    <g opacity="0.75">
      <circle cx="60" cy="1020" r="175" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="5 5" fill="none" opacity="0.35"/>
      <circle cx="60" cy="1020" r="140" stroke="#1B67B2" stroke-width="2" fill="none" opacity="0.35"/>
      <circle cx="60" cy="1020" r="105" stroke="#F59E0B" stroke-width="1" fill="none" opacity="0.25"/>
    </g>

    <!-- Right Wave Body in Verve Nova Royal Navy Blue -->
    <g filter="url(#shadowWave)">
      <path d="M620 0 C530 260 480 430 580 660 C660 840 590 980 520 1080 L1080 1080 L1080 0 Z" fill="url(#waveBlue)" />
    </g>

    <!-- Golden Wave Border Line -->
    <path d="M620 0 C530 260 480 430 580 660 C660 840 590 980 520 1080" stroke="url(#goldBorder)" stroke-width="5.5" fill="none" opacity="0.95" />

    <!-- Ambient Glow Inside Wave -->
    <circle cx="880" cy="460" r="280" fill="#38BDF8" opacity="0.16" />
    <circle cx="840" cy="550" r="220" fill="#F59E0B" opacity="0.14" />

    <!-- Left Content Typography -->
    <!-- Brand Name (Placed right next to logo) -->
    <g transform="translate(145, 102)">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="22" font-weight="900" letter-spacing="2.5" fill="#1B67B2">
        VERVE NOVA
      </text>
      <text y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="9.5" font-weight="700" letter-spacing="4.5" fill="#64748B">
        TECHNOLOGIES
      </text>
    </g>

    <!-- Festive Pre-title -->
    <text x="80" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          font-size="20" font-weight="800" letter-spacing="11" fill="#1E293B">
      H A P P Y
    </text>

    <!-- Main Title: Dussehra -->
    <text x="75" y="325" font-family="'Playfair Display', Georgia, serif"
          font-size="82" font-weight="900" letter-spacing="-1" fill="url(#titleBlueGold)">
      Dussehra
    </text>

    <!-- Blessing Lead Text -->
    <g transform="translate(80, 385)">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="16" font-weight="600" fill="#334155" line-height="1.6">
        <tspan x="0" dy="0">May the triumph of Lord Rama over evil</tspan>
        <tspan x="0" dy="26">inspire your path with courage, wisdom,</tspan>
        <tspan x="0" dy="26">and boundless success.</tspan>
      </text>
    </g>

    <!-- Divider Line with Golden Diamond -->
    <g transform="translate(80, 485)">
      <line x1="0" y1="0" x2="140" y2="0" stroke="#CBD5E1" stroke-width="1.5" />
      <rect x="148" y="-4" width="8" height="8" fill="#F59E0B" transform="rotate(45 152 0)" />
      <line x1="164" y1="0" x2="304" y2="0" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Secondary Quote -->
    <g transform="translate(80, 525)">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="14" font-weight="500" fill="#64748B">
        <tspan x="0" dy="0">On this auspicious festival of Vijayadashami,</tspan>
        <tspan x="0" dy="24">may every obstacle turn into opportunity and</tspan>
        <tspan x="0" dy="24">divine light lead your personal and professional journey!</tspan>
      </text>
    </g>

    <!-- Bottom Silhouette (Lord Rama & Ayodhya Temples) -->
    <g transform="translate(60, 720)">
      <!-- Background Temples -->
      <g fill="#EA580C" opacity="0.25">
        <path d="M220 250 L245 135 L270 250 Z"/>
        <path d="M240 135 L245 120 L250 135 Z"/>
        <circle cx="245" cy="118" r="3.5"/>
        <path d="M280 250 L305 160 L330 250 Z"/>
        <path d="M185 250 Q205 200 225 250 Z"/>
      </g>

      <!-- Lord Rama Archer Foreground Silhouette -->
      <g fill="url(#ramaGrad)">
        <circle cx="120" cy="155" r="70" fill="#FEF08A" opacity="0.25"/>
        <circle cx="120" cy="155" r="50" fill="#FDE047" opacity="0.35"/>
        <path d="M115 135 Q120 170 125 210 L140 250 L110 250 L105 210 Z"/>
        <circle cx="120" cy="120" r="12"/>
        <path d="M114 114 L120 98 L126 114 Z"/>
        <rect x="100" y="118" width="8" height="40" rx="3" transform="rotate(-20 100 118)"/>
        <path d="M120 132 L155 138 L165 148" stroke="url(#ramaGrad)" stroke-width="9" stroke-linecap="round"/>
        <path d="M120 132 L95 142 L85 152" stroke="url(#ramaGrad)" stroke-width="9" stroke-linecap="round"/>
        <path d="M80 85 Q50 155 85 230" stroke="#EA580C" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <line x1="80" y1="85" x2="155" y2="152" stroke="#FDE047" stroke-width="1.5" stroke-dasharray="3 3"/>
        <line x1="155" y1="152" x2="85" y2="230" stroke="#FDE047" stroke-width="1.5" stroke-dasharray="3 3"/>
        <line x1="75" y1="150" x2="185" y2="155" stroke="#F59E0B" stroke-width="3"/>
        <path d="M185 155 L170 147 L170 163 Z" fill="#F59E0B"/>
      </g>
    </g>

    <!-- Hero 3D Weapon (Right Side: Golden Bow with Garland & Red Cloth) -->
    <g transform="translate(680, 80)" filter="url(#shadowWeapon)">
      <!-- Arrow Shaft -->
      <rect x="135" y="70" width="20" height="730" rx="10" fill="url(#metalGold)" />

      <!-- Upper Bow Arc -->
      <path d="M145 70 Q20 190 50 370 Q65 450 145 470" stroke="url(#metalBlade)" stroke-width="32" stroke-linecap="round" fill="none"/>
      <path d="M145 70 Q20 190 50 370 Q65 450 145 470" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85"/>

      <!-- Lower Bow Arc -->
      <path d="M145 470 Q65 490 50 570 Q20 750 145 795" stroke="url(#metalBlade)" stroke-width="32" stroke-linecap="round" fill="none"/>
      <path d="M145 470 Q65 490 50 570 Q20 750 145 795" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85"/>

      <!-- Bowstring -->
      <line x1="145" y1="75" x2="145" y2="790" stroke="#FFFFFF" stroke-width="4" opacity="0.95" />
      <line x1="145" y1="75" x2="145" y2="790" stroke="#FDE047" stroke-width="1.8" />

      <!-- Golden Arrow Head Top -->
      <path d="M145 10 L175 75 L145 60 L115 75 Z" fill="url(#metalBlade)" />
      <path d="M145 10 L145 60 L115 75 Z" fill="#FFFFFF" opacity="0.6"/>

      <!-- Marigold Flower Garland (Genda Phool) around center -->
      <g>
        <circle cx="130" cy="415" r="22" fill="url(#marigold)" />
        <circle cx="160" cy="415" r="22" fill="url(#marigold)" />
        <circle cx="115" cy="440" r="24" fill="url(#marigold)" />
        <circle cx="145" cy="445" r="26" fill="url(#marigold)" />
        <circle cx="175" cy="440" r="24" fill="url(#marigold)" />
        <circle cx="130" cy="475" r="22" fill="url(#marigold)" />
        <circle cx="160" cy="475" r="22" fill="url(#marigold)" />
      </g>

      <!-- Flowing Sacred Red Cloth with Gold Borders (Exact Reference Look) -->
      <path d="M125 460 C85 500 55 570 95 670 C110 705 145 720 125 790 L165 810 C195 720 155 660 165 590 C175 530 165 470 125 460 Z" fill="url(#clothRed)" />
      <path d="M95 670 C110 705 145 720 125 790" stroke="#FDE047" stroke-width="6.5" fill="none" />
      <path d="M165 810 C195 720 155 660 165 590" stroke="#FDE047" stroke-width="6.5" fill="none" />

      <!-- Flying Ribbon Tail Right -->
      <path d="M155 465 C215 500 285 540 255 610 C235 650 185 660 215 720 L245 725 C275 660 285 600 235 530 C205 490 165 470 155 465 Z" fill="url(#clothRed)" />
      <path d="M255 610 C235 650 185 660 215 720" stroke="#FDE047" stroke-width="6.5" fill="none" />
    </g>

    <!-- Website URL on bottom right -->
    <text x="980" y="1035" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          font-size="16" font-weight="700" letter-spacing="2.5" fill="#FFFFFF" opacity="0.95">
      www.vervenovatech.com
    </text>
  </svg>
  `;

  // Composite SVG with Verve Nova Logo Image
  await sharp(Buffer.from(svgContent))
    .composite([
      {
        input: logoBuffer,
        top: 80,
        left: 80,
      }
    ])
    .png({ quality: 100 })
    .toFile('public/festivals/verve-nova-dussehra-post.png');

  console.log('Built: public/festivals/verve-nova-dussehra-post.png');
}

async function buildDashamiPost() {
  const width = 1080;
  const height = 1080;

  // Prepare Verve Nova Logo as buffer (resized to height 48px)
  const logoBuffer = await sharp('public/vnt-logo.png')
    .resize({ height: 50 })
    .toBuffer();

  const svgContent = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Radial Gradient -->
      <radialGradient id="bgGrad2" cx="25%" cy="25%" r="75%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="60%" stop-color="#FDFBF9" />
        <stop offset="100%" stop-color="#F8EFEA" />
      </radialGradient>

      <!-- Right Wave Gradient: Warm Saffron to Royal Navy (Matching Reference) -->
      <linearGradient id="waveSaffron" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EA580C" />
        <stop offset="45%" stop-color="#C2410C" />
        <stop offset="85%" stop-color="#1B67B2" />
        <stop offset="100%" stop-color="#0A2540" />
      </linearGradient>

      <linearGradient id="goldBorder2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>

      <!-- Main Title Gradient (Saffron-Gold Festive) -->
      <linearGradient id="titleSaffron" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#C2410C" />
        <stop offset="35%" stop-color="#EA580C" />
        <stop offset="85%" stop-color="#D97706" />
        <stop offset="100%" stop-color="#F59E0B" />
      </linearGradient>

      <!-- 3D Gold Metallic Gradients for Trishul -->
      <linearGradient id="trishulGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFBEB" />
        <stop offset="25%" stop-color="#FDE047" />
        <stop offset="60%" stop-color="#F59E0B" />
        <stop offset="90%" stop-color="#D97706" />
        <stop offset="100%" stop-color="#78350F" />
      </linearGradient>

      <linearGradient id="prongsGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="20%" stop-color="#FEF08A" />
        <stop offset="55%" stop-color="#F59E0B" />
        <stop offset="85%" stop-color="#B45309" />
        <stop offset="100%" stop-color="#451A03" />
      </linearGradient>

      <!-- Marigold Flower Gradient -->
      <radialGradient id="marigold2" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="30%" stop-color="#FBBF24" />
        <stop offset="70%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#92400E" />
      </radialGradient>

      <!-- Red Festive Silk Cloth Gradient -->
      <linearGradient id="clothRed2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EF4444" />
        <stop offset="30%" stop-color="#DC2626" />
        <stop offset="70%" stop-color="#991B1B" />
        <stop offset="100%" stop-color="#450A0A" />
      </linearGradient>

      <!-- Maa Durga Silhouette Gradient -->
      <linearGradient id="durgaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EA580C" stop-opacity="0.95" />
        <stop offset="55%" stop-color="#F59E0B" stop-opacity="0.85" />
        <stop offset="100%" stop-color="#1B67B2" stop-opacity="0.4" />
      </linearGradient>

      <!-- Drop Shadows -->
      <filter id="shadowWave2" x="-20%" y="-10%" width="140%" height="120%">
        <feDropShadow dx="-16" dy="16" stdDeviation="28" flood-color="#7c2d12" flood-opacity="0.38" />
      </filter>

      <filter id="shadowTrishul" x="-25%" y="-10%" width="150%" height="120%">
        <feDropShadow dx="-14" dy="20" stdDeviation="24" flood-color="#000000" flood-opacity="0.75" />
      </filter>
    </defs>

    <!-- Canvas Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad2)" />

    <!-- Top-Left Mandala -->
    <g opacity="0.85">
      <circle cx="80" cy="80" r="185" stroke="#EA580C" stroke-width="1.5" stroke-dasharray="5 5" fill="none" opacity="0.35"/>
      <circle cx="80" cy="80" r="150" stroke="#1B67B2" stroke-width="2.5" fill="none" opacity="0.4"/>
      <circle cx="80" cy="80" r="120" stroke="#EA580C" stroke-width="1" fill="none" opacity="0.3"/>
      <!-- Radial rays -->
      <path d="M-80 80 L240 80 M80 -80 L80 240 M-33 -33 L193 193 M-33 193 L193 -33" stroke="#F59E0B" stroke-width="1.2" opacity="0.35" />
      <g fill="#EA580C" opacity="0.18">
        <path d="M80 0 C95 40 95 80 80 95 C65 80 65 40 80 0 Z"/>
        <path d="M80 160 C95 120 95 95 80 80 C65 95 65 120 80 160 Z"/>
        <path d="M0 80 C40 95 80 95 95 80 C80 65 40 65 0 80 Z"/>
        <path d="M160 80 C120 95 95 95 80 80 C95 65 120 65 160 80 Z"/>
      </g>
      <circle cx="80" cy="80" r="35" fill="#EA580C" opacity="0.12"/>
      <circle cx="80" cy="80" r="18" fill="#1B67B2" opacity="0.3"/>
    </g>

    <!-- Bottom-Left Mandala -->
    <g opacity="0.75">
      <circle cx="60" cy="1020" r="175" stroke="#1B67B2" stroke-width="1.5" stroke-dasharray="5 5" fill="none" opacity="0.35"/>
      <circle cx="60" cy="1020" r="140" stroke="#EA580C" stroke-width="2" fill="none" opacity="0.35"/>
      <circle cx="60" cy="1020" r="105" stroke="#1B67B2" stroke-width="1" fill="none" opacity="0.25"/>
    </g>

    <!-- Right Wave Body (Saffron with Blue Accent) -->
    <g filter="url(#shadowWave2)">
      <path d="M620 0 C530 250 480 430 580 650 C660 830 590 970 520 1080 L1080 1080 L1080 0 Z" fill="url(#waveSaffron)" />
    </g>

    <!-- Golden Wave Border Line -->
    <path d="M620 0 C530 250 480 430 580 650 C660 830 590 970 520 1080" stroke="url(#goldBorder2)" stroke-width="5.5" fill="none" opacity="0.95" />

    <!-- Ambient Glow Inside Wave -->
    <circle cx="880" cy="440" r="290" fill="#FBBF24" opacity="0.2" />
    <circle cx="840" cy="540" r="230" fill="#EA580C" opacity="0.18" />

    <!-- Left Content Typography -->
    <!-- Brand Name (Placed right next to logo) -->
    <g transform="translate(145, 102)">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="22" font-weight="900" letter-spacing="2.5" fill="#1B67B2">
        VERVE NOVA
      </text>
      <text y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="9.5" font-weight="700" letter-spacing="4.5" fill="#64748B">
        TECHNOLOGIES
      </text>
    </g>

    <!-- Festive Pre-title -->
    <text x="80" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          font-size="20" font-weight="800" letter-spacing="11" fill="#1E293B">
      H A P P Y
    </text>

    <!-- Main Title: Vijayadashami -->
    <text x="75" y="325" font-family="'Playfair Display', Georgia, serif"
          font-size="62" font-weight="900" letter-spacing="-0.5" fill="url(#titleSaffron)">
      Vijayadashami
    </text>

    <!-- Blessing Lead Text -->
    <g transform="translate(80, 385)">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="16" font-weight="600" fill="#334155" line-height="1.6">
        <tspan x="0" dy="0">May the supreme divine power bless you with</tspan>
        <tspan x="0" dy="26">unyielding strength, clarity of thought,</tspan>
        <tspan x="0" dy="26">and limitless prosperity.</tspan>
      </text>
    </g>

    <!-- Divider Line with Golden Diamond -->
    <g transform="translate(80, 485)">
      <line x1="0" y1="0" x2="140" y2="0" stroke="#CBD5E1" stroke-width="1.5" />
      <rect x="148" y="-4" width="8" height="8" fill="#F59E0B" transform="rotate(45 152 0)" />
      <line x1="164" y1="0" x2="304" y2="0" stroke="#CBD5E1" stroke-width="1.5" />
    </g>

    <!-- Secondary Quote -->
    <g transform="translate(80, 525)">
      <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="14" font-weight="500" fill="#64748B">
        <tspan x="0" dy="0">On this auspicious Dashami, may truth dispel all</tspan>
        <tspan x="0" dy="24">obstacles, courage conquer fear, and innovation guide</tspan>
        <tspan x="0" dy="24">you toward victory in every endeavor!</tspan>
      </text>
    </g>

    <!-- Bottom Silhouette (Maa Durga Victory / Lion Silhouette & Temples) -->
    <g transform="translate(60, 720)">
      <!-- Temple Spire in Background -->
      <g fill="#F59E0B" opacity="0.25">
        <path d="M260 250 L285 145 L310 250 Z"/>
        <path d="M280 145 L285 130 L290 145 Z"/>
        <circle cx="285" cy="128" r="3.5"/>
        <path d="M320 250 L345 170 L370 250 Z"/>
        <path d="M220 250 Q240 210 260 250 Z"/>
      </g>

      <!-- Goddess Durga on Lion Silhouette (Exact Style from Reference) -->
      <g fill="url(#durgaGrad)">
        <circle cx="150" cy="155" r="75" fill="#FEF08A" opacity="0.25"/>
        <circle cx="150" cy="155" r="52" fill="#FDE047" opacity="0.35"/>
        <!-- Lion Body & Mane -->
        <path d="M90 250 Q110 220 140 210 Q165 200 190 220 Q210 235 220 250 Z" />
        <path d="M190 205 Q210 185 225 205 Q220 220 200 225 Z" />
        <rect x="95" y="230" width="14" height="25" rx="5" />
        <rect x="135" y="230" width="14" height="25" rx="5" />
        <rect x="180" y="235" width="14" height="20" rx="5" />
        <rect x="205" y="235" width="14" height="20" rx="5" />

        <!-- Maa Durga Figure Seated on Lion -->
        <path d="M140 155 C135 180 130 200 150 215 C160 210 165 190 155 165 Z" />
        <circle cx="147" cy="138" r="11" />
        <path d="M141 132 L147 116 L153 132 Z" />

        <!-- Divine Arms & Weapons -->
        <path d="M148 150 Q175 130 185 115" stroke="url(#durgaGrad)" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M148 155 Q180 150 195 145" stroke="url(#durgaGrad)" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M148 160 Q180 170 190 185" stroke="url(#durgaGrad)" stroke-width="5" stroke-linecap="round" fill="none"/>
        <line x1="140" y1="200" x2="210" y2="95" stroke="#EA580C" stroke-width="3.5"/>
        <path d="M210 95 L218 78 L226 95 Z" fill="#EA580C"/>

        <path d="M142 150 Q120 130 110 115" stroke="url(#durgaGrad)" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M142 155 Q115 150 100 145" stroke="url(#durgaGrad)" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M142 160 Q118 170 110 185" stroke="url(#durgaGrad)" stroke-width="5" stroke-linecap="round" fill="none"/>
        <circle cx="110" cy="110" r="10" stroke="#F59E0B" stroke-width="3" fill="none"/>
      </g>
    </g>

    <!-- Hero 3D Weapon (Right Side: Golden Trishul with Marigold & Red Cloth) -->
    <g transform="translate(680, 75)" filter="url(#shadowTrishul)">
      <!-- Long Golden Staff -->
      <rect x="140" y="220" width="22" height="590" rx="11" fill="url(#trishulGold)" />
      <!-- Metallic Bands -->
      <rect x="136" y="260" width="30" height="10" rx="4" fill="url(#prongsGold)" />
      <rect x="136" y="310" width="30" height="10" rx="4" fill="url(#prongsGold)" />
      <rect x="136" y="540" width="30" height="10" rx="4" fill="url(#prongsGold)" />
      <rect x="136" y="690" width="30" height="10" rx="4" fill="url(#prongsGold)" />

      <!-- Center Spear Prong -->
      <path d="M151 35 L173 155 L151 140 L129 155 Z" fill="url(#prongsGold)" />
      <rect x="144" y="135" width="14" height="105" fill="url(#trishulGold)" />

      <!-- Left Curved Prong -->
      <path d="M144 195 C80 175 50 115 65 55 C70 85 90 125 144 145 Z" fill="url(#prongsGold)" />
      <path d="M65 55 L75 85 L60 80 Z" fill="#FFFFFF" />

      <!-- Right Curved Prong -->
      <path d="M158 195 C222 175 252 115 237 55 C232 85 212 125 158 145 Z" fill="url(#prongsGold)" />
      <path d="M237 55 L227 85 L242 80 Z" fill="#FFFFFF" />

      <!-- Base Mount -->
      <path d="M125 205 C125 195 177 195 177 205 L168 235 L134 235 Z" fill="url(#prongsGold)" />

      <!-- Marigold Garland (Genda Phool) around Trishul Neck -->
      <g>
        <circle cx="125" cy="270" r="22" fill="url(#marigold2)" />
        <circle cx="155" cy="270" r="23" fill="url(#marigold2)" />
        <circle cx="180" cy="280" r="21" fill="url(#marigold2)" />
        <circle cx="115" cy="300" r="23" fill="url(#marigold2)" />
        <circle cx="145" cy="305" r="25" fill="url(#marigold2)" />
        <circle cx="175" cy="310" r="22" fill="url(#marigold2)" />
        <circle cx="135" cy="335" r="22" fill="url(#marigold2)" />
        <circle cx="165" cy="340" r="20" fill="url(#marigold2)" />
      </g>

      <!-- Flowing Sacred Red Cloth with Gold Borders (Exact Reference Look) -->
      <path d="M120 315 C70 365 50 435 90 545 C110 595 150 625 125 725 L175 745 C200 645 150 585 165 505 C180 435 175 345 120 315 Z" fill="url(#clothRed2)" />
      <path d="M90 545 C110 595 150 625 125 725" stroke="#FDE047" stroke-width="7" fill="none" />
      <path d="M175 745 C200 645 150 585 165 505" stroke="#FDE047" stroke-width="7" fill="none" />

      <!-- Flying Ribbon Tail Right -->
      <path d="M160 325 C220 375 300 415 270 495 C250 540 195 555 230 625 L265 630 C295 555 305 485 250 415 C215 365 170 335 160 325 Z" fill="url(#clothRed2)" />
      <path d="M270 495 C250 540 195 555 230 625" stroke="#FDE047" stroke-width="7" fill="none" />
    </g>

    <!-- Website URL on bottom right -->
    <text x="980" y="1035" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          font-size="16" font-weight="700" letter-spacing="2.5" fill="#FFFFFF" opacity="0.95">
      www.vervenovatech.com
    </text>
  </svg>
  `;

  // Composite SVG with Verve Nova Logo Image
  await sharp(Buffer.from(svgContent))
    .composite([
      {
        input: logoBuffer,
        top: 80,
        left: 80,
      }
    ])
    .png({ quality: 100 })
    .toFile('public/festivals/verve-nova-dashami-post.png');

  console.log('Built: public/festivals/verve-nova-dashami-post.png');
}

async function main() {
  await buildDussehraPost();
  await buildDashamiPost();
  console.log('All posts built successfully!');
}

main().catch(console.error);
