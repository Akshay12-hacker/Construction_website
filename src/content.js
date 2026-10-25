/**
 * BuildCraft: "From Empty Land to Forever Home"
 * Content & Asset Configuration
 * All copy, labels, highlights, and image dimensions reside here for easy editing.
 */

export const siteMeta = {
  brand: 'BuildCraft',
  tagline: 'From Empty Land to Forever Home',
  ctaText: 'Start Your Build',
  ctaHref: '#ch8',
  phonePlaceholder: '+1 (800) 555-0199',
  emailPlaceholder: 'hello@buildcraft-homes.com',
  addressPlaceholder: '452 Timberline Way, Pacific Northwest'
};

export const manifest = {
  'stage-1-plot': { width: 1020, height: 487, src: '/assets-processed/webp/stage-1-plot.webp' },
  'stage-2-foundation': { width: 1020, height: 486, src: '/assets-processed/webp/stage-2-foundation.webp' },
  'stage-3-structure': { width: 1020, height: 670, src: '/assets-processed/webp/stage-3-structure.webp' },
  'stage-4-roof-windows': { width: 1400, height: 879, src: '/assets-processed/webp/stage-4-roof-windows.webp' },
  'stage-5-finished': { width: 992, height: 734, src: '/assets-processed/webp/stage-5-finished.webp' },
  'machine-crane': { width: 810, height: 783, src: '/assets-processed/webp/machine-crane.webp' },
  'machine-excavator': { width: 810, height: 804, src: '/assets-processed/webp/machine-excavator.webp' },
  'machine-mixer': { width: 1000, height: 558, src: '/assets-processed/webp/machine-mixer.webp' },
  'machine-scaffold': { width: 656, height: 675, src: '/assets-processed/webp/machine-scaffold.webp' },
  'material-rebar-cage': { width: 729, height: 444, src: '/assets-processed/webp/material-rebar-cage.webp' },
  'material-concrete': { width: 800, height: 488, src: '/assets-processed/webp/material-concrete.webp' },
  'material-bricks-cement': { width: 900, height: 517, src: '/assets-processed/webp/material-bricks-cement.webp' },
  'material-steel-beams': { width: 900, height: 779, src: '/assets-processed/webp/material-steel-beams.webp' },
  'material-glass': { width: 800, height: 447, src: '/assets-processed/webp/material-glass.webp' },
  'material-oak': { width: 800, height: 452, src: '/assets-processed/webp/material-oak.webp' },
  'material-marble': { width: 800, height: 442, src: '/assets-processed/webp/material-marble.webp' },
  'material-tile': { width: 800, height: 462, src: '/assets-processed/webp/material-tile.webp' },
  'material-wheelbarrow': { width: 900, height: 486, src: '/assets-processed/webp/material-wheelbarrow.webp' },
  'tool-blueprint': { width: 729, height: 460, src: '/assets-processed/webp/tool-blueprint.webp' },
  'tool-hammer': { width: 700, height: 500, src: '/assets-processed/webp/tool-hammer.webp' },
  'tool-hardhat': { width: 700, height: 519, src: '/assets-processed/webp/tool-hardhat.webp' },
  'tool-level': { width: 800, height: 318, src: '/assets-processed/webp/tool-level.webp' },
  'tool-tape-measure': { width: 700, height: 487, src: '/assets-processed/webp/tool-tape-measure.webp' },
  'explode-wall-layers': { width: 729, height: 710, src: '/assets-processed/webp/explode-wall-layers.webp' },
  'explode-xray-house': { width: 1400, height: 933, src: '/assets-processed/webp/explode-xray-house.webp' },
  'founder-hardhat': { width: 700, height: 988, src: '/assets-processed/webp/founder-hardhat-arms-crossed.webp' },
  'founder-seated': { width: 800, height: 1136, src: '/assets-processed/webp/founder-seated.webp' },
  'project-golden-terrace': { width: 1020, height: 615, src: '/assets-processed/webp/project-golden-terrace-villa.webp' },
  'project-courtyard-villa': { width: 1020, height: 646, src: '/assets-processed/webp/project-courtyard-villa.webp' },
  'project-twin-duplex': { width: 1005, height: 639, src: '/assets-processed/webp/project-twin-duplex.webp' },
  'project-haven-bungalow': { width: 1020, height: 486, src: '/assets-processed/webp/project-haven-bungalow.webp' },
  'project-modern-family': { width: 994, height: 640, src: '/assets-processed/webp/project-modern-family-villa.webp' },
  'house-model-blueprint': { width: 1200, height: 749, src: '/assets-processed/webp/house-model-blueprint.webp' },
  'room-sofa-set': { width: 1000, height: 515, src: '/assets-processed/webp/room-sofa-set.webp' },
  'room-shelf': { width: 583, height: 767, src: '/assets-processed/webp/room-shelf.webp' },
  'room-wall-art': { width: 1000, height: 595, src: '/assets-processed/webp/room-wall-art.webp' },
  'sky-clouds': { width: 900, height: 567, src: '/assets-processed/webp/sky-clouds.webp' },
  'sky-birds': { width: 800, height: 325, src: '/assets-processed/webp/sky-birds.webp' },
  'badge-laurel': { width: 540, height: 532, src: '/assets-processed/webp/badge-laurel.webp' },
  'logo-option-1': { width: 400, height: 329, src: '/assets-processed/webp/logo-option-1.webp' }
};

export const chapters = [
  {
    id: 'ch1',
    chapterNum: '01',
    label: '01  EMPTY LAND',
    feeling: 'Possibility',
    headlineBefore: 'Every home begins with an open',
    highlight: 'horizon',
    headlineAfter: '.',
    body: 'Before the first survey stake enters the soil, we read the sunlight, winds, and contours of your parcel. What looks like bare earth is where generations will gather.',
    meta: ['Topographical Laser Scan', 'Solar Path Modeling', 'Soil Bearing Verification'],
    heroImage: 'stage-1-plot',
    satelliteImages: [
      { key: 'tool-blueprint', role: 'blueprint', alt: 'Architectural Site Blueprint' },
      { key: 'tool-level', role: 'level', alt: 'High Precision Spirit Level' },
      { key: 'sky-clouds', role: 'sky', alt: 'Sunlit Sky Horizon' }
    ]
  },
  {
    id: 'ch2',
    chapterNum: '02',
    label: '02  FOUNDATIONS',
    feeling: 'Trust',
    headlineBefore: 'Strength that never shows on the',
    highlight: 'surface',
    headlineAfter: '.',
    body: 'Poured deep into bedrock with seismic rebar cages and monolithic 4,000 PSI concrete. What remains hidden underground is what guarantees peace of mind for eighty years.',
    meta: ['4,000 PSI Monolithic Pour', 'Grade 60 Tied Steel', 'Vapor Barrier Membrane'],
    heroImage: 'stage-2-foundation',
    satelliteImages: [
      { key: 'machine-excavator', role: 'excavator', alt: 'Site Preparation Excavator' },
      { key: 'material-rebar-cage', role: 'rebar', alt: 'Structural Steel Rebar Cage' },
      { key: 'machine-mixer', role: 'mixer', alt: 'Precision Concrete Mixer' }
    ]
  },
  {
    id: 'ch3',
    chapterNum: '03',
    label: '03  RISING',
    feeling: 'Progress',
    headlineBefore: 'Watching the quiet architecture take',
    highlight: 'shape',
    headlineAfter: '.',
    body: 'Framing rises with millimetric precision. Beams lock into place, floor plates align, and the outline of your future living spaces appears against the clear sky.',
    meta: ['Engineered Glulam & Steel', 'Dry-In Within 14 Days', 'Zero-Defect Tolerances'],
    heroImage: 'stage-3-structure',
    satelliteImages: [
      { key: 'machine-crane', role: 'crane', alt: 'Tower Crane Lifting Structural Beams' },
      { key: 'machine-scaffold', role: 'scaffold', alt: 'Safety Scaffolding System' },
      { key: 'material-steel-beams', role: 'steel', alt: 'Industrial Steel Columns' }
    ]
  },
  {
    id: 'ch4',
    chapterNum: '04',
    label: '04  HOME',
    feeling: 'Pride',
    headlineBefore: 'A sanctuary crafted for a',
    highlight: 'lifetime',
    headlineAfter: '.',
    body: 'Warm cedar ceilings, triple-glazed glass capturing morning light, and acoustic serenity in every room. The transition from construction site to living warmth is complete.',
    meta: ['Net-Zero Energy Ready', 'Triple-Pane Acoustic Glazing', 'White Oak Millwork'],
    heroImage: 'stage-5-finished',
    satelliteImages: [
      { key: 'room-sofa-set', role: 'interior', alt: 'Custom Living Lounge Suite' },
      { key: 'room-shelf', role: 'shelf', alt: 'Architectural Display Millwork' },
      { key: 'badge-laurel', role: 'badge', alt: 'Master Craftsmanship Guild Award' }
    ]
  },
  {
    id: 'ch5',
    chapterNum: '05',
    label: '05  INSIDE THE WALLS',
    feeling: 'Confidence',
    headlineBefore: 'Quiet engineering hidden in every',
    highlight: 'layer',
    headlineAfter: '.',
    body: 'True longevity lives behind the drywall: airtight thermal envelopes, continuous acoustic baffles, and non-toxic materials selected for uncompromised air quality.',
    materials: [
      { name: 'Structural Glazing', spec: 'Low-E Argon Gas Filled', key: 'material-glass' },
      { name: 'Reinforced Core', spec: 'Vibrated Monolith Mix', key: 'material-concrete' },
      { name: 'Sustainably Harvested Oak', spec: 'FSC-Certified Rift Sawn', key: 'material-oak' },
      { name: 'Calacatta Marble', spec: 'Bookmatched Honed Slab', key: 'material-marble' }
    ],
    heroImage: 'explode-wall-layers',
    xrayImage: 'explode-xray-house'
  },
  {
    id: 'ch6',
    chapterNum: '06',
    label: '06  THE PERSON BEHIND IT',
    feeling: 'Warmth',
    isDark: true, // Charcoal background per prompt
    headlineBefore: 'Built on personal',
    highlight: 'accountability',
    headlineAfter: '.',
    quote: '“We don’t hand over keys until we are confident we would raise our own family under this roof. Every joint, every fastener, every finish carries our personal word.”',
    founderName: 'Arthur Vance',
    founderTitle: 'Founder & Principal Master Builder',
    founderNote: '32 years on job sites. 140+ bespoke homes delivered with zero structural warranty claims.',
    heroImage: 'founder-hardhat',
    credentials: [
      { metric: '100%', label: 'On-Time Handover Record' },
      { metric: '30-Yr', label: 'Structural Integrity Warranty' },
      { metric: '1:1', label: 'Direct Builder Access' }
    ]
  },
  {
    id: 'ch7',
    chapterNum: '07',
    label: '07  OUR HOMES',
    feeling: 'Proof',
    headlineBefore: 'Permanent landmarks built for real',
    highlight: 'families',
    headlineAfter: '.',
    body: 'Each residence is a bespoke response to land, light, and how our clients genuinely live.',
    projects: [
      {
        title: 'The Golden Terrace Villa',
        location: 'Highland Ridge',
        area: '4,850 sq ft',
        year: '2025',
        type: 'Cantilevered Contemporary',
        key: 'project-golden-terrace'
      },
      {
        title: 'Courtyard Glass Pavilion',
        location: 'Cascade Valley',
        area: '3,920 sq ft',
        year: '2024',
        type: 'Atrium Sanctuary',
        key: 'project-courtyard-villa'
      },
      {
        title: 'Twin Duplex Residences',
        location: 'West Shore',
        area: '5,200 sq ft',
        year: '2024',
        type: 'Modern Dual Living',
        key: 'project-twin-duplex'
      },
      {
        title: 'Haven Prairie Bungalow',
        location: 'Meadowlands',
        area: '3,100 sq ft',
        year: '2023',
        type: 'Single-Story Timber Home',
        key: 'project-haven-bungalow'
      },
      {
        title: 'Hillside Modern Villa',
        location: 'Pinewood Summit',
        area: '4,400 sq ft',
        year: '2023',
        type: 'Terraced Concrete & Glass',
        key: 'project-modern-family'
      }
    ]
  },
  {
    id: 'ch8',
    chapterNum: '08',
    label: '08  YOUR TURN',
    feeling: 'Invitation',
    headlineBefore: 'Let’s walk your land together and',
    highlight: 'listen',
    headlineAfter: '.',
    body: 'Whether you have secured a parcel or are sketching ideas on paper, our first conversation is simple: no sales push, just candid architectural advice and feasibility.',
    ctaPrimary: 'Book Land Feasibility Walk',
    ctaSecondary: 'Download Architectural Guide',
    heroImage: 'house-model-blueprint',
    satelliteImages: [
      { key: 'tool-hardhat', role: 'hardhat', alt: 'Safety Hardhat Ready For Site Visit' },
      { key: 'tool-hammer', role: 'hammer', alt: 'Precision Claw Hammer' }
    ],
    inquiryHighlights: [
      'Site topography & orientation audit',
      'Preliminary zoning & permit assessment',
      'Direct estimate with line-item transparency'
    ]
  }
];

export const navigationLinks = [
  { href: '#ch1', label: 'Land' },
  { href: '#ch2', label: 'Foundations' },
  { href: '#ch3', label: 'Rising' },
  { href: '#ch4', label: 'Home' },
  { href: '#ch5', label: 'The Craft' },
  { href: '#ch6', label: 'The Builder' },
  { href: '#ch7', label: 'Portfolio' },
  { href: '#ch8', label: 'Start' }
];
