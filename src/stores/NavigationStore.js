import { observable, action, computed } from 'mobx'
import CryptoJS from 'crypto-js'
import IntroScreen from '@/Components/IntroScreen'
import Login from '@/Components/Login'
import LiveGame from '@/Components/LiveGame'
import PrePick from '@/Components/PrePick/PrePick'
import SocialRanking from '@/Components/SocialRanking'
import PrizeBoard from '@/Components/PrizeBoard'
import Register from '@/Components/Signup/Register'
import Signup from '@/Components/Signup'
import KeyCode from '@/Components/Signup/KeyCode'
import Outro from '@/Components/OutroScreen'
import createHistory from 'history/createBrowserHistory'
import PreBegin from '@/Components/IntroScreen/PreBegin'
import PrizeChest from '@/Components/PrizeChest'
import KeyReview from '@/Components/KeyReview'
import Profile from '@/Components/Profile'
import ShareStatus from '@/Components/ShareStatus'
import Wallet from '@/Components/Wallet'
import Resolve from '@/Components/Resolve'
import StarPrize from '@/Components/StarPrize'
import GlobalRanking from '@/Components/GlobalRanking'
import LeaderBoard from '@/Components/LeaderBoard'
import InvitationKeyCode from '@/Components/Signup/Invitation/InvitationKeyCode'
import Replay from '@/Components/Replay'
import LiveGameStore from '@/stores/LiveGameStore'
import PrePickStore from '@/stores/PrePickStore'
import StarBoardStore from '@/stores/StarBoardStore'
import ResolveStore from '@/stores/ResolveStore'
import React from 'react'
import { attachSlidingPanelEvent } from '@/Components/PrizeBoard/Helper'
import { TweenMax, Ease } from 'gsap'
import BezierEasing from '@/bezier-easing'
import ArrowBackIconBlack from '@/assets/images/header-icon-arrow-black.svg'
import ArrowBackIconWhite from '@/assets/images/header-icon-arrow-white.svg'
import PurchaseTokens from "@/Components/PurchaseTokens";
import Loadable from 'react-loadable'
import StarBoard from "@/Components/StarBoard";
import FollowedGames from "@/Components/FollowedGames";
import Instructions from "@/Components/Instructions";
import Background from '@/assets/images/playalong-default.jpg'

class NavigationStore {
  @observable
  isFromMenu
  @observable
  history = createHistory()
  @observable
  location = sessionStorage.getItem('currentLocation')
    ? CryptoJS.AES.decrypt(
        sessionStorage.getItem('currentLocation').toString(),
        'NavigationStore'
      ).toString(CryptoJS.enc.Utf8)
    : 'init'
  listen = this.history.listen(location => {
    if (location && location.state && location.state.path !== this.location) {
      this.setCurrentView(location.state.path)
      /*
      * commented out. it causes iphone chrome crash
       */
      //this.history.goBack()
    }
  })

  authRoutes = [
    '/livegame',
    '/prepick',
    '/socialranking',
    '/prizeboard',
    '/outro',
    '/prizechest',
    '/keyreview',
    '/profile',
    '/sharestatus',
    '/wallet',
    '/resolve',
    '/starprize',
    '/globalranking',
    '/leaderboard',
  ]
  freeRoutes = ['/login', '/register', '/signup', '/keycode', '/prebegin']

  @computed
  get currentView() {
    switch (this.location.toLocaleLowerCase()) {
      case '/login':
        return Login
      case '/register':
        return Register
      case '/signup':
        return Signup
      case '/keycode':
        return KeyCode
      case '/livegame':
        return LiveGame
      case '/prepick':
        return PrePick
      case '/socialranking':
        return SocialRanking
      case '/prizeboard':
        return PrizeBoard
      case '/prebegin':
        return PreBegin
      case '/outro':
        return Outro
      case '/prizechest':
        return PrizeChest
      case '/keyreview':
        return KeyReview
      case '/profile':
        return Profile
      case '/sharestatus':
        return ShareStatus
      case '/wallet':
        return Wallet
      case '/resolve':
        return Resolve
      case '/starprize':
        return StarPrize
      case '/globalranking':
        return GlobalRanking
      case '/leaderboard':
        return LeaderBoard
      case '/invitation':
        return InvitationKeyCode
      case '/replay':
        return Replay
      case '/purchasetokens':
        return PurchaseTokens
      case '/starboard':
        return StarBoard
      default:
        return IntroScreen
    }
  }

  @computed
  get currentViewWhileOnGameState() {
    switch (
      this.locationWhileOnGameState &&
        this.locationWhileOnGameState.toLocaleLowerCase()
    ) {
      case '/prizeboard':
        return PrizeBoard
      case '/outro':
        return Outro
      case '/prizechest':
        return PrizeChest
      case '/profile':
        return Profile
      case '/sharestatus':
        return ShareStatus
      case '/wallet':
        return Wallet
      case '/leaderboard':
        return LeaderBoard
      case '/purchasetokens':
        return PurchaseTokens
      case '/starboard':
        return StarBoard
      case '/followedgames':
        return FollowedGames
      case '/instructions':
        return Instructions
      default:
        return null
    }
  }

  @computed
  get showHeader() {
    const screens = [
      'init',
      'init2',
      '/login',
      '/register',
      '/signup',
      '/keycode',
      '/prebegin',
      '/invitation',
    ]
    return screens.indexOf(this.location.toLocaleLowerCase()) === -1
  }

  setFreeRoute(name, isFromMenu) {
    this.resetSubScreens()
    this.locationWhileOnGameState = null

    this.isFromMenu = isFromMenu
    this.location = name
    this.history.push('', { path: name.toLocaleLowerCase() })
    try {
      sessionStorage.setItem(
        'currentLocation',
        CryptoJS.AES.encrypt(name.toLocaleLowerCase(), 'NavigationStore')
      )
    } catch (e) {}
  }

  @action
  setCurrentView(name, isFromMenu = false) {
    let currLoc = this.bypassActiveMenu.filter(
      o => o.route === this.location
    )[0]

    if (currLoc && !currLoc.through) {
      if (currLoc.exemptedRoutes && currLoc.exemptedRoutes.length > 0) {
        const exemptedRoute = currLoc.exemptedRoutes.filter(o => o === name)[0]
        if (exemptedRoute) {
          this.setFreeRoute(name, isFromMenu)
          return
        }
      }

      this.locationWhileOnGameState = name === currLoc.route ? null : name
      return
    } else {
      this.setFreeRoute(name, isFromMenu)
    }
  }

  @observable
  isShareKeyScreen = false
  @action
  setIsShareKeyScreen(val) {
    this.isShareKeyScreen = val
  }

  @observable
  backScreen = ''
  @action
  setBackScreen(val) {
    this.backScreen = val
  }

  @observable
  locationWhileOnGameState = null
  @action
  setLocationWhileOnGameState(val) {
    this.locationWhileOnGameState = val
  }

  @observable
  activeMenu = null
  @action
  setActiveMenu(val) {
    this.activeMenu = val
  }

  @observable
  returnLocations = []

  @computed
  get returnLocation() {
    return this.returnLocations.filter(o => o.curr === this.activeMenu)[0]
  }

  @action
  pushReturnLocation(name) {
    let elemToRemove = this.returnLocations.filter(o => o.curr === name)[0]
    if (elemToRemove) {
      let idx = this.returnLocations.indexOf(elemToRemove)
      if (idx !== -1) {
        this.returnLocations.splice(idx, 1)
        let exists = this.returnLocations.filter(o => o.curr === name)[0]
        if (!exists) {
          this.returnLocations.push({ prev: this.location, curr: name })
        }
      } else {
        let exists = this.returnLocations.filter(o => o.curr === name)[0]
        if (!exists) {
          this.returnLocations.push({ prev: this.location, curr: name })
        }
      }
    } else {
      let exists = this.returnLocations.filter(o => o.curr === name)[0]
      if (!exists) {
        this.returnLocations.push({ prev: this.location, curr: name })
      }
    }
  }

  @observable
  bypassActiveMenu = [
    {
      route: '/prepick',
      backButtonText: 'PREPICKS',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#22ba2c',
      icon: ArrowBackIconWhite,
      through: false,
    },
    {
      route: '/livegame',
      backButtonText: 'LIVEGAME',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#c61818',
      icon: ArrowBackIconWhite,
      through: false,
    },
    {
      route: '/starprize',
      backButtonText: 'STAR',
      backButtonTextColor: '#000000',
      backButtonColor: '#eedf17',
      icon: ArrowBackIconBlack,
      through: false,
    },
    {
      route: '/resolve',
      backButtonText: 'RESOLVE',
      backButtonColor: '#22ba2c',
      icon: ArrowBackIconWhite,
      through: false,
    },
    // {
    //   route: '/instructions',
    //   backButtonText: 'INSTRUCTIONS',
    //   backButtonTextColor: '#ffffff',
    //   backButtonColor: '#414042',
    //   icon: ArrowBackIconWhite,
    //   through: false,
    // },
  ]

  routes = [
    {
      route: '/outro',
      backButtonText: '',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#19d1bf',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/wallet',
      backButtonText: '',
      backButtonTextColor: '#000000',
      backButtonColor: '#ffb200',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/prizechest',
      backButtonText: '',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#946fa8',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/prizeboard',
      backButtonText: '',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#7736dd',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/leaderboard',
      backButtonText: '',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#353773',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/sharestatus',
      backButtonText: '',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#0a69b8',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/profile',
      backButtonText: '',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#06b7ff',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/starboard',
      backButtonText: '',
      backButtonTextColor: '#000000',
      backButtonColor: '#eede16',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/prepick',
      backButtonText: 'PRE PICKS',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#22ba2c',
      icon: ArrowBackIconWhite,
      through: false,
      isSocketRequired: true,
      exemptedRoutes: ['/livegameschedule'],
    },
    {
      route: '/livegame',
      backButtonText: 'LIVE GAME',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#c61818',
      icon: ArrowBackIconWhite,
      through: false,
      isSocketRequired: true,
      exemptedRoutes: ['/livegameschedule'],
    },
    {
      route: '/livegameschedule',
      backButtonText: 'SCHEDULE',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#c61818',
      icon: ArrowBackIconWhite,
      through: true,
      isSocketRequired: true,
    },
    {
      route: '/starprize',
      backButtonText: 'STAR',
      backButtonTextColor: '#000000',
      backButtonColor: '#eedf17',
      icon: ArrowBackIconBlack,
      through: false,
    },
    {
      route: '/resolve',
      backButtonText: 'RESOLVE',
      backButtonColor: '#22ba2c',
      icon: ArrowBackIconWhite,
      through: false,
    },
    {
      route: '/purchasetokens',
      backButtonText: '',
      backButtonTextColor: '#000000',
      backButtonColor: '#ffb200',
      icon: ArrowBackIconWhite,
      through: false,
    },
    {
      route: '/followedgames',
      backButtonText: 'FOLLOWED GAMES',
      backButtonTextColor: '#ffffff',
      backButtonColor: '#c61818',
      icon: ArrowBackIconWhite,
      through: false,
    },
    // {
    //   route: '/instructions',
    //   backButtonText: 'INSTRUCTIONS',
    //   backButtonTextColor: '#ffffff',
    //   backButtonColor: '#414042',
    //   icon: ArrowBackIconWhite,
    //   through: false,
    // },
  ]

  @action
  resetBypassActiveMenu() {
    for (let i = 0; i < this.bypassActiveMenu.length; i++) {
      let elem = this.bypassActiveMenu[i]
      elem.through = false
    }
  }

  @action
  setPlayThroughOnActiveMenu(activeMenu) {
    let currLoc = this.bypassActiveMenu.filter(o => o.route === activeMenu)[0]
    if (currLoc) {
      currLoc.through = true
    }

    let currRoute = this.routes.filter(o => o.route === activeMenu)[0]
    if (currRoute) {
      currRoute.through = true
    }
  }
  /***************************************************************************************/

  @observable
  subScreens = []
  @action
  addSubScreen(
    comp = this.isRequired('component'),
    displayName = this.isRequired('key'),
    noSlide,
    hasBackground,
    lockUserSwipe
  ) {
    return new Promise(resolve => {
      let itemToAdd = React.createElement(
        'div',
        {
          id: displayName,
          key: displayName,
          style: {
            position: 'absolute',
            width: 'inherit',
            height: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            overflow: 'hidden',
            zIndex: 100 + this.subScreens.length,
            transform: noSlide ? 'translateX(0%)' : 'translateX(101%)',
            backgroundImage: hasBackground ? 'url(' + Background + ')' : null,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          },
        },
        comp
      )

      let items = []
      this.subScreens.forEach(item => {
        items.push(item)
      })

      items.push(itemToAdd)
      this.subScreens = items

      resolve(itemToAdd.key)
    }).then(key => {
      const el = document.getElementById(key)
      if (el) {
        if (!lockUserSwipe) {
          if (noSlide) {
            attachSlidingPanelEvent(el, key)
          } else {
            attachSlidingPanelEvent(el, key)
            TweenMax.to(el, 0.3, {
              x: '0%',
              ease: new Ease(BezierEasing(0.77, 0, 0.175, 1)),
            })
          }
        }
      }
    })
  }
  @action
  removeSubScreen(key = this.isRequired('key'), noSlide) {
    if (!key) {
      return
    }

    let funcRemove = () => {
      const idx = this.subScreens.findIndex(o => o.key === key)
      if (idx > -1) {
        let items = []
        this.subScreens.forEach(item => {
          items.push(item)
        })

        items.splice(idx, 1)
        this.subScreens = items
      }
    }

    if (noSlide) {
      funcRemove()
    } else {
      const el = document.getElementById(key)
      if (el) {
        TweenMax.to(el, 0.3, {
          x: '100%',
          ease: new Ease(BezierEasing(0.77, 0, 0.175, 1)),
          onComplete: () => {
            funcRemove()
          },
        })
      }
    }
  }
  @action
  resetSubScreens() {
    this.subScreens = []
  }

  isRequired(p) {
    throw new Error('param ' + p + ' is required')
  }
}

export default new NavigationStore()
