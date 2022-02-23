import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer, inject, Provider } from 'mobx-react'
import { extendObservable, intercept } from 'mobx'
import styled from 'styled-components'
import NextPlay from '@/Components/LiveGame/NextPlay'
import ExplainationScreen from '@/Components/LiveGame/ExplainationScreen'
import PlayInProgress from '@/Components/LiveGame/Common/PlayInProgress'
import GetReady from '@/Components/LiveGame/GetReady'
import GameMasterQuestion from '@/Components/LiveGame/GameMaster'
import MultiplierQuestion from '@/Components/LiveGame/MultiplierQuestion'
import Lockout from '@/Components/LiveGame/Common/Lockout'
import GameEnded from '@/Components/LiveGame/Common/GameEnded'
import SponsorQuestion from '@/Components/LiveGame/Sponsor'
import AdvertisementQuestion from '@/Components/LiveGame/Advertisement'
import Kickoff from '@/Components/LiveGame/Kickoff'
import MultiplyPoints from '@/Components/LiveGame/Common/MultiplyPoints'
import Results from '@/Components/LiveGame/Results/index'
import ExtraPointQuestion from '@/Components/LiveGame/ExtraPoint'
import Summary from '@/Components/LiveGame/Summary'
import SyncSocial from '@/Components/LiveGame/SyncSocial'
import { evalImage } from '@/utils'
import LiveGameStore from '@/stores/LiveGameStore'

@inject('ProfileStore', 'PrePickStore', 'LiveGameStore', 'NavigationStore')
@observer
export default class LiveGameQuestions extends Component {
  constructor(props) {
    super(props)

    extendObservable(this, {
      action: true,
      Lockout: false,
      lockoutHeaderText: '',
      lockoutDetailText: '',
      currentScreen: undefined,
      LockoutPlayInProgress: false,
      LockoutMultiply: false,
      answerNextId: 0,
      isNextPlay: false,
      isRunningLengthZero: false,
      nextScreenAfterSync: null,
    })

    this.lockRunningLengthCountdown = false
    this.pageId = 0
    this.pageIdAnalytic = 0
    this.answers = []

    this.screens = {
      ExplainationScreen,
      NextPlay,
      GetReady,
      GameMasterQuestion,
      SponsorQuestion,
      AdvertisementQuestion,
      MultiplierQuestion,
      Kickoff,
      ExtraPointQuestion,
      GameEnded,
      Summary,
      SyncSocial,
    }

    intercept(this.props.LiveGameStore, 'inProgress', change => {
      this.MonitorPlayInProgress(change.newValue)
      return change
    })
  }

  componentDidUpdate() {
    if (this.props.nextScreenAfterSync) {
      this.nextScreenAfterSync = this.props.nextScreenAfterSync
    }
  }

  getType(cur) {
    if (!cur) {
      return 'LivePlay'
    }
    switch (cur.componentName) {
      case 'GameMasterQuestion':
        return 'GameMaster'
      default:
        return 'LivePlay'
    }
  }

  MonitorPlayInProgress(inProgress) {
    debugger
    if (this.LockoutPlayInProgress && !inProgress) {
      setTimeout(() => {
        if (this.LockoutPlayInProgress) {
          let stars = this.props.LiveGameStore.currentScriptItem.stars
          let correctAnswer = this.props.LiveGameStore.currentScriptItem
            .correctAnswer
          let sFootage = this.props.LiveGameStore.currentScriptItem.footage
          let progressFootage = this.props.LiveGameStore.currentScriptItem
            .inProgressFootage
          let nextId = this.props.LiveGameStore.currentMainQuestion.nextId || 0
          if (nextId) {
            this.currentScreen = undefined
            this.LockoutPlayInProgress = false
            this.removeCommonContainer()
            this.renderResults(
              nextId,
              sFootage,
              progressFootage,
              correctAnswer,
              stars
            )
          } else {
            // this.timeout = setTimeout(() => {
            //   this.props.NavigationStore.setCurrentView('/globalranking')
            // }, 1500)
          }
        }
      }, 0)
    } else {
      /*
      if (this.props.LiveGameStore.currentScriptItem) {
        if (
          this.props.LiveGameStore.currentScriptItem.type === 'XGameMasterX' ||
          this.props.LiveGameStore.currentScriptItem.type === 'XSponsorX' ||
          this.props.LiveGameStore.currentScriptItem.type === 'XPrizeX'
        ) {
          let correctAnswer = this.props.LiveGameStore.currentScriptItem
            .correctAnswer
          let currId = this.props.LiveGameStore.currentScriptItem.id
          let sFootage = this.props.LiveGameStore.currentScriptItem.footage
          let progressFootage = this.props.LiveGameStore.currentScriptItem
            .inProgressFootage
          let nextId = this.props.LiveGameStore.currentMainQuestion.nextId || 0
          if (nextId) {
            let showResult = this.props.LiveGameStore.currentScriptItem
              .showResult
            this.currentScreen = undefined
            this.LockoutPlayInProgress = false
            this.removeCommonContainer()
            if (showResult) {
              this.renderResults(
                nextId,
                sFootage,
                progressFootage,
                correctAnswer
              )
            } else {
              this.renderNextPlay(currId, nextId, sFootage, progressFootage)
            }
          }
        }
      }
*/
    }
  }

  getTextCardMessage(currentId) {
    return this.props.LiveGameStore.textCardScript.filter(
      o => o.scriptId === currentId
    )[0]
  }

  handleSetPlayHasStarted(response) {
    this.props.LiveGameStore.setInProgress(response)
  }

  renderNextPlay(currId, nextId, sFootage, inProgressFootage) {
    debugger
    if (this.refCommonContainer) {
      ReactDOM.unmountComponentAtNode(this.refCommonContainer)

      let nextPlay = this.props.LiveGameStore.nextPlayScript[
        ++this.props.LiveGameStore.nextPlayIndex
      ]
      let comp = (
        <NextPlay
          script={nextPlay}
          teams={this.props.PrePickStore.teams}
          timer={nextPlay && nextPlay.period ? 2 : 0}
          nextId={nextId}
          isTimeUp={this.handleTimeIsUp.bind(this)}
          inProgressFootage={inProgressFootage}
          videoFootage={this.props.LiveGameStore.videoFootage}
          msg={this.getTextCardMessage(currId)}
        />
      )

      ReactDOM.render(comp, this.refCommonContainer)
    }
  }

  renderResults(nextId, sFootage, progressFootage, correctAnswer, stars) {
    debugger
    if (this.refCommonContainer) {
      ReactDOM.unmountComponentAtNode(this.refCommonContainer)

      let curr = this.props.LiveGameStore.currentMainQuestion

      let currentId = 0
      let result = null
      let isTextCard = false
      let msg = null

      if (curr) {
        currentId = curr.id
        result = this.props.LiveGameStore.resultsScript.filter(
          o => o.scriptId === currentId
        )[0]
        isTextCard = curr.isTextCard || false
        msg = this.props.LiveGameStore.textCardScript.filter(
          o => o.scriptId === currentId
        )[0]
      } else {
        currentId = this.props.LiveGameStore.currentPageId
        result = this.props.LiveGameStore.resultsScript.filter(
          o => o.scriptId === currentId
        )[0]
        isTextCard = false
      }

      let starEarned = false
      let currentAnswer = this.props.PrePickStore.answers.filter(
        o => o.questionId === currentId
      )[0]
      if (currentAnswer) {
        let answered = currentAnswer.livegameAnswers.filter(
          o => o.id === currentId
        )[0]
        if (
          answered &&
          answered.correctAnswer.trim().toLowerCase() ===
            answered.answer.trim().toLowerCase()
        ) {
          starEarned = true
        } else {
          starEarned = false
        }
      } else {
        starEarned = false
      }

      this.props.LiveGameStore.setIsResultsShowing(true)
      let comp = (
        <Results
          script={result}
          teams={this.props.PrePickStore.teams}
          timer={2}
          currentId={currentId}
          nextId={nextId}
          isTextCard={isTextCard}
          msg={msg}
          stars={stars}
          starEarned={starEarned}
          isTimeUp={this.handleTimeIsUp.bind(this)}
        />
      )

      ReactDOM.render(comp, this.refCommonContainer)

      // if (this.compareFootages(progressFootage, sFootage)) {
      //   ReactDOM.render(comp, this.refCommonContainer)
      // } else {
      //   this.handleTimeIsUp(true, {
      //     currentId: currentId,
      //     nextId: nextId,
      //     comp: 'RESULTS',
      //     isTextCard: isTextCard,
      //     hideTimeout: false,
      //   })
      // }
    }
  }

  renderPlayInProgress(inProgressLength, inProgressFootage, bgColor, type, q) {
    debugger

    let sLogo = this.props.LiveGameStore.sponsorLogos.filter(
      o => o.id === this.props.LiveGameStore.currentScriptItem.id
    )[0]
    /*
      ||
      this.props.LiveGameStore.sponsorLogos.filter(
        o =>
          o.componentName ===
          this.props.LiveGameStore.currentScriptItem.componentName
      )[0]
*/

    if (this.refCommonContainer) {
      ReactDOM.unmountComponentAtNode(this.refCommonContainer)

      let comp = (
        <Provider {...{ LiveGameStore }}>
          <PlayInProgress
            question={q}
            timer={inProgressLength}
            setPlayHasStarted={this.handleSetPlayHasStarted.bind(this)}
            sponsorLogo={sLogo}
            bgColor={bgColor || '#c61818'}
            inProgressFootage={inProgressFootage}
            videoFootage={this.props.LiveGameStore.videoFootage}
          />
        </Provider>
      )

      ReactDOM.render(comp, this.refCommonContainer)

      // if (
      //   this.compareFootages(
      //     inProgressFootage,
      //     this.props.LiveGameStore.videoFootage
      //   )
      // ) {
      //   this.props.LiveGameStore.resetAnimCountPerQuestion()
      //   ReactDOM.render(comp, this.refCommonContainer)
      // } else {
      //   this.props.LiveGameStore.resetAnimCountPerQuestion()
      //   this.handleSetPlayHasStarted(false)
      // }
    }
  }

  compareFootages(footage1, footage2) {
    debugger

    footage2 = footage2 || footage1

    let pf = footage1.split(':')
    let pm = parseInt(pf[0]) * 60
    let ps = parseInt(pf[1])
    let ptotal = pm + ps

    let vf = footage2.split(':')
    let vm = parseInt(vf[0]) * 60
    let vs = parseInt(vf[1])
    let vtotal = vm + vs

    if (ptotal && vtotal) {
      if (ptotal <= vtotal) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  removeCommonContainer() {
    if (this.refCommonContainer) {
      ReactDOM.unmountComponentAtNode(this.refCommonContainer)
    }
  }

  clearResults() {
    this.props.LiveGameStore.setIsResultsShowing(false)
    if (this.refCommonContainer) {
      ReactDOM.unmountComponentAtNode(this.refCommonContainer)
    }
  }

  renderMultiplyPoints(id, nextId) {
    let sLogo = this.props.LiveGameStore.sponsorLogos.filter(
      o => o.id === id
    )[0]

    if (this.refCommonContainer) {
      ReactDOM.unmountComponentAtNode(this.refCommonContainer)
      let comp = (
        <MultiplyPoints
          nextId={nextId}
          isTimeUp={this.handleTimeIsUp.bind(this)}
          sponsorLogo={sLogo}
        />
      )
      ReactDOM.render(comp, this.refCommonContainer)
    }
  }

  handleTimeIsUp(isTimeUp, response) {
    debugger

    if (isTimeUp) {
      // if (response && response.isSynced) {
      //   this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(null, this.currentScreen.nextId)
      // }

      let tmpCurrentQuestion = { ...this.currentScreen }
      let sFootage = tmpCurrentQuestion.footage,
        inProgressFootage = tmpCurrentQuestion.inProgressFootage,
        bgColor = tmpCurrentQuestion.backgroundColor,
        type = tmpCurrentQuestion.type
      // if (
      //   this.currentScreen &&
      //   this.currentScreen.footage &&
      //   this.currentScreen.inProgressFootage
      // ) {
      //   sFootage = this.currentScreen.footage
      //   inProgressFootage = this.currentScreen.inProgressFootage
      //   bgColor = this.currentScreen.backgroundColor
      //   type = this.currentScreen.type
      // }

      let inProgressLength = 0
      if (tmpCurrentQuestion && tmpCurrentQuestion.inProgressLength) {
        //inProgressLength = <this className="currentScreen inProgressLength" />
        inProgressLength = tmpCurrentQuestion.inProgressLength
      }

      /**
       * End of Game State
       */
      if (response && response.comp === 'SUMMARY') {
        this.props.LiveGameStore.setLiveGamePlaythrough(1)
        this.props.NavigationStore.setPlayThroughOnActiveMenu('/livegame')
        this.props.LiveGameStore.updateUserPlaythrough()
        setTimeout(() => {
          this.props.NavigationStore.setCurrentView('/resolve')
        }, 1000)

        return
      }

      /**
       * Executes this line if the current screen is not a question such as GetReady, Explanation, Kickoff, etc.
       */
      if (this.currentScreen && !this.currentScreen.isQuestion) {
        /*
        if (this.currentScreen.componentName === 'SummaryXX') {
          //this.props.NavigationStore.setCurrentView('/globalranking')
          return
        }
*/
        this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
          this.currentScreen.id,
          this.currentScreen.nextId
        )

        this.props.isLockout(
          this.currentScreen &&
          this.currentScreen.componentName === 'ExplainationScreen'
            ? true
            : false
        )
      }

      if (response && response.nextId > 0) {
        if (response.comp) {
          switch (response.comp) {
            case 'RESULTS':
              this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
                null,
                response.nextId
              )
              this.clearResults()
              break
            default:
              this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
                null,
                response.nextId
              )
              this.removeCommonContainer()
              break
          }
        }

        this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
          null,
          response.nextId
        )
        this.removeCommonContainer()
        return
      }

      /**
       * Executes this line if play has started
       */
      if (this.props.LiveGameStore.inProgress && !this.LockoutPlayInProgress) {
        if (response.hideTimeout) {
          if (response.hidePlayInProgress) {
            this.LockoutPlayInProgress = true
            this.props.LiveGameStore.setInProgress(false)
            this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
              tmpCurrentQuestion.id,
              tmpCurrentQuestion.nextId
            )
            return
          } else {
            this.LockoutPlayInProgress = true
            this.renderPlayInProgress(
              inProgressLength,
              inProgressFootage,
              bgColor,
              type,
              tmpCurrentQuestion
            )
          }
          return
        }

        // let iToNum = footageToNum(inProgressFootage)
        // let vToNum = footageToNum(this.props.LiveGameStore.videoFootage)
        // if (iToNum - vToNum <= 7) {
        //   this.LockoutPlayInProgress = true
        //   this.Lockout = false
        //   this.lockoutDetailText = ''
        //   this.renderPlayInProgress(inProgressLength, inProgressFootage)
        //   return
        // }

        this.props.isLockout(true)
        this.Lockout = true
        this.lockoutHeaderText = 'lockedout'
        this.lockoutDetailText = 'play has started'

        if (response.hidePlayInProgress) {
          this.LockoutPlayInProgress = true
          this.props.LiveGameStore.setInProgress(false)
          this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
            tmpCurrentQuestion.id,
            tmpCurrentQuestion.nextId
          )
        } else {
          setTimeout(() => {
            this.LockoutPlayInProgress = true
            this.Lockout = false
            this.lockoutDetailText = ''
            this.renderPlayInProgress(
              inProgressLength,
              inProgressFootage,
              bgColor,
              type,
              tmpCurrentQuestion
            )
          }, 1500)
        }

        return
      }

      /**
       * Executes this line if the main multiplier-question screen timer is expired.
       */
      if (
        this.props.LiveGameStore.runningLength <= 0 &&
        this.isRunningLengthZero
      ) {
        if (response.hideTimeout) {
          if (response.hidePlayInProgress) {
            this.LockoutPlayInProgress = true
            this.props.LiveGameStore.setInProgress(false)
            this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
              tmpCurrentQuestion.id,
              tmpCurrentQuestion.nextId
            )
          } else {
            this.LockoutPlayInProgress = true
            this.renderPlayInProgress(
              inProgressLength,
              inProgressFootage,
              bgColor,
              type,
              tmpCurrentQuestion
            )
          }
          return
        }

        // let iToNum = footageToNum(inProgressFootage)
        // let vToNum = footageToNum(this.props.LiveGameStore.videoFootage)
        // if (iToNum - vToNum <= 7) {
        //   this.LockoutPlayInProgress = true
        //   this.Lockout = false
        //   this.lockoutDetailText = ''
        //   this.renderPlayInProgress(inProgressLength, inProgressFootage)
        //   return
        // }

        this.isRunningLengthZero = false
        this.props.isLockout(true)
        this.Lockout = true
        this.lockoutHeaderText = 'lockedout'
        this.lockoutDetailText = 'play has started'
        if (response.hidePlayInProgress) {
          this.LockoutPlayInProgress = true
          this.props.LiveGameStore.setInProgress(false)
          this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
            tmpCurrentQuestion.id,
            tmpCurrentQuestion.nextId
          )
        } else {
          setTimeout(() => {
            this.LockoutPlayInProgress = true
            this.Lockout = false
            this.lockoutDetailText = ''
            this.renderPlayInProgress(
              inProgressLength,
              inProgressFootage,
              bgColor,
              type,
              tmpCurrentQuestion
            )
          }, 1500)
        }

        return
      }

      /**
       * Executes this line for GameMaster Next Play
       */
      if (
        response &&
        response.isTimerExpired &&
        !this.props.LiveGameStore.inProgress
      ) {
        if (response.hideTimeout) {
          let nId = this.props.LiveGameStore.currentScriptItem.nextId
          this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
            null,
            nId
          )
          return
        }

        // let iToNum = footageToNum(inProgressFootage)
        // let vToNum = footageToNum(this.props.LiveGameStore.videoFootage)
        // if (iToNum - vToNum <= 7) {
        //   this.LockoutPlayInProgress = true
        //   this.Lockout = false
        //   this.lockoutDetailText = ''
        //   this.renderPlayInProgress(inProgressLength, inProgressFootage)
        //   return
        // }

        this.props.isLockout(true)
        this.Lockout = true
        this.lockoutHeaderText = response.lockoutText
          ? response.lockoutText.header
          : 'lockedout'
        this.lockoutDetailText = response.lockoutText
          ? response.lockoutText.detail
          : 'time expired'

        if (response.nextPlay) {
          /**
           * GameMaster, Sponsor
           */
          setTimeout(() => {
            this.props.isLockout(false)
            this.Lockout = false
            this.lockoutHeaderText = ''
            this.lockoutDetailText = ''
            this.props.PrePickStore.multiplier = 0
            this.currentScreen = undefined
            this.renderPlayInProgress(
              inProgressLength,
              inProgressFootage,
              bgColor,
              type,
              tmpCurrentQuestion
            )
          }, 1500)

          /*
          /!**
           * Sponsor Screen
           *!/
          setTimeout(() => {
            this.props.isLockout(false)
            this.Lockout = false
            this.lockoutHeaderText = ''
            this.lockoutDetailText = ''
            let nextId =
              this.props.LiveGameStore.currentMainQuestion.nextId ||
              this.currentScreen.nextId
            this.props.PrePickStore.multiplier = 0
            this.currentScreen = undefined
            this.renderNextPlay(nextId, sFootage, inProgressFootage)
          }, 1500)
*/
        } else {
          this.timeout = setTimeout(() => {
            this.props.isLockout(false)
            this.Lockout = false
            this.lockoutHeaderText = ''
            this.lockoutDetailText = ''
            this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
              null,
              this.currentScreen.nextId
            )
          }, 1500)
        }
        return
      }
    }
  }

  handleSplash() {
    this.props.splash()
  }

  answered(answer) {
    debugger

    let tmpCurrentQuestion = { ...this.currentScreen }
    let currId = tmpCurrentQuestion.id
    let sFootage = tmpCurrentQuestion.footage
    let inProgressFootage = tmpCurrentQuestion.inProgressFootage
    let bgColor = tmpCurrentQuestion.backgroundColor
    let type = tmpCurrentQuestion.type
    // if (this.currentScreen && this.currentScreen.inProgressFootage) {
    //   currId = this.currentScreen.id
    //   sFootage = this.currentScreen.footage
    //   inProgressFootage = this.currentScreen.inProgressFootage
    //   bgColor = this.currentScreen.backgroundColor
    //   type = this.currentScreen.type
    // }

    /**
     * RunningLength setup
     */
    if (
      answer &&
      // ('LIVEPLAY' === answer.type.trim().toUpperCase() ||
      //   'EXTRAPOINT' === answer.type.trim().toUpperCase() ||
      //   'GAMEMASTER' === answer.type.trim().toUpperCase() ||
      //   'PRIZE' === answer.type.trim().toUpperCase() ||
      //   'SPONSOR' === answer.type.trim().toUpperCase()) &&
      this.props.LiveGameStore.runningLength <= 0
    ) {
      this.isRunningLengthZero = true
      this.handleTimeIsUp(true, {
        hideTimeout: answer.hideTimeout,
        hidePlayInProgress: answer.hidePlayInProgress,
      })
      return
    }

    let inProgressLength = 0
    if (tmpCurrentQuestion && tmpCurrentQuestion.inProgressLength) {
      inProgressLength = tmpCurrentQuestion.inProgressLength
      this.answers.push(answer.answer)
    }

    /**
     * Executes this line if the current screen is not a question such as GetReady, Explanation, Kickoff, etc.
     */
    if (answer === undefined) {
      this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
        null,
        this.currentScreen.nextId
      )
      return
    }

    /**
     * Executes this if Next Play
     */
    if (answer && answer.nextPlay) {
      //put half a second timeout to wait for the lock icon to appear
      if (answer.hidePlayInProgress) {
        this.LockoutPlayInProgress = true
        this.props.LiveGameStore.setInProgress(false)
        this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
          tmpCurrentQuestion.id,
          tmpCurrentQuestion.nextId
        )
      } else {
        setTimeout(() => {
          let nextId = this.props.LiveGameStore.currentMainQuestion.nextId || 0
          this.currentScreen = undefined
          this.props.PrePickStore.multiplier = 0
          //original setup => this.renderNextPlay(currId, nextId, sFootage, inProgressFootage)
          this.renderPlayInProgress(
            inProgressLength,
            inProgressFootage,
            bgColor,
            type,
            tmpCurrentQuestion
          )
        }, 500)
      }
      return
    }

    /**
     * Executes this line if question has no follow-up question(s)
     */
    if (answer && answer.nextId <= 0 && !answer.nextPlay) {
      let nextId = this.props.LiveGameStore.currentMainQuestion.nextId || 0
      if (!nextId) {
        this.timeout = setTimeout(() => {
          /////////////////////////////////////////////////////////---TO BE USED---this.props.NavigationStore.setCurrentView('/globalranking')
        }, 1500)
        return
      }

      //put half a second timeout to wait for the lock icon to appear
      if (answer.hidePlayInProgress) {
        this.LockoutPlayInProgress = true
        this.props.LiveGameStore.setInProgress(false)
        this.currentScreen = this.props.LiveGameStore.getCurrentScriptItem(
          tmpCurrentQuestion.id,
          tmpCurrentQuestion.nextId
        )
      } else {
        setTimeout(() => {
          this.currentScreen = undefined
          this.props.LiveGameStore.setInProgress(true)
          this.LockoutPlayInProgress = true
          this.renderPlayInProgress(
            inProgressLength,
            inProgressFootage,
            bgColor,
            type,
            tmpCurrentQuestion
          )
        }, 500)
      }
      return
    }

    /**
     * Executes this line if question has a follow-up question(s) and needs multiply points
     */
    if (answer && answer.nextId > 0) {
      if (this.props.LiveGameStore.runningLength <= 3) {
        this.props.LiveGameStore.setInProgress(true)
        this.handleTimeIsUp(true, {
          hideTimeout: answer.hideTimeout,
          hidePlayInProgress: answer.hidePlayInProgress,
        })
      } else {
        this.renderMultiplyPoints(answer.questionId, answer.nextId)
        this.currentScreen = undefined
      }
      return
    }
  }

  runningLengthCountdown(val) {
    debugger
    if (val) {
      let vf = this.props.LiveGameStore.videoFootage
        ? this.props.LiveGameStore.videoFootage.split(':')
        : '0:0'.split(':')
      let vm = 0
      let vs = 0
      let vtotal = 0
      if (vf && vf.length === 2) {
        vm = parseInt(vf[0]) * 60
        vs = parseInt(vf[1])
        vtotal = vm + vs
      }

      let f = val.split(':')
      let m = 0
      let s = 0
      let total = 0
      if (f && f.length === 2) {
        m = parseInt(f[0]) * 60
        s = parseInt(f[1])
        total = m + s + 1
      }

      if (total > vtotal) {
        this.props.LiveGameStore.setRunningLength(total - vtotal)

        if (this.c) {
          clearInterval(this.c)
        }

        this.c = setInterval(() => {
          this.props.LiveGameStore.setRunningLength(
            this.props.LiveGameStore.runningLength - 1
          )
          setTimeout(() => {
            if (!this.props.LiveGameStore.runningLength) {
              clearInterval(this.c)
            }
          }, 0)
        }, 1000)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.c)
  }

  componentWillMount() {
    this.currentScreen = this.props.LiveGameStore.currentScriptItem
  }

  LiveQuestionOption() {
    debugger
    const current = Object.assign({}, this.currentScreen || {})
    const Comp = this.screens[current.componentName]

    if (current && Comp) {
      if (this.LockoutPlayInProgress) {
        return null
      }

      if (
        current.choices &&
        current.choices.length > 1 &&
        this.props.PrePickStore.multiplier <= 0
      ) {
        this.props.LiveGameStore.setCurrentPageId(current.id)
        this.props.LiveGameStore.setIsInitNextPage(true)
        if (this.pageId !== this.props.LiveGameStore.currentPageId) {
          this.pageId = this.props.LiveGameStore.currentPageId
          //this.runningLengthCountdown(current.footage)
        }
        if (current.stars > 0) {
          this.props.PrePickStore.setIsStar(true)
        }
      } else {
        if (current.componentName === 'Summary') {
          this.props.LiveGameStore.setCurrentPageId(current.id)
          this.props.LiveGameStore.setIsInitNextPage(true)
          if (this.pageId !== this.props.LiveGameStore.currentPageId) {
            this.pageId = this.props.LiveGameStore.currentPageId
            //this.runningLengthCountdown(current.footage)
          }
        }
      }

      let sLogo = this.props.LiveGameStore.sponsorLogos.filter(
        o => o.id === current.id
      )[0]

      this.props.isLockout(
        current.componentName === 'ExplainationScreen' ? true : false
      )

      /**
       * analytic
       */
      if (
        current.choices &&
        current.choices.length > 1 &&
        this.pageIdAnalytic !== this.props.LiveGameStore.currentPageId
      ) {
        this.pageIdAnalytic = this.props.LiveGameStore.currentPageId
        this.props.LiveGameStore.setCurrentLivePlayCount(1)
        this.props.PrePickStore.captureAnalyticLivePlayStart()

        if (current.stars > 0) {
          this.props.LiveGameStore.setCurrentStarCount(1)
          this.props.PrePickStore.captureAnalyticStarsStart()
        }
      }

      this.props.questionBackground(current.backgroundImage)
      return (
        <Comp
          key={`questionComp-${current.id}`}
          teams={this.props.PrePickStore.teams}
          question={current}
          timer={current.length}
          isTimeUp={this.handleTimeIsUp.bind(this)}
          answered={this.answered.bind(this)}
          splash={this.handleSplash.bind(this)}
          sponsorLogo={sLogo}
          proceedToVideoScreen={this.props.proceedToVideoScreen}
          isTextCard={current.isTextCard}
          msg={this.getTextCardMessage(current.id)}
          footage={current.footage}
          ////videoFootage={this.props.LiveGameStore.videoFootage || '0:0'}
          showSync={this.props.showSync}
          nextScreenAfterSync={this.nextScreenAfterSync}
        />
      )
    }

    // this.timeout = setTimeout(() => {
    //   this.props.NavigationStore.setCurrentView('/socialranking')
    // }, 1500)

    /*
    if (current.isEnd) {
      this.timeout = setTimeout(() => {
        this.props.NavigationStore.setCurrentView('/globalranking')
      }, 1000)
    }
*/

    return null
  }

  render() {
    return (
      <LiveQuestionContainer>
        {this.Lockout ? (
          <Lockout
            reference={ref => (this.lockoutRef = ref)}
            header={this.lockoutHeaderText}
            detail={this.lockoutDetailText}
          />
        ) : null}
        <CommonContainer innerRef={c => (this.refCommonContainer = c)} />
        {this.LiveQuestionOption()}
      </LiveQuestionContainer>
    )
  }
}

const LiveQuestionContainer = styled.div`
  width: inherit;
  height: inherit;
  font-family: pamainlight;
  position: absolute;
`
const CommonContainer = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
`
