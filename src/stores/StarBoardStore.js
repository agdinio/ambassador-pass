import { observable, action } from 'mobx'
import agent from '@/Agent'
import ProfileStore from '@/stores/ProfileStore'

class StarBoardStore {
  @observable
  isLoading = false
  @observable
  selectedStar = null
  @action
  setSelectedStar(val) {
    this.selectedStar = val
  }

  @observable
  stars = [
    {
      text: 'tickets',
      icon: 'star-category-shows.jpg',
      iconSelected: 'star-icon-gold.svg',
      eventList: ['sports', 'concerts', 'festivals', 'theatre', 'movies'],
    },
    {
      text: 'gear',
      icon: 'star-category-gear.jpg',
      iconSelected: 'star-icon-gold.svg',
      eventList: ['sports', 'equipment', 'accessories', 'devices', 'gadgets'],
    },
    {
      text: 'travel',
      icon: 'star-category-travel.jpg',
      iconSelected: 'star-icon-gold.svg',
      eventList: ['caribbean', 'europe', 'asia', 'ski resorts', 'events'],
    },
  ]

  @observable
  starsX = [
    {
      order: 1,
      text: 'tickets',
      icon: 'star-category-shows.jpg',
      iconSelected: 'star-icon-gold.svg',
      eventList: ['sports', 'concerts', 'festivals', 'theatre', 'movies'],
      desc: '',
      top: -20,
      left: -47,
    },
    {
      order: 2,
      text: 'gear',
      icon: 'star-category-gear.jpg',
      iconSelected: 'star-icon-gold.svg',
      eventList: ['sports', 'equipment', 'accessories', 'devices', 'gadgets'],
      desc: 'equipment and accessories from your favorite sports',
      top: -57,
      left: 0,
    },
    {
      order: 3,
      text: 'travel',
      icon: 'star-category-travel.jpg',
      iconSelected: 'star-icon-gold.svg',
      eventList: ['caribbean', 'europe', 'asia', 'ski resorts', 'events'],
      desc: '',
      top: -20,
      left: 47,
    },
    {
      order: 4,
      text: 'adventure',
      icon: 'star-category-adventure.jpg',
      iconSelected: 'star-icon-gold.svg',
      eventList: ['sports', 'equipment', 'accessories', 'devices', 'gadgets'],
      desc: '',
      top: 53,
      left: -30,
    },
    {
      order: 5,
      text: 'training',
      icon: 'star-category-training.jpg',
      iconSelected: 'star-icon-gold.svg',
      eventList: ['caribbean', 'europe', 'asia', 'ski resorts', 'events'],
      desc: '',
      top: 53,
      left: 30,
    },
  ]

  @observable
  starCategories = []

  @observable
  starPrizes = []

  @action
  getStarCategories() {
    this.isLoading = true
    return agent.PrizeBoard.getStarCategories()
      .then(response => {
        this.starCategories = response
        return response
      })
      .catch(err => {
        return false
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  getStarPrizesByCategory(category) {
    this.isLoading = true
    return agent.PrizeBoard.getStarPrizesByCategory(category)
      .then(response => {
        this.starPrizes = response
        return true
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  baseColor = '#eede16'
  url = 'starboard/'

  @observable
  activeSlidingItem = null
  @action
  setActiveSlidingItem(val) {
    this.activeSlidingItem = val
  }

  @observable
  prizes = []

  getStarPrizes() {
    this.isLoading = true
    return agent.StarBoard.getStarPrizes()
      .then(res => {
        this.prizes = res
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  debitPrizeX(item) {
    this.isLoading = true
    return agent.StarBoard.debitPrize(item)
      .then(updatedPrize => {
        if (updatedPrize) {
          const idx = this.prizes.findIndex(
            o =>
              o.shortName === item.shortName &&
              o.seasonId === item.seasonId &&
              o.boardTypeId === item.boardTypeId
          )
          if (idx > -1) {
            this.prizes[idx] = updatedPrize
          }

          return updatedPrize
        }
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @observable
  forRedeemItem = null
  @action
  setForRedeemItem(val) {
    this.forRedeemItem = val
  }

  @observable
  userPrize = {}

  @observable
  currentSinglePrize = null
  @action
  setCurrentSinglePrize(val) {
    this.currentSinglePrize = val
  }

  @observable
  currentSinglePrizeForRedeem = null
  @action
  setCurrentSinglePrizeForRedeem(val) {
    this.currentSinglePrizeForRedeem = val
  }

  @action
  getStarPrizesByUser() {
    this.isLoading = true
    let userId = null
    if (!ProfileStore.profile.userId) {
      userId = 'sportoco'
    } else {
      userId = ProfileStore.profile.userId
    }
    return agent.StarBoard.getStarPrizesByUser(userId)
      .then(response => {
        this.userPrize = response
        return response
      })
      .catch(err => {
        console.log('Get StarPrize By User Failed: ', err)
        return null
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  addStar(item, amt) {
    this.isLoading = true
    let userId = null
    if (!ProfileStore.profile.userId) {
      userId = 'sportoco'
    } else {
      userId = ProfileStore.profile.userId
    }
    return agent.StarBoard.addStar(userId, item, amt)
      .then(response => {
        if (response) {
          this.userPrize = response

          const updatedPrize = this.userPrize.prizes.filter(
            o =>
              o.shortName === item.shortName &&
              o.seasonId === item.seasonId &&
              o.boardTypeId === item.boardTypeId
          )[0]

          if (updatedPrize) {
            return updatedPrize
          }
        }

        return null
      })
      .catch(err => {
        console.log('Error Add Star:', err)
        return null
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  setForRedeem(item) {
    this.isLoading = true
    let userId = null
    if (!ProfileStore.profile.userId) {
      userId = 'sportoco'
    } else {
      userId = ProfileStore.profile.userId
    }
    return agent.StarBoard.setForRedeem(userId, item)
      .then(response => {
        if (response) {
          let updatedUserPrize = response.prizes.filter(
            o =>
              o.shortName === item.shortName &&
              o.seasonId === item.seasonId &&
              o.boardTypeId === item.boardTypeId
          )[0]
          if (updatedUserPrize) {
            this.setCurrentSinglePrizeForRedeem(updatedUserPrize)
          }

          this.userPrize = response
          return response
        } else {
          return null
        }
      })
      .catch(err => {
        console.log('Error Set ForRedeem: ', err)
        return null
      })
      .finally(_ => {
        this.isLoading = false
      })
  }

  @action
  agreeUserPrize(item, isAgree) {
    this.isLoading = true
    let userId = null
    if (!ProfileStore.profile.userId) {
      userId = 'sportoco'
    } else {
      userId = ProfileStore.profile.userId
    }
    return agent.StarBoard.agreeUserPrize(userId, item, isAgree)
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
    let userId = null
    if (!ProfileStore.profile.userId) {
      userId = 'sportoco'
    } else {
      userId = ProfileStore.profile.userId
    }
    return agent.StarBoard.claimUserPrize(userId, item, isClaimInFull)
      .then(response => {
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
  changeUserIdOnUserPrize() {
    return agent.StarBoard.changeUserIdOnUserPrize(
      ProfileStore.profile.userId
    ).then(response => {
      if (response) {
        this.userPrize = response
      }
    })
  }

  @observable
  localStars = 0
  @action
  creditLocalStar(val) {
    this.localStars = this.localStars + val
  }
  @action
  debitLocalStar(val) {
    if (this.localStars - val >= 0) {
      this.localStars = this.localStars - val
    }
  }
  @action
  resetLocalStar() {
    this.localStars = 0
  }

  @action
  addStarLocally(p, amt) {
    return new Promise(resolve => {
      let item = null
      let userId = null
      if (!ProfileStore.profile.userId) {
        userId = 'sportoco'
      } else {
        userId = ProfileStore.profile.userId
      }

      if (this.userPrize) {
        if (this.userPrize.prizes) {
          item = this.userPrize.prizes.filter(
            o =>
              o.shortName === p.shortName &&
              o.seasonId === p.seasonId &&
              o.boardTypeId === p.boardTypeId
          )[0]
          if (item) {
            item.used = item.used + amt
          } else {
            item = { ...p }
            item.forRedeem = false
            item.agreed = false
            item.claimed = false
            item.used = amt

            this.userPrize.prizes.push(item)
          }
        } else {
          item = { ...p }
          item.forRedeem = false
          item.agreed = false
          item.claimed = false
          item.used = amt

          this.userPrize.prizes = []
          this.userPrize.prizes.push(item)
        }
      } else {
        item = { ...p }
        item.forRedeem = false
        item.agreed = false
        item.claimed = false
        item.used = amt

        this.userPrize = { userId: '', prizes: [] }
        this.userPrize.userId = userId
        this.userPrize.prizes.push(item)
      }

      if (item.used >= item.value) {
        this.forRedeemItem = item
      }

      this.setCurrentSinglePrize(item)

      resolve(item)
    })
  }
}

export default new StarBoardStore()
