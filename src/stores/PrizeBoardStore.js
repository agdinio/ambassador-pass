import { observable, action } from 'mobx'
import agent from '@/Agent'
import ProfileStore from '@/stores/ProfileStore'

class PrizeBoardStore {
  @observable
  isLoading = false
  @observable
  tokenBank = 1280
  @observable
  totalPoints = 9800
  @observable
  prizeBoardMenuTypes = [
    {
      sequence: 1,
      id: 14,
      name: 'In-Stadium',
      desc: "Today's Prize Board",
      amount: 0,
      points: 0,
      colorContainer: '#40403f',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#946fa8',
      colorName: '#FFFFFF',
    },
    {
      sequence: 2,
      id: 17,
      name: 'Free Zone',
      desc: 'Monthly Prize Board',
      amount: 0,
      points: 0,
      colorContainer: '#565859',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
    },
    {
      sequence: 3,
      id: 12,
      name: 'Prize Plus Board',
      desc: 'Travel, Shows, Gear',
      amount: 5,
      points: 5000,
      colorContainer: '#946fa8',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
    },
    {
      sequence: 4,
      id: 8,
      name: 'Season Board',
      desc: 'Cars, Travel, Adventure',
      amount: 10,
      points: 10000,
      colorContainer: '#7846DF',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
    },
    // {
    //   sequence: 5,
    //   id: 7,
    //   name: "Prize Plus Board x",
    //   desc: "Travel, Shows, Gear x",
    //   amount: 8,
    //   points: 6500,
    //   colorContainer: 'green',
    //   colorPoints: '#FFFFFF',
    //   colorSubContainer: '#FFFFFF',
    //   colorName: '#000000'
    // },
  ]

  @observable
  prizeBoardEntries = [
    {
      sequence: 1,
      id: 91,
      parentId: 14,
      name: 'Two Tickets',
      smallDesc: 'To the next game',
      bigDesc: 'Awarded at the end of game',
      quantity: 1,
      points: 60000,
      colorContainer: '#d32813',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-stadium-1.jpg',
    },
    {
      sequence: 2,
      id: 92,
      parentId: 14,
      name: 'Dinner w/ the team',
      smallDesc: '',
      bigDesc: 'You and a guest',
      quantity: 1,
      points: 55000,
      colorContainer: '#d32813',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-stadium-2.jpg',
    },
    {
      sequence: 3,
      id: 93,
      parentId: 14,
      name: 'Meet the team',
      smallDesc: '',
      bigDesc: 'You and three guests',
      quantity: 2,
      points: 50000,
      colorContainer: '#e16a00',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-stadium-3.jpg',
    },
    {
      sequence: 4,
      id: 94,
      parentId: 14,
      name: 'Autographed Jersey',
      smallDesc: '',
      bigDesc: 'Of you favorite player',
      quantity: 3,
      points: 40000,
      colorContainer: '#e16a00',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-stadium-4.jpg',
    },
    {
      sequence: 5,
      id: 95,
      parentId: 14,
      name: 'Home Team Cooler',
      smallDesc: '',
      bigDesc: 'Great for your TailGater',
      quantity: 5,
      points: 38000,
      colorContainer: '#000000',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-stadium-5.jpg',
    },
    {
      sequence: 6,
      id: 96,
      parentId: 14,
      name: 'Team Ball Cap',
      smallDesc: '',
      bigDesc: 'Home or Visitor',
      quantity: 10,
      points: 35000,
      colorContainer: '#000000',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-stadium-6.jpg',
    },

    {
      sequence: 1,
      id: 101,
      parentId: 17,
      name: 'Las Vegas',
      smallDesc: 'NFL Weekend',
      bigDesc: 'MGM Hotel + Round Trip',
      quantity: 1,
      points: 500000,
      colorContainer: '#d32813',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-free-1.jpg',
    },
    {
      sequence: 2,
      id: 102,
      parentId: 17,
      name: 'Hollywood Universal Studios',
      smallDesc: '',
      bigDesc: '3 Day - Hotel + Air',
      quantity: 1,
      points: 400000,
      colorContainer: '#d32813',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-free-2.jpg',
    },
    {
      sequence: 3,
      id: 103,
      parentId: 17,
      name: 'Regal Movie Night',
      smallDesc: '',
      bigDesc: 'Tickets for 4',
      quantity: 5,
      points: 350000,
      colorContainer: '#e16a00',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-free-3.jpg',
    },
    {
      sequence: 4,
      id: 104,
      parentId: 17,
      name: 'Uber',
      smallDesc: '',
      bigDesc: '100Mile Credit',
      quantity: 10,
      points: 300000,
      colorContainer: '#e16a00',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-free-4.jpg',
    },
    {
      sequence: 5,
      id: 105,
      parentId: 17,
      name: 'Amazon Coins',
      smallDesc: '',
      bigDesc: '10K To Shop 24/7',
      quantity: 20,
      points: 275000,
      colorContainer: '#000000',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-free-5.jpg',
    },
    {
      sequence: 6,
      id: 106,
      parentId: 17,
      name: 'Spotify',
      smallDesc: '',
      bigDesc: 'Album Downloads',
      quantity: 50,
      points: 250000,
      colorContainer: '#000000',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-free-6.jpg',
    },

    {
      sequence: 1,
      id: 107,
      parentId: 12,
      name: 'Cancun',
      smallDesc: '7 Day Vacation',
      bigDesc: 'Hotel + Air Round Trip',
      quantity: 1,
      points: 800000,
      colorContainer: '#d32813',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-5-1.jpg',
    },
    {
      sequence: 2,
      id: 108,
      parentId: 12,
      name: 'Miami 4 Day Weekend',
      smallDesc: '',
      bigDesc: 'South Beach - Hotel + Air',
      quantity: 2,
      points: 650000,
      colorContainer: '#d32813',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-5-2.jpg',
    },
    {
      sequence: 3,
      id: 109,
      parentId: 12,
      name: 'Palm Springs',
      smallDesc: '',
      bigDesc: 'Coachella Weekend',
      quantity: 2,
      points: 550000,
      colorContainer: '#e16a00',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-5-3.jpg',
    },
    {
      sequence: 4,
      id: 110,
      parentId: 12,
      name: 'Las Vegas Weekend',
      smallDesc: '',
      bigDesc: 'MGM Grand',
      quantity: 3,
      points: 450000,
      colorContainer: '#e16a00',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-5-4.jpg',
    },
    {
      sequence: 5,
      id: 111,
      parentId: 12,
      name: 'NFL Play Offs',
      smallDesc: '',
      bigDesc: '2 Tickets to a Regional',
      quantity: 5,
      points: 400000,
      colorContainer: '#000000',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-5-5.jpg',
    },
    {
      sequence: 6,
      id: 112,
      parentId: 12,
      name: 'Adventure Out-Back',
      smallDesc: '',
      bigDesc: 'Weekend for 4',
      quantity: 10,
      points: 350000,
      colorContainer: '#000000',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-5-6.jpg',
    },

    {
      sequence: 1,
      id: 113,
      parentId: 8,
      name: 'BMW',
      smallDesc: '',
      bigDesc: 'Electric i3 2017',
      quantity: 1,
      points: 1200000,
      colorContainer: '#d32813',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-10-1.jpg',
    },
    {
      sequence: 2,
      id: 114,
      parentId: 8,
      name: 'Caribbean Cruise the Island',
      smallDesc: '',
      bigDesc: '7 Days 4/2 - Miami + Air',
      quantity: 1,
      points: 1000000,
      colorContainer: '#d32813',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-10-2.jpg',
    },
    {
      sequence: 3,
      id: 115,
      parentId: 8,
      name: 'SXSW',
      smallDesc: '',
      bigDesc: 'Weekend 4/2 + Air',
      quantity: 2,
      points: 900000,
      colorContainer: '#e16a00',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-10-3.jpg',
    },
    {
      sequence: 4,
      id: 118,
      parentId: 8,
      name: 'Las Vegas Weekend',
      smallDesc: '',
      bigDesc: '4/2 - MGM Grand',
      quantity: 3,
      points: 850000,
      colorContainer: '#e16a00',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-10-4.jpg',
    },
    {
      sequence: 5,
      id: 116,
      parentId: 8,
      name: 'Adventure Out-back',
      smallDesc: '',
      bigDesc: 'Weekend 4/2',
      quantity: 5,
      points: 800000,
      colorContainer: '#000000',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-10-5.jpg',
    },
    {
      sequence: 6,
      id: 117,
      parentId: 8,
      name: 'NFL Play-offs',
      smallDesc: '',
      bigDesc: '2 Tickets to a Regional',
      quantity: 10,
      points: 700000,
      colorContainer: '#000000',
      colorPoints: '#FFFFFF',
      colorSubContainer: '#FFFFFF',
      colorName: '#000000',
      icon: 'pa-prizeboards-10-6.jpg',
    },
  ]

  @action
  getTokenBank() {
    return this.tokenBank
  }

  @action
  getTotalPoints() {
    return this.totalPoints
  }

  @action
  getPrizeBoardMenuTypes() {
    return this.prizeBoardMenuTypes
  }

  @action
  getPrizeBoardEntries() {
    return this.prizeBoardEntries
  }

  @action
  getPrizeBoardEntriesByParentId(parentId) {
    let list = this.prizeBoardEntries.filter(x => x.parentId === parentId)
    return list
  }

  @observable
  lockPrizeSlide = false
  @action
  setLockPrizeSlide(val) {
    this.lockPrizeSlide = val
  }

  @observable
  prizeBoardItems = [
    {
      id: 1,
      rank: 1,
      username: 'username 1',
      points: 43050,
      image: 'playalongnow-bigprizeboards-amalfi_coast.jpg',
      pos: 'center',
      keyword: 'amalfi',
      headers: [{ value: 'AMALFI COAST WINE TOURS' }],
      details: [{ value: '7 DAY TRIP FOR TWO HOTEL & AIR' }],
      prizeChest: {
        rank: 1,
        headers: [{ value: 'AMALFI COAST WINE TOURS' }],
        details: [{ value: '7 DAY TRIP FOR TWO HOTEL & AIR' }],
        images: ['playalongnow-bigprizeboards-amalfi_coast.jpg'],
      },
      prizeInfo: {
        topTextSmall: '',
        topTextBig: '7 Day Italian Amalfi Coast Vineyard Tour',
        images: [
          'playalongnow-apass-prizes_desc-amalfi_01.jpg',
          'playalongnow-apass-prizes_desc-amalfi_02.jpg',
          'playalongnow-apass-prizes_desc-amalfi_03.jpg',
          'playalongnow-apass-prizes_desc-amalfi_04.jpg',
        ],
        bottomTextBig: '',
        desc: [
          { image: true, index: 0 },
          { break: true },
          { value: 'You arrive in historic Naples to the first destination -' },
          {
            value: 'Tenuta Sorrentino -',
            fontWeight: 'bold',
            fontStyle: 'italic',
          },
          {
            value:
              'Situated on the  Southern slopes of the active volcano Mount Vesuvius; and stay amongst the vines in one of the beautiful guest-houses with stunning views of the volcano and the Bay of Naples. Travel throughout the countryside on excursions to discover the ruins of Pompeii.',
          },
          { break: true },
          { image: true, index: 1 },
          { break: true },
          {
            value:
              'Wine tasting events, wine pairing luncheons and dinners with traditional Italian fare are featured throughout your wine adventure of a lifetime. Located in the Vesuvius National Park is the home of Lacryma Christi del Vesuvio. – Literally meaning the tears of Christ. This wine made from ancient grapes and offers an extensive paring lunch at Cantine Vesuvio.',
          },
          { break: true },
          { image: true, index: 2 },
          { break: true },
          {
            value:
              'Travel to Herculaneum which many consider the most spectacular ruins of the Roman Empire.  Climb Mount Vesuvius, and another day to visit Raito, famous for its ceramics and shopping.',
          },
          { break: true },
          { value: 'Other destinations include:', fontStyle: 'italic' },
          {
            value:
              'Tenute San Francesco, the guest house on the vineyard Tenuta San Francesco, and famous Positano.',
          },
          { break: true },
          {
            value:
              'Winners take the boat to the stunning Amalfi Island of Ischia. Here you spend the night at Pergola – the hotel linked to Cantine Crateca, the cellar tour of the beautiful Crateca estate overlooking the sea, and catch ferry to Sorrento for an evening in Sorrento and dinner back at the Tenuta Sorrentino vineyard guest house.',
          },
          { break: true },
          { image: true, index: 3 },
          { break: true },
          { value: 'Then back to Naples to explore and fly home.' },
        ],
      },
    },
    {
      id: 2,
      rank: 2,
      username: 'username 2',
      points: 22000,
      image: 'playalongnow-bigprizeboards-small_luxury_hotels.jpg',
      pos: 'center',
      isLuxury: true,
      keyword: 'hotel',
      headers: [{ value: 'SMALL HOTELS' }, { value: 'OF THE WORLD' }],
      details: [{ value: '7 DAY TRIP FOR TWO HOTEL & AIR' }],
      prizeChest: {
        rank: 2,
        headers: [
          { value: 'SMALL LUXURY HOTELS' },
          { break: true },
          { value: 'OF THE WORLD' },
        ],
        details: [{ value: '7 DAY TRIP FOR TWO HOTEL & AIR' }],
        images: ['playalongnow-apass-prizes_desc-slh_01.jpg'],
      },
      prizeInfo: {
        topTextSmall: 'stay at the',
        topTextBig: 'SANDPIPER ST. JAMES, BARBADOS',
        images: [
          'playalongnow-apass-prizes_desc-slh_01.jpg',
          'playalongnow-apass-prizes_desc-slh_02.jpg',
          'playalongnow-apass-prizes_desc-slh_03.jpg',
        ],
        desc: [
          { image: true, index: 0 },
          { break: true },
          { value: 'Take a trip of a lifetime...', fontWeight: 'bold' },
          { break: true },
          {
            value:
              'SLH- Small Luxury Hotels of the World, are the champions of independent luxury hotels ensuring our guests enjoy truly authentic travel experiences.',
          },
          {
            value:
              'Small Luxury Hotels of the World™ matches independently minded guests with independently spirited hotels. The diverse collection of over 500 hotels in more than 80 countries around the world includes everything from cutting edge design hotels and city center sanctuaries to historic country mansions and remote private islands – all SLH hotels are consistently different, however, they are all united by the fact that they offer the best locations, highest quality, personalized service and a truly authentic way to discover a destination.',
          },
          { break: true },
          { image: true, index: 1 },
          { break: true },
          {
            value:
              'Your trip includes air and a stay at the SANDPIPER St James, Barbados - an intimate, family owned hideaway on a stunning beachside setting.',
            fontWeight: 'bold',
          },
          { break: true },
          {
            value:
              'A discreet and exclusive hideaway, The Sandpiper is a small, privately-owned hotel with a stunning beachside setting, close to Holetown. Providing privacy and seclusion in a rooms set in lush, tropical gardens, the hotel also has one of the best restaurants in Barbados and a spa at its nearby sister hotel.',
          },
          { break: true },
          { image: true, index: 2 },
          { break: true },
          {
            value:
              'A stroll through the tropical gardens provides a real feel for this charming retreat. Wander through orchid and swaying coconut trees, past tranquil koi ponds down towards a beach of glistening white sand set against a deep blue sea and sky.',
          },
        ],
      },
    },
    {
      id: 3,
      rank: 3,
      username: 'username 3',
      points: 10000,
      image: 'playalongnow-bigprizeboards-ny_broadway.jpg',
      pos: 'center',
      keyword: 'broadway',
      headers: [{ value: 'NEW YORK BROADWAY' }, { value: 'SHOW WEEK' }],
      details: [{ value: '5 DAY TRIP FOR TWO' }],
      prizeInfo: {
        topTextSmall: '',
        topTextBig: '',
        images: [
          'playalongnow-apass-prizes_desc-ny_01.jpg',
          'playalongnow-apass-prizes_desc-ny_02.jpg',
        ],
        desc: [
          {
            value:
              'Visit the city sites all day and complementary tickets to the best of Broadway entertainment every night.',
          },
          { break: true },
          { image: true, index: 0 },
          { break: true },
          {
            value:
              'The changing season brings quite a number of theater and show choices to the Broadway stages. From stunning musicals to plays that will leave an indelible impression, some of the most popular new shows appear on Broadway during your stay. This prize includes numerous theatres choices throughout New York that host award-winning theater and some of the most popular musicals and plays, and some of the best off-Broadway shows in New York.',
          },
          { break: true },
          {
            value:
              'As edgy as it is elegant, Manhattan is an intoxicating mix of sights, sounds and sensations.',
            fontWeight: 'bold',
          },
          { break: true },
          { image: true, index: 1 },
          { break: true },
          {
            value:
              'Your stay is in Manhattan at an exclusive Small Luxury Hotel of the World. affording Iconic landmarks; trend-setting boutiques; and some of the world’s top fine dining. New York City may be ‘The Big Apple’, but the truth is that it’s more like an onion with layer upon layer of cool culture to unearth. From the metropolis of Midtown to hip Greenwich Village, the cultural hub of Tribeca to the streets of Harlem, there’s something to satisfy your every moment. You’ll quickly get in a New York state of mind.',
          },
        ],
      },
    },
    {
      id: 4,
      rank: 4,
      username: 'username 4',
      points: 30000,
      image: 'playalongnow-bigprizeboards-other_prizes.jpg',
      pos: 'right',
      keyword: 'gear',
      headers: [
        { value: 'SHOWS, TRAINING, TICKETS,' },
        { value: 'GEAR & MORE...' },
      ],
      details: [{ value: '' }],
      prizeInfo: {
        topTextSmall: '',
        topTextBig:
          'Exclusively featured by woot.com, SKLZ® gear and EXOS® Training Team Memorabilia, and Unique Speciality Products.',
        images: [
          'playalongnow-apass-prizes_desc-tr_01.jpg',
          'playalongnow-apass-prizes_desc-tr_02.jpg',
          'playalongnow-apass-prizes_desc-tr_03.jpg',
        ],
        desc: [
          { image: true, index: 0 },
          { break: true },
          {
            value: 'Why the heck do I crave those items from Woot!?',
            fontWeight: 'bold',
          },
          { break: true },
          {
            value:
              'In a day-long gauntlet of amazing products and deals, woot provides you the latest and greatest from; Sports Equipment and Outdoor, Electronics, Computers, Travel Accessories and Gear. Woot’s amazing features are',
          },
          {
            value:
              '- Woot-offs, Shenanigans and Bags of Crap - all available through Amazon Prime shipping benefits.',
            fontWeight: 'bold',
          },
          { break: true },
          { image: true, index: 1 },
          { break: true },
          { value: 'Enjoy the Game - Enjoy the Journey', fontWeight: 'bold' },
          { break: true },
          {
            value: 'Collecting and Purchasing what works for you.',
            fontWeight: 'bold',
          },
          { break: true },
          {
            value:
              'SKLZ WHEN YOU PUT IN THE WORK, YOU’RE READY TO TAKE ON ANYTHING. Show the world what you are ready for.',
            fontWeight: 'bold',
          },
          { break: true },
          { image: true, index: 2 },
          { break: true },
          {
            value:
              'EXOS is a human performance company that helps people reach higher and achieve more.',
            fontWeight: 'bold',
          },
          { break: true },
          {
            value:
              'EXOS began in the late ’90s with the belief that human performance is for all of us. We felt strongly about it wanting to impact more people. Rather than confining ourselves to established industries such as health care, corporate wellness, and sports performance, we’re interested in putting people in the best position to take control of their health so they can succeed at anything.',
          },
        ],
      },
    },
  ]

  @action
  getBigPrizeBoardItems() {
    this.isLoading = true
    return new Promise((resolve, reject) => {
      resolve({
        bigPrizeBoardItems: this.prizeBoardItems,
      })
    }).finally(() => {
      this.isLoading = false
    })
  }

  url = 'prizeboard/'

  @observable
  prizeBoards = []

  @observable
  prizes = []

  @action
  getPrizeBoards() {
    this.isLoading = true
    return agent.PrizeBoard.getPrizeBoards()
      .then(res => {
        this.prizeBoards = res
        return agent.PrizeBoard.getPrizes()
      })
      .then(res => {
        this.prizes = res
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  getPrizes() {
    this.isLoading = true
    return agent.PrizeBoard.getPrizes()
      .then(res => {
        this.prizes = res
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @observable
  activeSlidingItem = null
  @action
  setActiveSlidingItem(val) {
    this.activeSlidingItem = val
  }

  @action
  debitPrize(item) {
    this.isLoading = true
    return agent.PrizeBoard.debitPrize(item)
      .then(res => {
        if (res) {
          const idx = this.prizes.findIndex(
            o =>
              o.shortName === item.shortName &&
              o.seasonId === item.seasonId &&
              o.boardTypeId === item.boardTypeId
          )
          if (idx > -1) {
            this.prizes[idx] = res
          }

          return 'Prize quantity has been deducted'
        }
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @observable
  userPrize = {}
  @action
  addUserPrizes(prize) {
    this.isLoading = true
    return agent.PrizeBoard.addUserPrizes(ProfileStore.profile.userId, prize)
      .then(response => {
        this.userPrize = response
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  getPrizesByUser() {
    this.isLoading = true
    return agent.PrizeBoard.getPrizesByUser(ProfileStore.profile.userId)
      .then(response => {
        this.userPrize = response
        return 'success'
      })
      .catch(err => {
        console.log('Get Prize By User Failed: ', err)
        return 'failed'
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  agreeUserPrize(item, isAgree) {
    this.isLoading = true
    return agent.PrizeBoard.agreeUserPrize(
      ProfileStore.profile.userId,
      item,
      isAgree
    )
      .then(response => {
        this.userPrize = response
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  claimUserPrize(item, isClaimInFull) {
    this.isLoading = true
    return agent.PrizeBoard.claimUserPrize(
      ProfileStore.profile.userId,
      item,
      isClaimInFull
    )
      .then(response => {
        ProfileStore.creditCurrencies({
          currency: 'points',
          amount: item.value,
        })

        this.userPrize = response
        let updatedUserPrize = this.userPrize.prizes.filter(
          o =>
            o.shortName === item.shortName &&
            o.seasonId === item.seasonId &&
            o.boardTypeId === item.boardTypeId
        )[0]
        if (updatedUserPrize) {
          return updatedUserPrize
        }

        return null
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  useStar(item) {}
}

export default new PrizeBoardStore()
