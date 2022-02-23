import { observable, action, computed } from 'mobx'
import agent from '@/Agent'
import { IsMobile } from '@/utils'

class ResolveStore {
  /**
   * Total Choices
   */

  @observable
  totalPrePick = 0
  @action
  setTotalPrePick(val) {
    if (this.totalPrePick < 1) {
      this.totalPrePick = val
    }
  }

  @observable
  totalLivePlay = 0
  @action
  setTotalLivePlay(val) {
    if (this.totalLivePlay < 1) {
      this.totalLivePlay = val
    }
  }

  @observable
  totalGameMaster = 0
  @action
  setTotalGameMaster(val) {
    if (this.totalGameMaster < 1) {
      this.totalGameMaster = val
    }
  }

  @observable
  totalSponsor = 0
  @action
  setTotalSponsor(val) {
    if (this.totalSponsor < 1) {
      this.totalSponsor = val
    }
  }

  @observable
  totalPrize = 0
  @action
  setTotalPrize(val) {
    if (this.totalPrize < 1) {
      this.totalPrize = val
    }
  }

  /**
   * Total Correct Choices
   */
  @observable
  correctPrePick = 0
  @action
  setCorrectPrePick(val) {
    this.correctPrePick += val
  }

  @observable
  correctLivePlay = 0
  @action
  setCorrectLivePlay(val) {
    this.correctLivePlay += val
  }

  @observable
  correctGameMaster = 0
  @action
  setCorrectGameMaster(val) {
    this.correctGameMaster += val
  }

  @observable
  correctSponsor = 0
  @action
  setCorrectSponsor(val) {
    this.correctSponsor += val
  }

  @observable
  correctPrize = 0
  @action
  setCorrectPrize(val) {
    this.correctPrize += val
  }

  @observable
  resolveThrough = 0
  @action
  setResolveThrough(val) {
    this.resolveThrough = val
  }

  @observable
  quadraFectas = [
    {
      sequence: 0,
      text: 'prepicks',
      percentage: 0,
      color: '#10bc1c',
      x: -50,
      y: -95,
      innerMarginTop: IsMobile ? -17 : -15,
      innerMarginLeft: 0,
      keyword: 'prepicks',
    },
    {
      sequence: 1,
      text: 'sponsors',
      percentage: 70,
      color: '#3632ab',
      x: -108,
      y: -43, //-60
      innerMarginTop: 2,
      innerMarginLeft: IsMobile ? -21 : -18,
      keyword: 'sponsor',
    },
    {
      sequence: 2,
      text: 'gamemaster',
      percentage: 50,
      color: '#02a9d6',
      x: 8,
      y: -43, //-55
      innerMarginTop: 2,
      innerMarginLeft: IsMobile ? 21 : 18,
      keyword: 'gamemaster',
    },
    {
      sequence: 3,
      text: 'live play',
      percentage: 60,
      color: '#c61819',
      x: -50,
      y: 11, //5
      innerMarginTop: IsMobile ? 22 : 19,
      innerMarginLeft: 0,
      keyword: 'liveplay',
    },
  ]

  @observable
  lockMenu = false
  @action
  setLockMenu(val) {
    this.lockMenu = val
  }

  @observable
  showPostPlay = false
  @action
  setShowPostPlay(val) {
    this.showPostPlay = val
  }
}

export default new ResolveStore()
