const PRIZEBOARD_LIST = [
  {
    boardName: 'Big Brize Board',
    subTitle: 'Top Point Earners for Top Prizes',
    id: 'BB',
    sponsorId: '',
    isGeo: 0,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'LB01',
    startDate: '',
    expiration: '',
    tokensUpgrade: 0,
    purchaseUpgrade: 0,
    details: [],
  },
  {
    boardName: 'Star Board',
    subTitle: "Use your Stars for Free Prizes - 2 for 1's - Redeeming",
    id: 'SR',
    sponsorId: '',
    isGeo: 0,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'LB01',
    startDate: '',
    expiration: '',
    tokensUpgrade: 0,
    purchaseUpgrade: 0,
    details: [],
  },
  {
    boardName: 'In-Stadium',
    subTitle: 'Exchange at the Stadium Live',
    id: 'IST',
    sponsorId: 'kcchiefs-001-pl-sta-na-nfl',
    isGeo: 1,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'SE001',
    startDate: '',
    expiration: '',
    tokensUpgrade: 0,
    purchaseUpgrade: 0,
    details: [],
  },
  {
    boardName: 'Free Zone',
    subTitle: 'PLAY for FREE, WIN for FREE - NEW Board Every Week',
    id: 'FZ',
    sponsorId: '',
    isGeo: 0,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'SE001',
    startDate: '',
    expiration: '',
    tokensUpgrade: 0,
    purchaseUpgrade: 0,
    details: [],
  },
  {
    boardName: 'Prize Plus Board',
    subTitle: 'Travel, Shows, Gear',
    id: 'P5',
    sponsorId: '',
    isGeo: 0,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'SE001',
    startDate: '',
    expiration: '',
    tokensUpgrade: 5000,
    purchaseUpgrade: 5,
    primaryBackgroundColor: '#9368aa',
    secondaryBackgroundColor: '#000000',
    details: [],
  },
  {
    boardName: 'Season Board',
    subTitle: 'Cars, Travel, Adventure',
    id: 'S10',
    sponsorId: '',
    isGeo: 0,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'SE001',
    startDate: '',
    expiration: '',
    tokensUpgrade: 10000,
    purchaseUpgrade: 10,
    primaryBackgroundColor: '#7736dd',
    secondaryBackgroundColor: '#000000',
    details: [],
  },

  {
    boardName: 'Tickets',
    subTitle: 'Sports Events, Concerts, Festivals, Theatres, Movies,Travel',
    id: 'SRTi',
    sponsorId: '',
    isGeo: 0,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'LB01',
    startDate: '',
    expiration: '',
    tokensUpgrade: 0,
    purchaseUpgrade: 0,
    primaryBackgroundColor: '',
    secondaryBackgroundColor: '',
    details: [],
    top: -18,
    left: -51,
  },
  {
    boardName: 'Gear',
    subTitle: 'Sports, Equipment, Accessories, Devices, Gadgets',
    id: 'SRGr',
    sponsorId: '',
    isGeo: 0,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'LB01',
    startDate: '',
    expiration: '',
    tokensUpgrade: 0,
    purchaseUpgrade: 0,
    primaryBackgroundColor: '',
    secondaryBackgroundColor: '',
    details: [],
    top: -56,
    left: 0,
  },
  {
    boardName: 'Travel',
    subTitle:
      'Sport Events, Concerts, Adventure, Golf, Carribean, Europe, Asia, Snow',
    id: 'SRTv',
    sponsorId: '',
    isGeo: 0,
    sportIdType: 0,
    boardImage: 'featured.jpg',
    seasonGroup: 'LB01',
    startDate: '',
    expiration: '',
    tokensUpgrade: 0,
    purchaseUpgrade: 0,
    primaryBackgroundColor: '',
    secondaryBackgroundColor: '',
    details: [],
    top: -18,
    left: 51,
  },
  /*
    {
      boardName: 'Adventure',
      subTitle: '',
      id: 'SRAv',
      sponsorId: '',
      isGeo: 0,
      sportIdType: 0,
      boardImage: 'featured.jpg',
      seasonGroup: 'LB01',
      startDate: '',
      expiration: '',
      tokensUpgrade: 0,
      purchaseUpgrade: 0,
      primaryBackgroundColor: '',
      secondaryBackgroundColor: '',
      details: [],
      top: 56,
      left: -33,
    },
    {
      boardName: 'Training',
      subTitle: '',
      id: 'SRTr',
      sponsorId: '',
      isGeo: 0,
      sportIdType: 0,
      boardImage: 'featured.jpg',
      seasonGroup: 'LB01',
      startDate: '',
      expiration: '',
      tokensUpgrade: 0,
      purchaseUpgrade: 0,
      primaryBackgroundColor: '',
      secondaryBackgroundColor: '',
      details: [],
      top: 56,
      left: 33,
    },
    {
      boardName: 'Stadium',
      subTitle: '',
      id: 'SRSta',
      sponsorId: '',
      isGeo: true,
      sportIdType: 0,
      boardImage: 'featured.jpg',
      seasonGroup: 'LB01',
      startDate: '',
      expiration: '',
      tokensUpgrade: 0,
      purchaseUpgrade: 0,
      primaryBackgroundColor: '',
      secondaryBackgroundColor: '',
      details: [],
      top: 5,
      left: 0,
    },
  */
]

const PRIZEBOARD_DETAIL_LIST = [
  {
    title: 'UX 200 F Sport',
    subTitle: 'Lexus for Exploration',
    preTitle: '',
    shortName: 'ux200',
    qty: 1,
    currencyType: 'Placement',
    value: 1,
    seasonId: 'LB01',
    boardTypeId: 'BB',
    prizeBoardId: 'LB01BB',
    boardOrder: 1,
    images: ['prize-front.jpg', 'prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: 0,
  },
  {
    title: 'Las Vegas for 2',
    subTitle: '4 Nights + Flight + 1 Show',
    preTitle: '',
    shortName: 'vegas2',
    qty: 1,
    currencyType: 'Placement',
    value: 2,
    seasonId: 'LB01',
    boardTypeId: 'BB',
    prizeBoardId: 'LB01BB',
    boardOrder: 2,
    images: ['prize-front.jpg', 'prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'SXSW – for Four',
    subTitle: 'Inc. Flight + Hotel',
    preTitle: '',
    shortName: 'sxsw',
    qty: 1,
    currencyType: 'Placement',
    value: 3,
    seasonId: 'LB01',
    boardTypeId: 'BB',
    prizeBoardId: 'LB01BB',
    boardOrder: 3,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Two Tickets',
    subTitle: 'Awarded at the End of Game',
    preTitle: 'To the Next Game',
    shortName: 'kcchiefs_01',
    qty: 1,
    currencyType: 'Points',
    value: 60000,
    seasonId: 'SE001',
    boardTypeId: 'IST',
    prizeBoardId: 'SE001IST',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: 'kcchiefs-001-pl-sta-na-nfl',
    claimType: 'Pick-Up',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Dinner w/ the Team',
    subTitle: 'Meet the Team',
    preTitle: '',
    shortName: 'kcchiefs_02',
    qty: 1,
    currencyType: 'Points',
    value: 55000,
    seasonId: 'SE001',
    boardTypeId: 'IST',
    prizeBoardId: 'SE001IST',
    boardOrder: 2,
    images: ['prizeboard.jpg'],
    sponsorId: 'kcchiefs-001-pl-sta-na-nfl',
    claimType: 'Pick-Up',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Meet the Team',
    subTitle: 'You and 3 Guests',
    preTitle: '',
    shortName: 'kcchiefs_03',
    qty: 2,
    currencyType: 'Points',
    value: 50000,
    seasonId: 'SE001',
    boardTypeId: 'IST',
    prizeBoardId: 'SE001IST',
    boardOrder: 3,
    images: ['prizeboard.jpg'],
    sponsorId: 'kcchiefs-001-pl-sta-na-nfl',
    claimType: 'Pick-Up',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Autographed Jersey',
    subTitle: 'Of your Favorite Player',
    preTitle: '',
    shortName: 'kcchiefs_04',
    qty: 3,
    currencyType: 'Points',
    value: 40000,
    seasonId: 'SE001',
    boardTypeId: 'IST',
    prizeBoardId: 'SE001IST',
    boardOrder: 4,
    images: ['prizeboard.jpg'],
    sponsorId: 'kcchiefs-001-pl-sta-na-nfl',
    claimType: 'Pick-Up',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Home Team Cooler',
    subTitle: 'Great for a Tailgate',
    preTitle: '',
    shortName: 'kcchiefs_05',
    qty: 5,
    currencyType: 'Points',
    value: 38000,
    seasonId: 'SE001',
    boardTypeId: 'IST',
    prizeBoardId: 'SE001IST',
    boardOrder: 5,
    images: ['prizeboard.jpg'],
    sponsorId: 'kcchiefs-001-pl-sta-na-nfl',
    claimType: 'Pick-Up',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Team Ball Cap',
    subTitle: 'Home or Visitor',
    preTitle: '',
    shortName: 'kcchiefs_06',
    qty: 10,
    currencyType: 'Points',
    value: 35000,
    seasonId: 'SE001',
    boardTypeId: 'IST',
    prizeBoardId: 'SE001IST',
    boardOrder: 6,
    images: ['prizeboard.jpg'],
    sponsorId: 'kcchiefs-001-pl-sta-na-nfl',
    claimType: 'Pick-Up',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Las Vegas',
    subTitle: 'MGM Hotel + Round Trip',
    preTitle: 'NFL Weekend',
    shortName: 'vegaswk',
    qty: 1,
    currencyType: 'Points',
    value: 500000,
    seasonId: 'SE001',
    boardTypeId: 'FZ',
    prizeBoardId: 'SE001FZ',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Hollywood Universal Studios',
    subTitle: '3-Day Hotel + Air',
    preTitle: '',
    shortName: 'hwstudios',
    qty: 1,
    currencyType: 'Points',
    value: 400000,
    seasonId: 'SE001',
    boardTypeId: 'FZ',
    prizeBoardId: 'SE001FZ',
    boardOrder: 2,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Regal Theatres',
    subTitle: 'Tickets for 4',
    preTitle: '',
    shortName: 'regalthtr',
    qty: 5,
    currencyType: 'Points',
    value: 200000,
    seasonId: 'SE001',
    boardTypeId: 'FZ',
    prizeBoardId: 'SE001FZ',
    boardOrder: 3,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'UBER',
    subTitle: '35 Mile Credit',
    preTitle: '',
    shortName: 'uber35m',
    qty: 10,
    currencyType: 'Points',
    value: 150000,
    seasonId: 'SE001',
    boardTypeId: 'FZ',
    prizeBoardId: 'SE001FZ',
    boardOrder: 4,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'Promo Code',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Amazon Coins',
    subTitle: '5,000 Coins',
    preTitle: '',
    shortName: 'amz5kcoin',
    qty: 20,
    currencyType: 'Points',
    value: 100000,
    seasonId: 'SE001',
    boardTypeId: 'FZ',
    prizeBoardId: 'SE001FZ',
    boardOrder: 5,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'OffSite',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Spotify',
    subTitle: 'Album Download',
    preTitle: 'Your Choice',
    shortName: 'spotifyalb',
    qty: 10,
    currencyType: 'Points',
    value: 150000,
    seasonId: 'SE001',
    boardTypeId: 'FZ',
    prizeBoardId: 'SE001FZ',
    boardOrder: 6,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'Promo Code',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Cancun',
    subTitle: 'Hotel + Air Round Trip',
    preTitle: '7 Day Vacation',
    shortName: 'cancun7',
    qty: 1,
    currencyType: 'Points',
    value: 800000,
    seasonId: 'SE001',
    boardTypeId: 'P5',
    prizeBoardId: 'SE001P5',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Miami 4 Day Weekend',
    subTitle: 'South Beach – Hotel + Air',
    preTitle: '',
    shortName: 'miami4sb',
    qty: 2,
    currencyType: 'Points',
    value: 650000,
    seasonId: 'SE001',
    boardTypeId: 'P5',
    prizeBoardId: 'SE001P5',
    boardOrder: 2,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Palm Springs',
    subTitle: 'Coachella Weekend',
    preTitle: '',
    shortName: 'coachellaps',
    qty: 2,
    currencyType: 'Points',
    value: 550000,
    seasonId: 'SE001',
    boardTypeId: 'P5',
    prizeBoardId: 'SE001P5',
    boardOrder: 3,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Las Vegas Weekend',
    subTitle: 'MGM Grand',
    preTitle: '',
    shortName: 'vegasmgm',
    qty: 3,
    currencyType: 'Points',
    value: 450000,
    seasonId: 'SE001',
    boardTypeId: 'P5',
    prizeBoardId: 'SE001P5',
    boardOrder: 4,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'NFL Playoffs',
    subTitle: '2 Tickets to a Regional',
    preTitle: '',
    shortName: 'nflpotickets',
    qty: 5,
    currencyType: 'Points',
    value: 400000,
    seasonId: 'SE001',
    boardTypeId: 'P5',
    prizeBoardId: 'SE001P5',
    boardOrder: 5,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Adventure Out-Back',
    subTitle: 'Weekend for 4',
    preTitle: '',
    shortName: 'outback',
    qty: 10,
    currencyType: 'Points',
    value: 350000,
    seasonId: 'SE001',
    boardTypeId: 'P5',
    prizeBoardId: 'SE001P5',
    boardOrder: 6,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'BMW Electric',
    subTitle: "This Year's Model",
    preTitle: '',
    shortName: 'bmw',
    qty: 1,
    currencyType: 'Points',
    value: 1200000,
    seasonId: 'SE001',
    boardTypeId: 'S10',
    prizeBoardId: 'SE001S10',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Caribean, Cruise the Islands',
    subTitle: '7 Day Vacaction Package',
    preTitle: '',
    shortName: 'caricruise',
    qty: 1,
    currencyType: 'Points',
    value: 1000000,
    seasonId: 'SE001',
    boardTypeId: 'S10',
    prizeBoardId: 'SE001S10',
    boardOrder: 2,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'SXSW',
    subTitle: 'Up to 4 – Event Package',
    preTitle: '',
    shortName: 'sxsw4',
    qty: 2,
    currencyType: 'Points',
    value: 900000,
    seasonId: 'SE001',
    boardTypeId: 'S10',
    prizeBoardId: 'SE001S10',
    boardOrder: 3,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Las Vegas Weekend',
    subTitle: 'At the MGM Grand',
    preTitle: '',
    shortName: 'vegasmgm',
    qty: 3,
    currencyType: 'Points',
    value: 850000,
    seasonId: 'SE001',
    boardTypeId: 'S10',
    prizeBoardId: 'SE001S10',
    boardOrder: 4,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Adventure Out-Back',
    subTitle: 'Weekend for 4',
    preTitle: '',
    shortName: 'outback',
    qty: 5,
    currencyType: 'Points',
    value: 800000,
    seasonId: 'SE001',
    boardTypeId: 'S10',
    prizeBoardId: 'SE001S10',
    boardOrder: 5,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'NFL Playoffs',
    subTitle: '2 Tickets to a Regional',
    preTitle: '',
    shortName: 'nflpotickets',
    qty: 5,
    currencyType: 'Points',
    value: 400000,
    seasonId: 'SE001',
    boardTypeId: 'S10',
    prizeBoardId: 'SE001S10',
    boardOrder: 6,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Small Luxury Hotels',
    subTitle: 'Of the World – Vacation Package',
    preTitle: '',
    shortName: 'ad_slh',
    qty: 0,
    currencyType: 'AD',
    value: 0,
    seasonId: 'LB01',
    boardTypeId: 'AD',
    prizeBoardId: 'LB01AD',
    boardOrder: 0,
    images: ['prizeboard.jpg'],
    sponsorId: 'pan-001-all',
    claimType: 'ADVideo',
    claimInfo: 'promo.html',
    videoName: 'promo.mp4',
    rewardCurrency: 'Tokens',
    rewardValue: '50',
  },
  {
    title: 'Training & Gear',
    subTitle: 'Our Offers',
    preTitle: '',
    shortName: 'ad_tg',
    qty: 0,
    currencyType: 'AD',
    value: 0,
    seasonId: 'LB01',
    boardTypeId: 'AD',
    prizeBoardId: 'LB01AD',
    boardOrder: 0,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'ADRead',
    claimInfo: 'promo.html',
    videoName: '',
    rewardCurrency: 'Points',
    rewardValue: '4000',
  },

  {
    title: 'Golf Balls',
    subTitle: 'Set of 3',
    preTitle: '',
    shortName: 'golfballs3',
    qty: 10,
    discount: 30,
    currencyType: 'Stars',
    value: 3,
    seasonId: 'LB01',
    boardTypeId: 'SRGr',
    prizeBoardId: 'SE001SRGr',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Tennis Balls',
    subTitle: 'Wilson 2 – Pack of 3',
    preTitle: '',
    shortName: 'tennisballs3',
    qty: 10,
    discount: 30,
    currencyType: 'Stars',
    value: 3,
    seasonId: 'LB01',
    boardTypeId: 'SRGr',
    prizeBoardId: 'SE001SRGr',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Football',
    subTitle: 'Premium',
    preTitle: '',
    shortName: 'footballprem',
    qty: 10,
    discount: 40,
    currencyType: 'Stars',
    value: 3,
    seasonId: 'LB01',
    boardTypeId: 'SRGr',
    prizeBoardId: 'SE001SRGr',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Soccer Ball',
    subTitle: 'Training Edition',
    preTitle: '',
    shortName: 'soccerballte',
    qty: 10,
    discount: 30,
    currencyType: 'Stars',
    value: 5,
    seasonId: 'LB01',
    boardTypeId: 'SRGr',
    prizeBoardId: 'SE001SRGr',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Shin Guards',
    subTitle: 'Soccer',
    preTitle: '',
    shortName: 'shinsoccer',
    qty: 10,
    discount: 35,
    currencyType: 'Stars',
    value: 5,
    seasonId: 'LB01',
    boardTypeId: 'SRGr',
    prizeBoardId: 'SE001SRGr',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Golf Club Covers',
    subTitle: 'Premium',
    preTitle: '',
    shortName: 'clubcovers',
    qty: 10,
    discount: 40,
    currencyType: 'Stars',
    value: 5,
    seasonId: 'LB01',
    boardTypeId: 'SRGr',
    prizeBoardId: 'SE001SRGr',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
  {
    title: 'Climbing Gloves',
    subTitle: 'Black Diamond',
    preTitle: '',
    shortName: 'glovesclimb',
    qty: 10,
    discount: 25,
    currencyType: 'Stars',
    value: 10,
    seasonId: 'LB01',
    boardTypeId: 'SRGr',
    prizeBoardId: 'SE001SRGr',
    boardOrder: 1,
    images: ['prizeboard.jpg'],
    sponsorId: '',
    claimType: 'E-Mail',
    claimInfo: 'instructions',
    videoName: '',
    rewardCurrency: '',
    rewardValue: '',
  },
]

const getPrizeBoardsx = () => {
  return new Promise(resolve => {
    PRIZEBOARD_LIST.forEach(item => {
      const details = PRIZEBOARD_DETAIL_LIST.filter(
        o =>
          o.boardTypeId.toLowerCase() === item.id.toLowerCase() &&
          o.seasonId.toLowerCase() === item.seasonGroup.toLowerCase()
      )
      if (details) {
        item.details = details
      }
    })

    return resolve(PRIZEBOARD_LIST)
  })
}

const getPrizeBoards = () => {
  return new Promise(resolve => {
    return resolve(PRIZEBOARD_LIST)
  })
}

const getPrizes = () => {
  return new Promise(resolve => {
    return resolve(PRIZEBOARD_DETAIL_LIST)
  })
}

const getStarCategories = () => {
  return new Promise(resolve => {
    let filtered = PRIZEBOARD_LIST.filter(
      o => o.id.match(new RegExp('sr', 'gi')) && o.id.toLowerCase() !== 'sr'
    )
    resolve(filtered)
  })
}

const getStarPrizesByCategory = category => {
  return new Promise(resolve => {
    let filtered = PRIZEBOARD_DETAIL_LIST.filter(
      o => o.boardTypeId === category.id && o.seasonId === category.seasonGroup
    )
    resolve(filtered)
  })
}

const getPrizesByCategory = category => {
  return new Promise(resolve => {
    let filtered = PRIZEBOARD_DETAIL_LIST.filter(
      o => o.boardTypeId === category.id && o.seasonId === category.seasonGroup
    )
    resolve(filtered)
  })
}

const debitPrize = item => {
  return new Promise((resolve, reject) => {
    let prize = PRIZEBOARD_DETAIL_LIST.filter(
      o =>
        o.shortName === item.shortName &&
        o.seasonId === item.seasonId &&
        o.boardTypeId === item.boardTypeId
    )[0]
    if (prize) {
      if (prize.qty > 0) {
        prize.qty = prize.qty - 1
        resolve(prize)
      } else {
        reject('Prize quantity not enough')
      }
    } else {
      reject('Prize not found')
    }
  })
}

const userPrizes = []
const addUserPrizes = (userId, prize) => {
  return new Promise(resolve => {
    prize.agreed = false
    prize.claimed = false

    let userPrize = userPrizes.filter(o => o.userId === userId)[0]
    if (userPrize) {
      if (userPrize.prizes) {
        userPrize.prizes.push(prize)
      } else {
        userPrize.prizes = []
        userPrize.prizes.push(prize)
      }
    } else {
      userPrize = { userId: '', prizes: [] }
      userPrize.userId = userId
      userPrize.prizes.push(prize)
      userPrizes.push(userPrize)
    }

    resolve(userPrize)
  })
}

const getPrizesByUser = userId => {
  return new Promise(resolve => {
    let res = userPrizes.filter(o => o.userId === userId)[0]
    resolve(res)
  })
}

const agreeUserPrize = (userId, item, isAgree) => {
  return new Promise(resolve => {
    let userPrize = userPrizes.filter(o => o.userId === userId)[0]
    if (userPrize) {
      let prize = userPrize.prizes.filter(
        o =>
          o.shortName === item.shortName &&
          o.seasonId === item.seasonId &&
          o.boardTypeId === item.boardTypeId
      )[0]
      if (prize) {
        prize.agreed = isAgree
        resolve(userPrize)
      }
    }
  })
}

const claimUserPrize = (userId, item, isClaimInFull) => {
  return new Promise(resolve => {
    let userPrize = userPrizes.filter(o => o.userId === userId)[0]
    if (userPrize) {
      let prize = userPrize.prizes.filter(
        o =>
          o.shortName === item.shortName &&
          o.seasonId === item.seasonId &&
          o.boardTypeId === item.boardTypeId
      )[0]
      if (prize) {
        prize.claimed = isClaimInFull
        resolve(userPrize)
      }
    }
  })
}

module.exports = {
  getPrizeBoards,
  getPrizes,
  getStarCategories,
  getStarPrizesByCategory,
  debitPrize,
  addUserPrizes,
  getPrizesByUser,
  agreeUserPrize,
  claimUserPrize,
}