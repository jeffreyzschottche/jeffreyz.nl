<script setup lang="ts">
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Person Schema
    {
      '@type': 'Person',
      '@id': 'https://jeffreyz.nl/#person',
      name: 'Jeffrey Zschot',
      givenName: 'Jeffrey',
      familyName: 'Zschot',
      url: 'https://jeffreyz.nl',
      email: 'hello@jeffreyz.nl',
      image: 'https://jeffreyz.nl/images/portrait.webp',
      description: 'Digital builder uit Amsterdam. Expertise in software development, AI engineering, automation, content creation en creative direction.',
      jobTitle: 'Digital Builder',
      worksFor: [
        {
          '@type': 'Organization',
          name: 'AITJE.com',
          url: 'https://aitje.com'
        },
        {
          '@type': 'Organization',
          name: 'Zschot Media',
          url: 'https://zschotmedia.com'
        }
      ],
      knowsAbout: [
        'Software Development',
        'AI Engineering',
        'Machine Learning',
        'Web Development',
        'Vue.js',
        'Nuxt.js',
        'TypeScript',
        'Node.js',
        'Automation',
        'Content Creation',
        'Creative Direction',
        'Brand Development',
        'Video Production',
        'Music Production',
        '3D Design',
        'UX Design',
        'Product Strategy'
      ],
      sameAs: [
        'https://www.linkedin.com/in/jeffreyzschot',
        'https://www.instagram.com/jeffreyzschot',
        'https://www.tiktok.com/@jeffreyzschot',
        'https://aitje.com',
        'https://zschotmedia.com'
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amsterdam',
        addressRegion: 'Noord-Holland',
        addressCountry: 'NL'
      },
      nationality: {
        '@type': 'Country',
        name: 'Netherlands'
      }
    },
    // WebSite Schema
    {
      '@type': 'WebSite',
      '@id': 'https://jeffreyz.nl/#website',
      url: 'https://jeffreyz.nl',
      name: 'Jeffrey Zschot - Digital Builder',
      description: 'Portfolio en persoonlijke website van Jeffrey Zschot, digital builder uit Amsterdam.',
      publisher: { '@id': 'https://jeffreyz.nl/#person' },
      inLanguage: ['nl', 'en'],
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://jeffreyz.nl/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    // WebPage Schema
    {
      '@type': 'WebPage',
      '@id': 'https://jeffreyz.nl/#webpage',
      url: 'https://jeffreyz.nl',
      name: 'Jeffrey Zschot - Digital Builder | Amsterdam',
      isPartOf: { '@id': 'https://jeffreyz.nl/#website' },
      about: { '@id': 'https://jeffreyz.nl/#person' },
      description: 'Jeffrey Zschot is een digital builder uit Amsterdam. Expertise in software development, AI engineering, automation, content creation en creative direction.',
      inLanguage: ['nl', 'en'],
      datePublished: '2024-01-01',
      dateModified: '2026-09-14'
    },
    // LocalBusiness / ProfessionalService Schema
    {
      '@type': 'ProfessionalService',
      '@id': 'https://jeffreyz.nl/#business',
      name: 'Jeffrey Zschot - Digital Builder',
      url: 'https://jeffreyz.nl',
      email: 'hello@jeffreyz.nl',
      description: 'Digital builder services: software development, AI engineering, automation, content creation, creative direction.',
      image: 'https://jeffreyz.nl/images/portrait.webp',
      founder: { '@id': 'https://jeffreyz.nl/#person' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amsterdam',
        addressRegion: 'Noord-Holland',
        postalCode: '1000',
        addressCountry: 'NL'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.3676,
        longitude: 4.9041
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'Netherlands'
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Europe'
        },
        {
          '@type': 'Place',
          name: 'Worldwide'
        }
      ],
      serviceType: [
        'Software Development',
        'AI Engineering',
        'Web Development',
        'Automation',
        'Content Creation',
        'Creative Direction',
        'Brand Development',
        'Digital Strategy'
      ],
      priceRange: '$$',
      knowsLanguage: ['nl', 'en']
    }
  ]
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})
</script>

<template>
  <div />
</template>
