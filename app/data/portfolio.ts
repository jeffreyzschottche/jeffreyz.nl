export type PortfolioPanel = 'home' | 'projects' | 'about' | 'contact'
export const scenes = [
  { id: 'walk', color: '#08bce9', nl: 'Stay moving.', en: 'Stay moving.', altNl: 'Zwart silhouet van een lopende man in een hoodie met witte oortjes op cyaan.', altEn: 'Black silhouette of a walking man in a hoodie with white earbuds on cyan.' },
  { id: 'code', color: '#f347a0', nl: 'Code & Create', en: 'Code & Create', altNl: 'Silhouet van een programmeur met oortjes achter een laptop op roze.', altEn: 'Silhouette of a programmer wearing earbuds at a laptop on pink.' },
  { id: 'ai', color: '#c1ee3e', nl: 'After tomorrow', en: 'After tomorrow', altNl: 'Een man in een hoodie houdt een zwevend AI-netwerk boven zijn hand op limegroen.', altEn: 'A hooded silhouette holds a floating AI network above his hand on lime green.' },
  { id: 'city', color: '#ffc331', nl: 'The world as playground', en: 'The world as playground', altNl: 'Een silhouet met rugzak loopt naar de dakrand en klimt langs de gevel naar beneden in een gele stad.', altEn: 'A silhouette with a backpack walks to the rooftop edge and climbs down the facade in a yellow city.' },
  { id: 'music', color: '#4163ff', nl: 'On the right frequency.', en: 'On the right frequency.', altNl: 'Een man met oortjes maakt muziek aan een synthesizer op elektrisch blauw.', altEn: 'A man wearing earbuds makes music on a synthesizer on electric blue.' },
  { id: 'design', color: '#a376ff', nl: 'Forming Ideas', en: 'Forming Ideas', altNl: 'Een silhouet ontwerpt met een stylus op een tekentablet op paars.', altEn: 'A silhouette designs with a stylus on a drawing tablet on purple.' },
  { id: 'experiment', color: '#ff812c', nl: 'Solving Puzzles', en: 'Solving Puzzles', altNl: 'Een gehurkte hoodiefiguur onderzoekt een geometrische puzzel op oranje.', altEn: 'A crouching hooded figure explores a geometric puzzle on orange.' },
  { id: 'ideas', color: '#ff4744', nl: 'It all starts with a thought.', en: 'It all starts with a thought.', altNl: 'Een zittend silhouet met oortjes schetst ideeën in een notitieboek op rood.', altEn: 'A seated silhouette wearing earbuds sketches ideas in a notebook on red.' },
] as const
export const portfolioCopy = {
  nl: {
    kicker: 'Van gedachte naar werkelijkheid.', intro: 'Ik ben Jeffrey. Software, AI, hardware, 3D, muziek, design en automatisering: ik ben thuis in vele domeinen. Ik maak graag technologie die je leven verbetert.', letsMake: 'Laten we kennismaken', footer: 'stay curious.',
    workTitle: 'Van idee naar iets echts.', workLabel: 'Geselecteerd werk', workIntro: 'Twee bedrijven die ik heb opgebouwd.',
    aitje: 'AI die voor je werkt. Van lokale modellen tot slimme automatisering voor organisaties.', media: 'Van eerste schets tot werkende app. Design, development en digitale ervaringen.',
    aboutLabel: 'Achter het silhouet', aboutTitle: 'Hoi, ik ben Jeffrey.', aboutIntro: 'Digital builder met 10+ jaar ervaring in development, design, creation, automation en scalability. Gevestigd in Amsterdam.', aboutBody: 'Mijn kracht zit in die breedte en de bereidheid om diep te gaan waar het telt. Ik verbind techniek en creativiteit om ideeën om te zetten in digitale producten, slimme automatisering en technologie die je leven verbetert.', aboutEnd: 'Van gedachte naar werkelijkheid.', skills: ['Development', 'AI & automatisering', 'Digital design', 'Creative direction', 'Muziek & sound', 'Strategie'],
    contactLabel: 'Een goed idee begint met een gesprek', contactTitle: 'Wat gaan we maken?', contactIntro: 'Een nieuw project, een experiment of gewoon even sparren? Stuur me een bericht.', email: 'Mail Jeffrey', close: 'Venster sluiten', back: 'Terug naar de homepage',
  },
  en: {
    kicker: 'From thought to reality.', intro: 'I’m Jeffrey. Software, AI, hardware, 3D, music, design and automation: I’m at home in many fields. I enjoy building technology that makes life better.', letsMake: 'Let’s connect', footer: 'stay curious.',
    workTitle: 'From idea to something real.', workLabel: 'Selected work', workIntro: 'Two businesses I’ve built.',
    aitje: 'AI that works for you. From local models to smart automation for organizations.', media: 'From the first sketch to a working app. Design, development and digital experiences.',
    aboutLabel: 'Behind the silhouette', aboutTitle: 'Hey, I’m Jeffrey.', aboutIntro: 'Digital builder with 10+ years of experience in development, design, creation, automation and scalability. Based in Amsterdam.', aboutBody: 'My strength lies in that breadth and my willingness to go deep where it matters. I connect technology and creativity to turn ideas into digital products, smart automation and technology that improves your life.', aboutEnd: 'From thought to reality.', skills: ['Development', 'AI & automation', 'Digital design', 'Creative direction', 'Music & sound', 'Strategy'],
    contactLabel: 'A good idea starts with a conversation', contactTitle: 'What shall we make?', contactIntro: 'A new project, an experiment or just a chat? Drop me a message.', email: 'Email Jeffrey', close: 'Close dialog', back: 'Back to the homepage',
  },
} as const
