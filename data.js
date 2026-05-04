// ===== SHARED DEFAULT DATA =====
// Aceste date sunt folosite de index.html și admin.html
// Modificările salvate în localStorage au prioritate

const DEFAULT_PRODUCTS = [
  { id: '13mini', name: 'iPhone 13 Mini', series: '13',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Sternenlicht', hex: '#F0EDE0' },
      { name: 'Blau', hex: '#7B99BF' },
      { name: 'Pink', hex: '#F5C7C3' },
      { name: 'Grün', hex: '#ACD0B0' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 420 },
      { capacity: '256 GB', price: 475 },
      { capacity: '512 GB', price: 510 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/b4e67e77a_generated_image.png'
  },
  { id: '13', name: 'iPhone 13', series: '13',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Sternenlicht', hex: '#F0EDE0' },
      { name: 'Blau', hex: '#7B99BF' },
      { name: 'Pink', hex: '#F5C7C3' },
      { name: 'Grün', hex: '#ACD0B0' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 435 },
      { capacity: '256 GB', price: 490 },
      { capacity: '512 GB', price: 525 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/4bbefb701_generated_image.png'
  },
  { id: '13pro', name: 'iPhone 13 Pro', series: '13',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Graphit', hex: '#5A5A5E' },
      { name: 'Gold', hex: '#E8D5A3' },
      { name: 'Silber', hex: '#E3E3E8' },
      { name: 'Sierrablau', hex: '#7EA4C0' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 490 },
      { capacity: '256 GB', price: 545 },
      { capacity: '512 GB', price: 580 },
      { capacity: '1 TB', price: 615 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/e83a28edd_generated_image.png'
  },
  { id: '13promax', name: 'iPhone 13 Pro Max', series: '13',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Graphit', hex: '#5A5A5E' },
      { name: 'Gold', hex: '#E8D5A3' },
      { name: 'Silber', hex: '#E3E3E8' },
      { name: 'Sierrablau', hex: '#7EA4C0' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 520 },
      { capacity: '256 GB', price: 575 },
      { capacity: '512 GB', price: 610 },
      { capacity: '1 TB', price: 645 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/9da0d3f5c_generated_image.png'
  },
  { id: '14', name: 'iPhone 14', series: '14',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Mitternacht', hex: '#1C1C2E' },
      { name: 'Sternenlicht', hex: '#F0EDE0' },
      { name: 'Blau', hex: '#7B99BF' },
      { name: 'Violett', hex: '#9B8EBD' },
      { name: 'Gelb', hex: '#F5E279' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 440 },
      { capacity: '256 GB', price: 495 },
      { capacity: '512 GB', price: 530 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/9eb9372ac_generated_image.png'
  },
  { id: '14plus', name: 'iPhone 14 Plus', series: '14',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Mitternacht', hex: '#1C1C2E' },
      { name: 'Sternenlicht', hex: '#F0EDE0' },
      { name: 'Blau', hex: '#7B99BF' },
      { name: 'Violett', hex: '#9B8EBD' },
      { name: 'Gelb', hex: '#F5E279' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 520 },
      { capacity: '256 GB', price: 575 },
      { capacity: '512 GB', price: 610 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/484349515_generated_image.png'
  },
  { id: '14pro', name: 'iPhone 14 Pro', series: '14',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Space Schwarz', hex: '#2C2C34' },
      { name: 'Silber', hex: '#E3E3E8' },
      { name: 'Dunkellila', hex: '#5A4E6F' },
      { name: 'Gold', hex: '#E8D5A3' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 570 },
      { capacity: '256 GB', price: 625 },
      { capacity: '512 GB', price: 660 },
      { capacity: '1 TB', price: 695 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/b92c9f950_generated_image.png'
  },
  { id: '14promax', name: 'iPhone 14 Pro Max', series: '14',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Space Schwarz', hex: '#2C2C34' },
      { name: 'Silber', hex: '#E3E3E8' },
      { name: 'Dunkellila', hex: '#5A4E6F' },
      { name: 'Gold', hex: '#E8D5A3' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 590 },
      { capacity: '256 GB', price: 645 },
      { capacity: '512 GB', price: 680 },
      { capacity: '1 TB', price: 715 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/b807ff8a8_generated_image.png'
  },
  { id: '15', name: 'iPhone 15', series: '15',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Blau', hex: '#7B99BF' },
      { name: 'Grün', hex: '#ACD0B0' },
      { name: 'Gelb', hex: '#F5E279' },
      { name: 'Pink', hex: '#F5C7C3' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 500 },
      { capacity: '256 GB', price: 555 },
      { capacity: '512 GB', price: 590 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/15bcb8448_generated_image.png'
  },
  { id: '15plus', name: 'iPhone 15 Plus', series: '15',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Blau', hex: '#7B99BF' },
      { name: 'Grün', hex: '#ACD0B0' },
      { name: 'Gelb', hex: '#F5E279' },
      { name: 'Pink', hex: '#F5C7C3' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 600 },
      { capacity: '256 GB', price: 655 },
      { capacity: '512 GB', price: 690 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/86a9d1f71_generated_image.png'
  },
  { id: '15pro', name: 'iPhone 15 Pro', series: '15',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Naturtitan', hex: '#B8A98E' },
      { name: 'Blautitan', hex: '#7A8B9E' },
      { name: 'Weißtitan', hex: '#E5E0D8' },
      { name: 'Schwarztitan', hex: '#474749' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 680 },
      { capacity: '256 GB', price: 735 },
      { capacity: '512 GB', price: 770 },
      { capacity: '1 TB', price: 805 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/e78fe0469_generated_image.png'
  },
  { id: '15promax', name: 'iPhone 15 Pro Max', series: '15',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Naturtitan', hex: '#B8A98E' },
      { name: 'Blautitan', hex: '#7A8B9E' },
      { name: 'Weißtitan', hex: '#E5E0D8' },
      { name: 'Schwarztitan', hex: '#474749' }
    ],
    storageOptions: [
      { capacity: '256 GB', price: 810 },
      { capacity: '512 GB', price: 865 },
      { capacity: '1 TB', price: 900 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/420f6eb48_generated_image.png'
  },
  { id: '16', name: 'iPhone 16', series: '16',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Weiß', hex: '#F5F5F0' },
      { name: 'Blaugrün', hex: '#6EC4BE' },
      { name: 'Pink', hex: '#F5C7C3' },
      { name: 'Ultramarin', hex: '#2C5090' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 615 },
      { capacity: '256 GB', price: 670 },
      { capacity: '512 GB', price: 705 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/b64f507dd_generated_image.png'
  },
  { id: '16plus', name: 'iPhone 16 Plus', series: '16',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Weiß', hex: '#F5F5F0' },
      { name: 'Blaugrün', hex: '#6EC4BE' },
      { name: 'Pink', hex: '#F5C7C3' },
      { name: 'Ultramarin', hex: '#2C5090' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 750 },
      { capacity: '256 GB', price: 805 },
      { capacity: '512 GB', price: 840 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/7ba99c39c_generated_image.png'
  },
  { id: '16pro', name: 'iPhone 16 Pro', series: '16',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Wüstentitan', hex: '#C5B3A0' },
      { name: 'Titansilber', hex: '#A8A8AB' },
      { name: 'Weißtitan', hex: '#EAE5DB' },
      { name: 'Schwarztitan', hex: '#3A3A3C' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 840 },
      { capacity: '256 GB', price: 895 },
      { capacity: '512 GB', price: 930 },
      { capacity: '1 TB', price: 965 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/b64cb88cd_generated_image.png'
  },
  { id: '16promax', name: 'iPhone 16 Pro Max', series: '16',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Wüstentitan', hex: '#C5B3A0' },
      { name: 'Titansilber', hex: '#A8A8AB' },
      { name: 'Weißtitan', hex: '#EAE5DB' },
      { name: 'Schwarztitan', hex: '#3A3A3C' }
    ],
    storageOptions: [
      { capacity: '256 GB', price: 1040 },
      { capacity: '512 GB', price: 1095 },
      { capacity: '1 TB', price: 1130 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/64031f87d_generated_image.png'
  },
  { id: '17', name: 'iPhone 17', series: '17',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Sternenlicht', hex: '#F0EDE0' },
      { name: 'Blau', hex: '#7B99BF' },
      { name: 'Grün', hex: '#ACD0B0' },
      { name: 'Pink', hex: '#F5C7C3' }
    ],
    storageOptions: [
      { capacity: '128 GB', price: 720 },
      { capacity: '256 GB', price: 775 },
      { capacity: '512 GB', price: 810 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/a523791a3_generated_image.png'
  },
  { id: '17pro', name: 'iPhone 17 Pro', series: '17',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Silber', hex: '#E3E3E8' },
      { name: 'Orange', hex: '#E87C3E' },
      { name: 'Dunkelblau', hex: '#3D2D6B' }
    ],
    storageOptions: [
      { capacity: '256 GB', price: 1080 },
      { capacity: '512 GB', price: 1135 },
      { capacity: '1 TB', price: 1170 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/265306b29_photo_2026-04-12_10-33-13.jpg'
  },
  { id: '17promax', name: 'iPhone 17 Pro Max', series: '17',
    colors: [
      { name: 'Schwarz', hex: '#1D1D1F' },
      { name: 'Silber', hex: '#E3E3E8' },
      { name: 'Orange', hex: '#E87C3E' },
      { name: 'Dunkelblau', hex: '#3D2D6B' }
    ],
    storageOptions: [
      { capacity: '256 GB', price: 1150 },
      { capacity: '512 GB', price: 1205 },
      { capacity: '1 TB', price: 1240 }
    ],
    img: 'https://media.base44.com/images/public/69d963127f5111c68c96666d/8e597a72a_photo_2026-04-13_10-26-11.jpg'
  },
];

const DEFAULT_CATEGORIES = [
  { id: '13', label: 'iPhone 13', icon: 'smartphone' },
  { id: '14', label: 'iPhone 14', icon: 'smartphone' },
  { id: '15', label: 'iPhone 15', icon: 'smartphone' },
  { id: '16', label: 'iPhone 16', icon: 'smartphone' },
  { id: '17', label: 'iPhone 17', icon: 'smartphone' },
];

const DEFAULT_SITE_CONTENT = {
  heroBadge: 'Alle Modelle auf Lager',
  heroTitle1: 'iPhone',
  heroTitle2: 'Kollektion',
  heroDesc: 'Von iPhone 13 bis iPhone 17 — alle Modelle auf Lager.',
  heroHighlight: 'Kostenloser Versand',
  heroDelivery: 'Lieferung in 7 Werktagen',
  counter1Value: 19,
  counter1Label: 'Modelle',
  counter2Label: 'Farben',
  sectionTitle: 'Die Kollektion',
  sectionDesc: 'Finde dein perfektes iPhone — jetzt mit gratis Versand',
  benefitsTitle: 'Warum iShop Stock?',
  benefitsDesc: 'Wir machen den iPhone-Kauf einfacher denn je',
  ctaTitle: 'Verpasse kein Update',
  ctaDesc: 'Melde dich an und erhalte als Erster Zugang zu neuen Modellen und exklusiven Angeboten.',
  contactEmail: 'istore-stock@shop.com',
  contactPhone: '015777255',
  footerCopyright: '© 2025 iStore Stock. Alle Rechte vorbehalten.',
  iban: 'DE89 3704 0044 0532 0130 00',
  bic: 'COBADEFFXXX',
  bankName: 'Commerzbank',
  accountHolder: 'iStore Stock',
};