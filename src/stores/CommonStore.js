import { observable, action, reaction } from 'mobx'
import agent from '@/Agent'

class CommonStore {
  @observable
  appName = 'Conduit'
  @observable
  token = window.localStorage.getItem('jwt')
  @observable
  appLoaded = false

  @observable
  tags = []
  @observable
  isLoadingTags = false

  @observable
  location = ''
  @observable
  locationHistory = []
  @observable
  isLoading = false

  @observable
  leaderboard = []

  list = [
    {
      displayName: 'or e-mail before@',
      score: 298000,
    },
    {
      displayName: 'or e-mail before@',
      score: 137840,
    },
    {
      displayName: 'or e-mail before@',
      score: 127840,
      isCelebrity: true,
      subtitle: 'short subtitle that fits here',
    },
    {
      displayName: 'or e-mail before@',
      score: 117840,
    },
    {
      displayName: 'or e-mail before@',
      score: 107840,
    },
    {
      displayName: 'or e-mail before@',
      score: 97840,
    },
    {
      displayName: 'or e-mail before@',
      score: 87840,
      isCelebrity: true,
      subtitle: 'short subtitle that fits here',
    },
    {
      displayName: 'or e-mail before@',
      score: 77840,
    },
    {
      displayName: 'or e-mail before@',
      score: 67840,
    },
    {
      displayName: 'or e-mail before@',
      score: 57840,
    },
    {
      displayName: 'top11 celebrity',
      score: 40840,
      isCelebrity: true,
      subtitle: 'short subtitle that fits here',
    },
  ]
  @observable
  keySharedCredits = {}

  @observable
  replayed = false
  @action
  setReplayed(val) {
    this.replayed = val
  }

  getAppVersion() {
    return 'Ambassador Demo 1.0v'
  }
  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          try {
            window.localStorage.setItem('jwt', token)
          } catch (e) {}
        } else {
          try {
            window.localStorage.removeItem('jwt')
          } catch (e) {}
        }
      }
    )
  }

  @action
  setToken(token) {
    this.token = token
  }

  @action
  clearToken() {
    this.token = undefined
    try {
      window.localStorage.removeItem('jwt')
    } catch (e) {}
  }

  @action
  setAppLoaded() {
    this.appLoaded = true
  }

  @action
  setLocation(location) {
    this.location = location
  }

  @action
  getLeaderboard() {
    // this.isLoading = true
    // return agent.Server.getLeaderboard()
    //   .then(data => {
    //     this.leaderboard = data
    //   })
    //   .catch(err => {
    //     this.leaderboard = this.list
    //   })
    //   .finally(_ => {
    //     this.isLoading = false
    //   })
    this.leaderboard = this.list
  }

  @action
  getKeySharedCredits() {
    // this.isLoading = true
    // return agent.Server.getKeySharedCredits()
    //   .then(data => {
    //     debugger
    //     this.keySharedCredits = data
    //   })
    //   .catch(err => {
    //     debugger
    //     console.log(err.message)
    //   })
    //   .finally(_ => {
    //     this.isLoading = false
    //   })
    this.keySharedCredits = []
  }

  @observable
  socials = [
    {
      name: 'Facebook',
      isSynced: false,
      icon: 'icon-facebook.svg',
      backgroundColor: '#f1f2f2',
      syncLockedBackgroundColor: '#3a5999',
      textColor: '#3a5999',
      syncLockedTextColor: '#ffffff',
    },
    {
      name: 'Twitter',
      isSynced: false,
      icon: 'icon-twitter.svg',
      backgroundColor: '#f1f2f2',
      syncLockedBackgroundColor: '#55acef',
      textColor: '#55acef',
      syncLockedTextColor: '#ffffff',
    },
    {
      name: 'Instagram',
      isSynced: false,
      icon: 'icon-instagram.png',
      backgroundColor: '#f1f2f2',
      syncLockedBackgroundColor: '#e8424e',
      textColor: '#e8424e',
      syncLockedTextColor: '#ffffff',
    },
  ]

  @action
  sync(response) {
    let social = this.socials.filter(o => o.name === response.name)[0]
    if (social) {
      social.isSynced = response.isSynced
    }
  }

  @observable
  tokens = 0
  @action
  setTokens(val) {
    this.tokens = val
  }

  countries = []

  @action
  readCountries() {
    this.isLoading = true
    return agent.GameServer.readCountries()
      .then(data => {
        this.countries = data
      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @observable
  isLoadingZone = false

  zones = []

  @action
  readZonesByCountry(args) {
    this.isLoadingZone = true
    return agent.GameServer.readZonesByCountry(args)
      .then(data => {
        this.zones = data
      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {
        this.isLoadingZone = false
      })
  }

  cities = []

  @action
  readCitiesByZone(args) {
    this.isLoadingZone = true
    return agent.GameServer.readCitiesByZone(args)
      .then(data => {
        this.cities = data || []
      })
      .catch(err => {
        console.log(err)
      })
      .finally(_ => {
        this.isLoadingZone = false
      })
  }

}

export default new CommonStore()
