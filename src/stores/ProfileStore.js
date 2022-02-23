import { observable, action } from 'mobx'
import { PlayFab } from '@/Agent'
import agent from '@/Agent'
import NavigationStore from '@/stores/NavigationStore'
import PrizeChestStore from '@/stores/PrizeChestStore'

class ProfileStore {
  @observable
  isLoading = false
  @observable
  isUpdating = false
  @observable
  profile = {
    channels: [],
    displayName: 'ambassador1',
    key: 'PSO017',
    password: 'AmbassadorPass.v1',
    userName: 'ambassador1@sportoco.com',
    currencies: { tokens: 0, stars: 50, points: 0 },
    externalIds: {},
    location: {
      country: 'US',
      latitide: 33.82049560546875,
      city: 'Cathedral City',
      longditute: -116.45860290527344,
    },
    requestId: '1543983812546_2240',
    reservedCurrencies: { points: {}, stars: {}, tokens: {} },
    userId: '5c0178adc2614c05265db7df',
    virtualGoods: {},
    label: 'Ambassador',
    flags: { 'ambassador-playthrough': 1 },
    notifications: { email: false, phone: false },
    starCategory: null,
    firstName: 'ambassador1',
    lastName: '',
    mobile: '',
    notifyMobile: false,
    email: 'ambassador1@sportoco.com',
  }
  profileXXX = {
    currencies: { points: 0, stars: 0, tokens: 0 },
  }
  @observable
  inviteesLength = 0
  @observable
  isLoadingProfile = false
  @observable
  err = undefined

  @action
  setProfile(profile) {
    this.profile = profile
  }

  @action
  setProfileCurrencies(val) {
    this.profile.currencies = val
  }

  @observable
  resolvePoints = 0
  @action
  setResolvePoints(val) {
    this.resolvePoints = val
  }

  @observable
  resolveWinStreak = []
  @action
  setResolveWinStreak(val) {
    this.resolveWinStreak = val
  }

  @observable
  invitationKey = ''
  @action
  setInvitationKey(val) {
    this.invitationKey = val
  }

  //TEMPORARY - CODE_SERVER.JS
  tempCurrencies = { tokens: 0, stars: 0, points: 0 }
  @action
  setTempCurrencies(val) {
    this.tempCurrencies = val
  }

  shareKey = 'AMB000X2'

  @action
  getProfile() {
    if (this.profile.userName) {
      return
    }

    this.isLoading = true
    return new Promise((resolve, reject) => {
      resolve({
        channels: [],
        displayName: 'ambassador1',
        key: 'PSO017',
        password: 'AmbassadorPass.v1',
        userName: 'ambassador1@sharklasers.com',
        currencies: { tokens: 0, stars: 0, points: 0 },
        externalIds: {},
        location: {
          country: 'US',
          latitide: 33.82049560546875,
          city: 'Cathedral City',
          longditute: -116.45860290527344,
        },
        requestId: '1543983812546_2240',
        reservedCurrencies: { points: {}, stars: {}, tokens: {} },
        userId: '5c0178adc2614c05265db7df',
        virtualGoods: {},
        label: 'Ambassador',
        flags: { 'ambassador-playthrough': 1 },
        notifications: { email: false, phone: false },
        starCategory: null,
      })
    })
      .then(data => {
        debugger
        this.err = null
        this.profile = data
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  getProfile______() {
    debugger

    this.isLoading = true
    return agent.Server.getProfile()
      .then(
        action(data => {
          debugger

          //TEMPORARY - CODE_SERVER.JS
          if (this.profile.currencies) {
            data.currencies = { ...this.profile.currencies }
          }

          this.err = null
          this.profile = data
        })
      )
      .catch(err => {
        debugger
        this.err = err
        console.log('PLAYALONG ERROR: ', err)
      })
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }

  @action
  getInviteesLength() {
    this.isLoading = true
    agent.Server.getInvitees()
      .then(
        action(data => {
          this.inviteesLength = data.length
        })
      )
      .catch(err => {
        console.log('PLAYALONG ERROR getInviteesLength() =>', err)
      })
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }

  @action
  updateDisplayName(name) {
    this.isUpdating = true
    return agent.Server.updateDisplayName(name)
      .then(
        action(response => {
          console.log(response)
        })
      )
      .finally(
        action(() => {
          this.isUpdating = false
        })
      )
  }

  @action
  updatePhone(phone) {
    this.isUpdating = true
    return agent.Server.updatePhone(phone)
      .then(
        action(response => {
          console.log(response)
        })
      )
      .finally(
        action(() => {
          this.isUpdating = false
        })
      )
  }

  @action
  updateNotifications(notifications) {
    this.isUpdating = true
    return agent.Server.updateNotifications(notifications)
      .then(
        action(response => {
          console.log(response)
        })
      )
      .finally(
        action(() => {
          this.isUpdating = false
        })
      )
  }

  @action
  creditCurrencies(creditInfo) {
    this.isUpdating = true
    return agent.Server.creditCurrencies(creditInfo)
      .then(
        action(response => {
          //TEMPORARY - CODE_SERVER.JS
          this.profile.currencies[creditInfo.currency] += creditInfo.amount
          //ORIG
          //this.profile.currencies[creditInfo.currency] = response
        })
      )
      .finally(
        action(() => {
          this.isUpdating = false
        })
      )
  }

  @action
  debitCurrenciesAtLaunch(debitInfo) {
    debugger
    this.isUpdating = true
    return agent.Server.debitCurrencies(debitInfo)
      .then(
        action(response => {
          //TEMPORARY - CODE_SERVER.JS
          this.profile.currencies[debitInfo.currency] -= debitInfo.amount
          //ORIG
          // this.profile.currencies[debitInfo.currency] = response
        })
      )
      .finally(() => {
        this.isUpdating = false
      })
  }

  @action
  debitCurrencies(debitInfo) {
    debugger
    this.isUpdating = true
    return agent.Server.debitCurrencies(debitInfo)
      .then(
        action(response => {
          //TEMPORARY - CODE_SERVER.JS
          this.profile.currencies[debitInfo.currency] -= debitInfo.amount
          //ORIG
          // let check = setInterval(() => {
          //   this.profile.currencies[debitInfo.currency]--
          //   if (
          //     parseInt(this.profile.currencies[debitInfo.currency]) <=
          //     parseInt(response)
          //   ) {
          //     clearInterval(check)
          //   }
          // }, 0)
        })
      )
      .finally(() => {
        this.isUpdating = false
      })
  }

  @action
  resetCurrencies() {
    let points = this.profile.currencies['points']
    let tokens = this.profile.currencies['tokens']
    let stars = this.profile.currencies['stars']

    this.debitCurrenciesAtLaunch({
      currency: 'points',
      amount: points,
    })
    this.debitCurrenciesAtLaunch({
      currency: 'tokens',
      amount: tokens,
    })
    this.debitCurrenciesAtLaunch({
      currency: 'stars',
      amount: stars,
    })
  }

  @action
  login(email, password) {
    return PlayFab.login(email, password)
      .then(
        action(profile => {
          this.profile = profile
        })
      )
      .finally(
        action(() => {
          this.isLoadingProfile = false
        })
      )
  }

  @action
  loadProfile(username) {
    this.isLoadingProfile = true
    //return agent.Profile.get(username)
    return Promise.resolve({ profile: '1234567' })
      .then(
        action(({ profile }) => {
          this.profile = profile
        })
      )
      .finally(
        action(() => {
          this.isLoadingProfile = false
        })
      )
  }

  //RELLY
  @action
  setSessionCurrencies() {
    debugger
    let points = this.profile.currencies['points']
    let tokens = this.profile.currencies['tokens']
    let stars = this.profile.currencies['stars']
    let obj = { points: points, tokens: tokens, stars: stars }
    try {
      sessionStorage.setItem('CURRENCIES', JSON.stringify(obj))
    } catch (e) {}
  }

  @observable
  tempProfile = {
    userId: 0,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    isUserNameEditing: false,
    isFirstNameEditing: false,
    isLastNameEditing: false,
    isEmailEditing: false,
    isPhoneEditing: false,
    notifyByEmail: true,
    notifyByPhone: false,
  }

  @observable
  billingAddress = {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    email: '',
    confirmEmail: '',
    useAsShippingAddress: false,
  }

  @observable
  paymentDetails = {
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    csv: '',
    keepCardDetailsOnFile: false,
  }

  copyProfileToTemp() {
    this.tempProfile.userId = this.profile.userId
    this.tempProfile.userName = this.profile.userName
    this.tempProfile.firstName = this.profile.firstName
    this.tempProfile.lastName = this.profile.lastName
    this.tempProfile.email = this.profile.email
    this.tempProfile.mobile = this.profile.mobile
    this.tempProfile.notifyByPhone = this.profile.notifyMobile
  }

  @action
  updateProfile(params) {
    this.isUpdating = true
    return new Promise(resolve => {
      this.profile.userName = params.userName
      this.profile.firstName = params.firstName
      this.profile.lastName = params.lastName
      this.profile.mobile = params.mobile
      this.profile.notifyEmail = params.notifyEmail
      this.profile.notifyMobile = params.notifyMobile
      this.profile.displayName = params.firstName + ' ' + params.lastName
      return resolve(true)
    }).then(next => {
      if (next) {
        return true
      }
    })
      .finally(_ => {
        this.isUpdating = false
      })
  }

}

export default new ProfileStore()
