import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { extendObservable, intercept, observe } from 'mobx'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { TimelineMax, TweenMax, Back, Quad } from 'gsap'
import GSAP from 'react-gsap-enhancer'
import PrePick from '@/assets/images/symbol-prepick.svg'
import PrePickWhite from '@/assets/images/symbol-prepick_white.svg'
import GameMaster from '@/assets/images/symbol-gm.svg'
import GameMasterWhite from '@/assets/images/symbol-gm_white.svg'
import LivePlay from '@/assets/images/symbol-liveplay.svg'
import ExtraPoint from '@/assets/images/symbol-liveplay.svg'
import Summary from '@/assets/images/symbol-liveplay.svg'
import LivePlayWhite from '@/assets/images/symbol-liveplay_white.svg'
import Sponsor from '@/assets/images/symbol-sponsor.svg'
import SponsorWhite from '@/assets/images/symbol-sponsor_white.svg'
import Prize from '@/assets/images/symbol-prize.svg'
import PrizeWhite from '@/assets/images/symbol-prize_white.svg'
import StarIcon from '@/assets/images/star-icon-gold.svg'
import { vhToPx, hex2rgb, IsMobile, responsiveDimension } from '@/utils'

const Icons = {
  PrePick,
  GameMaster,
  LivePlay,
  Sponsor,
  Prize,
  ExtraPoint,
  Summary,
}

const IconsWhite = {
  PrePick: PrePickWhite,
  GameMaster: GameMasterWhite,
  LivePlay: LivePlayWhite,
  Sponsor: SponsorWhite,
  Prize: PrizeWhite,
  ExtraPoint: LivePlayWhite,
  Summary: LivePlayWhite,
}

const IconsColor = {
  Empty: '#c1c1c1',
  PrePick: '#2fc12f',
  GameMaster: '#19d1bf',
  LivePlay: '#c61818',
  Sponsor: '#495bdb',
  Prize: '#9368AA',
  ExtraPoint: '#c61818',
  Summary: '#c61818',
}

const textColor = {
  LivePlay: '#ffffff',
  PrePick: '#2fc12f',
  GameMaster: '#ffffff',
  Sponsor: '#ffffff',
  Prize: '#ffffff',
  ExtraPoint: '#ffffff',
  Summary: '#ffffff',
}

const IconsColorDark = {
  Empty: '#888',
  PrePick: '#146314',
  GameMaster: '#118e82',
  LivePlay: '#601313',
  Sponsor: '#24245b',
  Prize: '#452d59',
  ExtraPoint: '#601313',
  Summary: '#601313',
}
const backgroundColorLight = {
  LivePlay: '#c61818',
  PrePick: '#ffffff',
  GameMaster: '#19d1bf',
  Sponsor: '#495bdb',
  Prize: '#9368AA',
  ExtraPoint: '#c61818',
  Summary: '#c61818',
}

@inject('PrePickStore', 'LiveGameStore', 'ProfileStore')
@observer
@GSAP
class HistoryTracker extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      chosen: false,
      shortHandText: '',
      preText: props.preText || 'Live Play',
      answers:
        this.props.PrePickStore.answers.length > 0
          ? this.props.PrePickStore.answers
          : [],
      symbol: null,
      symbolIcon: this.props.symbol || 'LivePlay',
      refShortHandLabelWrapper: null,
      MasterWrapper: null,
      refSymbolWrapper: null,
      PlayImage: null,
      PlayIcon: null,
      animation: false,
      tmpAnswer: null,
      nextSymbolIcon: this.props.nextSymbol || 'LivePlay',
    })

    this.liveplayInProgress = false
    this.pageId = 0
    this.isAnsweredGameMaster = false

    intercept(this.props.PrePickStore.answers, change => {
      this.tmpAnswer = Object.assign({}, change.added[0])
      this.liveplayChangePreText(change.added[0])
      this.slideGreenShorthHand(change.added[0])

      return change
    })

    intercept(this.props.LiveGameStore, 'inProgress', change => {
      this.liveplayInProgress = change.newValue
      return change
    })

    intercept(this.props.LiveGameStore, 'isResultsShowing', change => {
      /////////////////////////////this.liveplayChangeInProgress(change.newValue)
      if (!change.newValue) {
        this.props.PrePickStore.setMultiplier(0)
        this.props.PrePickStore.setIsStar(false)
      }
      return change
    })

    intercept(this.props.LiveGameStore, 'isInitNextPage', change => {
      if (change.newValue) {
        if (this.props.symbol !== 'PrePick') {
          if (!this.liveplayInProgress) {
            if (this.pageId !== this.props.LiveGameStore.currentPageId) {
              this.pageId = this.props.LiveGameStore.currentPageId
              let refMasterWrapper = document.getElementById(
                'historytracker-masterwrapper'
              )

              new TimelineMax({ repeat: 0 })
                .to(refMasterWrapper, 0, {
                  opacity: 1,
                  onComplete: () => {
                    this.livegamePushAnswer()
                  },
                })
                .to(refMasterWrapper, 0.5, {
                  x: '-100%',
                  onComplete: () => {
                    setTimeout(() => {
                      setTimeout(() => {
                        this.props.LiveGameStore.setIsInitNextPage(false)
                      }, 0)
                      this.props.LiveGameStore.setIsNextPage(true)
                    }, 0)
                  },
                })
                .to(refMasterWrapper, 0.3, { x: '0%' })
            }
          }
        }
      }

      return change
    })

    intercept(this.props.LiveGameStore, 'isNextPage', change => {
      if (change.newValue) {
        if (this.props.symbol !== 'PrePick') {
          if (!this.liveplayInProgress) {
            this.preText = this.props.preText || 'Live Play'
            this.symbolIcon = this.props.symbol || 'LivePlay'
            this.nextSymbolIcon = this.props.nextSymbol || 'LivePlay'
            this.isAnsweredGameMaster = false
            this.props.LiveGameStore.setIsNextPage(false)
          }
        }
      }
      return change
    })
  }

  livegamePushAnswer() {
    if (this.tmpAnswer) {
      //extra points
      if (
        this.tmpAnswer.type === 'ExtraPoint' &&
        this.tmpAnswer.answer === this.tmpAnswer.correctAnswer
      ) {
        this.props.ProfileStore.creditCurrencies({
          currency: 'points',
          amount: this.tmpAnswer.extraPoints,
        })
      }

      //stars
      if (this.tmpAnswer.stars && this.tmpAnswer.stars > 0) {
        for (let i = 0; i < this.tmpAnswer.livegameAnswers.length; i++) {
          let item = this.tmpAnswer.livegameAnswers[i]
          if (item.answer === item.correctAnswer) {
            this.props.ProfileStore.creditCurrencies({
              currency: 'stars',
              amount: item.stars,
            })
          }
        }
      }

      this.answers.push(this.tmpAnswer)
      setTimeout(() => {
        this.tmpAnswer = null
      }, 0)
    }
  }

  togglePreText = () => {
    setTimeout(() => {
      if (!this.liveplayInProgress) {
        if (this.props.preText) {
          this.preText = this.props.preText
        }
      }
      this.symbolIcon = this.props.symbol
      this.nextSymbolIcon = this.props.nextSymbol
    }, 1000)
  }

  componentDidUpdate(prevProps) {
    /*
    if (this.props.symbol !== 'PrePick') {
      if (!this.liveplayInProgress) {
        this.preText = this.props.preText || 'Live Play'
        this.symbolIcon = this.props.symbol || 'LivePlay'
        this.nextSymbolIcon = this.props.nextSymbol || 'LivePlay'
      }
    }
*/
  }

  liveplayChangePreText(answer) {
    if (this.props.symbol !== 'PrePick') {
      if (answer.multiplier <= 0) {
        //setTimeout(() => {
        this.preText = 'NO POINTS'
        if (this.LivePlayText) {
          TweenMax.set(this.LivePlayText, {
            fontSize: responsiveDimension(3.5),
          })
        }
        //}, 0)
      } else {
        if (this.symbolIcon !== 'LivePlay') {
          this.isAnsweredGameMaster = true
          this.preText =
            answer.type === 'Prize' || answer.type === 'ExtraPoint'
              ? answer.shortHand
              : '+' + answer.shortHand
          if (this.ActiveWrapper) {
            TweenMax.to(this.ActiveWrapper, 0.3, { width: '60%' })
          }
        }
      }
    }
  }

  liveplayChangeInProgress(isResultsShowing) {
    if (!isResultsShowing) {
      setTimeout(() => {
        this.answers.push(this.tmpAnswer)
        setTimeout(() => {
          this.tmpAnswer = null
          this.props.PrePickStore.setMultiplier(0)
        }, 0)
      }, 500)
    }

    /*
    if (!isResultsShowing) {
      if (this.refShortHandLabelWrapper) {
        TweenMax.to(this.refShortHandLabelWrapper, 0.5, {
          delay: 0.2,
          width: '100%',
          ease: Back.easeOut.config(2),
          onComplete: () => {
            this.renderActivePlayState(this.tmpAnswer)
            setTimeout(() => {
              this.tmpAnswer = null
              this.props.PrePickStore.multiplier = 0
            }, 0)
          },
        })
      } else {
        this.answers.push(this.tmpAnswer)
        this.props.PrePickStore.multiplier = 0
      }
    }
*/
  }

  slideGreenShorthHand(answer) {
    if (answer.type === 'PrePick') {
      if (this.refShortHandLabelWrapper) {
        this.animation = true
        TweenMax.to(this.refShortHandLabelWrapper, 0.5, {
          delay: 0.2,
          width: '65%',
          ease: Back.easeOut.config(2),
          onStart: this.updateActiveBarText.bind(this),
          onComplete: () => {
            this.renderActivePlayState(answer)
          },
        })
      } else {
        this.answers.push(answer)
      }
    } else if (
      answer.type === 'GameMaster' ||
      answer.type === 'Sponsor' ||
      answer.type === 'Prize' ||
      answer.type === 'ExtraPoint'
    ) {
      if (answer.livegameAnswers.length > 0) {
        /*
        TweenMax.to(this.MasterWrapper, 0.5, {
          x: '-100%',
          onComplete: () => {
            this.answers.push(answer)
            setTimeout(() => {
              this.tmpAnswer = null
              this.props.PrePickStore.multiplier = 0
            }, 0)
          },
        })
*/
      } else {
        /*
        this.answers.push(answer)
        setTimeout(() => {
          this.tmpAnswer = null
          this.props.PrePickStore.multiplier = 0
        }, 0)
*/
      }
    }

    /*
    if (answer.type !== 'LivePlay') {
      if (this.refShortHandLabelWrapper) {
        this.animation = true
        TweenMax.to(this.refShortHandLabelWrapper, 0.5, {
          delay: 0.2,
          width: '65%',
          ease: Back.easeOut.config(2),
          onStart: this.updateActiveBarText.bind(this),
          onComplete: () => {
            this.renderActivePlayState(answer)
          },
        })
      } else {
        this.answers.push(answer)
      }
    }
*/

    // let newAns = this.props.PrePickStore.answers.filter(o => o.questionId === answer.questionId)[0]
    // if (answer.type === 'GameMaster' && newAns) {
    //   this.animation = true
    //   TweenMax.to(this.refShortHandLabelWrapper, 0.5, {
    //     delay: 0.2,
    //     width: '65%',
    //     ease: Back.easeOut.config(2),
    //     onComplete: () => {
    //       this.renderActivePlayState(answer)
    //     },
    //   })
    // }
  }

  updateActiveBarText() {
    const current = this.props.PrePickStore.answers.reverse()[0]
    this.shortHandText = current.shortHand
    this.preText = current.answer

    /*
        TweenMax.to(this.SymbolContainer, 0.1, {
          border: '0px solid white',
        })
        TweenMax.to(this.refSymbolWrapper, 0.1, {
          transform: 'scale(0)',
          width: '0%',
          height: '0%',
          onComplete: () => {
            TweenMax.set(this.SymbolContainer, {
              width: '100%',
            })
            TweenMax.set(this.MasterWrapper, {
              width: '100%',
            })
            TweenMax.set(this.ActiveWrapper, {
              width: '100%',
            })
          },
        })
    */
  }

  resetActiveBarText() {
    this.shortHandText = ''
    this.preText = this.props.preText || 'PRE PICK'
    this.animation = false
    TweenMax.set(this.PlayImage, {
      attr: { src: IconsWhite[this.symbolIcon] },
    })
    /*
    TweenMax.set(this.refNexPlayType, {
      width: '0%',
      borderWidth: '0px',
    })
    TweenMax.to(this.refNexPlayType, 0.2, {
      width: '25%',
      borderWidth: isSmall ? '0.4vw' : '0.3vh',
      ease: Back.easeOut.config(2),
    })
*/
  }

  renderActivePlayState(answer) {
    if (answer.type === 'PrePick') {
      TweenMax.set(this.PlayImage, {
        animationPlayState: 'paused',
        attr: { src: Icons[this.symbolIcon] },
      })

      TweenMax.to(this.refShortHandLabelWrapper, 0.5, {
        width: '65%',
      })

      TweenMax.to(this.refNexPlayType, 0.5, {
        animationPlayState: 'paused',
        width: '20%',
      })

      TweenMax.to(this.PlayIcon, 0.5, {
        backgroundColor: 'white',
        //scale: 1.4,
        rotation: 390,
        //x: '-20%',
        //y: '20%',
      })

      TweenMax.set(this.refSymbolWrapper, { display: 'none' })
      TweenMax.to(this.ActiveWrapper, 0.5, { width: '100%' })
      TweenMax.to(this.MasterWrapper, 0.5, {
        x: '-100%',
        borderTopRightRadius: responsiveDimension(5.5),
        borderBottomRightRadius: responsiveDimension(5.5),
        height: responsiveDimension(5.5),
        opacity: 0.6,
        onComplete: () => {
          if (this.props.mode === 'live') {
            this.answers.push(answer)
          }
          //  this.resetActiveBarText()
        },
      })
    } else {
      TweenMax.set(this.refSymbolWrapper, { display: 'none' })
      TweenMax.to(this.ActiveWrapper, 0.5, { width: '100%' })
      TweenMax.to(this.MasterWrapper, 0.5, {
        x: '-100%',
        borderTopRightRadius: responsiveDimension(5.5),
        borderBottomRightRadius: responsiveDimension(5.5),
        height: responsiveDimension(5.5),
        opacity: 0.6,
        onComplete: () => {
          if (this.props.mode === 'live') {
            this.answers.push(answer)
          }
        },
      })
    }
  }

  componentDidMount() {
    const symbolAnimation = () => {
      return new TimelineMax({ repeat: -1 }).to(this.symbol, 1.5, {
        rotation: 360,
        ease: Back.easeOut.config(1.75),
      })
    }
    this.addAnimation(symbolAnimation)
    if (this.props.PrePickStore.answers.length) {
      this.answers = [...this.props.PrePickStore.answers]
    }
    TweenMax.fromTo(
      this.refNexPlayType,
      0.5,
      {
        width: '0%',
        border: 'none',
        borderWidth: 0,
      },
      {
        ease: Back.easeOut.config(2),
        width: '25%',
        borderWidth: responsiveDimension(0.3),
      }
    )

    TweenMax.fromTo(
      this.MasterWrapper,
      0.5,
      {
        width: '50%',
      },
      {
        width: '100%',
        ease: Back.easeOut.config(1),
      }
    )

    if (this[`recordwrapper-0`]) {
      TweenMax.fromTo(
        this[`recordwrapper-0`],
        0.3,
        {
          width: '0%',
        },
        {
          width: '100%',
        }
      )
    }
  }

  renderHistoryAnswerStar(r) {
    let multiplier = 0
    let answer = null
    let starEarned = false
    let starAnswer =
      r.livegameAnswers && r.livegameAnswers.length > 0
        ? r.livegameAnswers[0]
        : null
    if (starAnswer && starAnswer.stars > 0) {
      multiplier = starAnswer.multiplier || 1
      if (
        starAnswer.answer.trim().toLowerCase() ===
        starAnswer.correctAnswer.trim().toLowerCase()
      ) {
        starEarned = true
        answer = starAnswer.answer
      } else {
        starEarned = false
        answer = starAnswer.answer
      }
    } else {
      starEarned = false
      answer = 'no answer'
      multiplier = 1
    }

    return (
      <StarHistoryLivePlayWrapper starEarned={starEarned}>
        <StarInnerPanel>
          <StarInnerPanelLeft backgroundColor={IconsColor[r.type]}>
            <StarPanelLeftShorthand>{r.shortHand}</StarPanelLeftShorthand>
            <StarPanelCircle color={IconsColor[r.type]} src={Icons[r.type]}>
              {/*{multiplier}X*/}
            </StarPanelCircle>
          </StarInnerPanelLeft>
          <StarInnerPanelRight color={IconsColor[r.type]}>
            {answer}
          </StarInnerPanelRight>
        </StarInnerPanel>
        <Star src={StarIcon} />
      </StarHistoryLivePlayWrapper>
    )
  }

  renderHistoryAnswerLivePlay(r) {
    if (r.stars > 0 || r.isStar) {
      for (var i = 0; i < r.livegameAnswers.length; i++) {
        let livegameAnswer = r.livegameAnswers[i]
        let correctAnswer = livegameAnswer.correctAnswer
          ? livegameAnswer.correctAnswer.trim().toLowerCase()
          : ''
        let correct =
          livegameAnswer.answer.trim().toLowerCase() === correctAnswer
        if (!livegameAnswer.isCredited) {
          if (correct) {
            this.props.ProfileStore.creditCurrencies({
              currency: 'points',
              amount: r.feeCounterValue * 100,
            })
          } else {
            r.shortHand = r.shortHand - r.feeCounterValue * 100
          }
          livegameAnswer.isCredited = true
        }
      }

      return this.renderHistoryAnswerStar(r)
    } else {
      let sHand = r.shortHand <= 0 ? 'NO POINTS' : `+${r.shortHand}`

      return (
        <LivePlayResponseWrapper backgroundColor={backgroundColorLight[r.type]}>
          <LivePlayTierWrapper>
            {this.renderMultierHistory(r)}
          </LivePlayTierWrapper>
          <LivePlayResponseText>{sHand}</LivePlayResponseText>
        </LivePlayResponseWrapper>
      )
    }
  }

  renderHistoryAnswerGameMaster(r) {
    for (var i = 0; i < r.livegameAnswers.length; i++) {
      let livegameAnswer = r.livegameAnswers[i]
      let correctAnswer = livegameAnswer.correctAnswer
        ? livegameAnswer.correctAnswer.trim().toLowerCase()
        : ''
      let correct = livegameAnswer.answer.trim().toLowerCase() === correctAnswer
      if (!livegameAnswer.isCredited) {
        if (correct) {
          this.props.ProfileStore.creditCurrencies({
            currency: 'points',
            amount: r.feeCounterValue * 100,
          })
        } else {
          if (r.stars <= 0) {
            r.shortHand = r.shortHand - r.feeCounterValue * 100
          }
        }
        livegameAnswer.isCredited = true
      }
    }

    if (r.stars > 0 || r.isStar) {
      return this.renderHistoryAnswerStar(r)
    } else {
      if (r.answer) {
        let sHand = ''
        if (r.answer === r.correctAnswer) {
          sHand =
            r.shortHand <= 0
              ? 'NO POINTS'
              : !isNaN(r.shortHand)
                ? `+${r.shortHand}`
                : r.shortHand
        } else {
          sHand = 'NO POINTS'
        }

        return (
          <ResponseWrapper gms color={IconsColor[r.type]}>
            <GameMasterShortHand color={IconsColor[r.type]}>
              <GameMasterShortHandText>{sHand}</GameMasterShortHandText>
              <GameMasterSymbol>
                <SymbolImg src={Icons[r.type]} />
              </GameMasterSymbol>
            </GameMasterShortHand>
            <GameMasterResponseText color={IconsColor[r.type]}>
              {r.answer}
            </GameMasterResponseText>
          </ResponseWrapper>
        )
      } else {
        return this.renderNoPoints(r)
      }
    }
  }

  renderHistoryAnswerSponsor(r) {
    for (var i = 0; i < r.livegameAnswers.length; i++) {
      let livegameAnswer = r.livegameAnswers[i]
      let correctAnswer = livegameAnswer.correctAnswer
        ? livegameAnswer.correctAnswer.trim().toLowerCase()
        : ''
      let correct = livegameAnswer.answer.trim().toLowerCase() === correctAnswer
      if (!livegameAnswer.isCredited) {
        if (correct) {
          this.props.ProfileStore.creditCurrencies({
            currency: 'points',
            amount: r.feeCounterValue * 100,
          })
        } else {
          if (r.stars <= 0) {
            r.shortHand = r.shortHand - r.feeCounterValue * 100
          }
        }
        livegameAnswer.isCredited = true
      }
    }

    if (r.stars > 0 || r.isStar) {
      return this.renderHistoryAnswerStar(r)
    } else {
      let sHand = ''
      if (r.answer === r.correctAnswer) {
        sHand =
          r.shortHand <= 0
            ? 'NO POINTS'
            : !isNaN(r.shortHand)
              ? `+${r.shortHand}`
              : r.shortHand
      } else {
        sHand = 'NO POINTS'
      }
      return (
        <ResponseWrapper gms color={IconsColor[r.type]}>
          <GameMasterShortHand color={IconsColor[r.type]}>
            <GameMasterShortHandText>{sHand}</GameMasterShortHandText>
            <GameMasterSymbol>
              <SymbolImg src={Icons[r.type]} />
            </GameMasterSymbol>
          </GameMasterShortHand>
          <GameMasterResponseText color={IconsColor[r.type]}>
            {r.answer}
          </GameMasterResponseText>
        </ResponseWrapper>
      )
    }
  }

  renderHistoryAnswerPrize(r) {
    for (var i = 0; i < r.livegameAnswers.length; i++) {
      let livegameAnswer = r.livegameAnswers[i]
      let correctAnswer = livegameAnswer.correctAnswer
        ? livegameAnswer.correctAnswer.trim().toLowerCase()
        : ''
      let correct = livegameAnswer.answer.trim().toLowerCase() === correctAnswer
      if (!livegameAnswer.isCredited) {
        if (correct) {
          this.props.ProfileStore.creditCurrencies({
            currency: 'points',
            amount: r.feeCounterValue * 100,
          })
        } else {
          if (r.stars <= 0) {
            r.shortHand = r.shortHand - r.feeCounterValue * 100
          }
        }
        livegameAnswer.isCredited = true
      }
    }

    if (r.stars > 0 || r.isStar) {
      return this.renderHistoryAnswerStar(r)
    } else {
      let sHand = ''
      if (r.answer === r.correctAnswer) {
        sHand =
          r.shortHand <= 0
            ? 'NO POINTS'
            : !isNaN(r.shortHand)
              ? `+${r.shortHand}`
              : r.shortHand
      } else {
        sHand = 'NO POINTS'
      }
      return (
        <ResponseWrapper gms color={IconsColor[r.type]}>
          <GameMasterShortHand color={IconsColor[r.type]}>
            <GameMasterShortHandText>{sHand}</GameMasterShortHandText>
            <GameMasterSymbol>
              <SymbolImg src={Icons[r.type]} />
            </GameMasterSymbol>
          </GameMasterShortHand>
          <GameMasterResponseText color={IconsColor[r.type]}>
            {r.answer}
          </GameMasterResponseText>
        </ResponseWrapper>
      )
    }
  }

  renderHistoryAnswerExtraPoint(r) {
    if (r.stars > 0 || r.isStar) {
      return this.renderHistoryAnswerStar(r)
    } else {
      let sHand = ''
      if (r.answer === r.correctAnswer) {
        sHand =
          r.shortHand <= 0
            ? 'NO POINTS'
            : !isNaN(r.shortHand)
              ? `+${r.shortHand}`
              : r.shortHand
      } else {
        sHand = 'NO POINTS'
      }
      return (
        <ResponseWrapper gms color={IconsColor[r.type]}>
          <GameMasterShortHand color={IconsColor[r.type]}>
            <GameMasterShortHandText>{sHand}</GameMasterShortHandText>
            <GameMasterSymbol>
              <SymbolImg src={Icons[r.type]} />
            </GameMasterSymbol>
          </GameMasterShortHand>
          <GameMasterResponseText color={IconsColor[r.type]}>
            {r.answer}
          </GameMasterResponseText>
        </ResponseWrapper>
      )
    }
  }

  renderMultier() {
    const multiplier = []

    let { isStar } = this.props.PrePickStore

    if (this.symbolIcon === 'LivePlay') {
      for (var i = 0; i < this.props.PrePickStore.multiplier; i++) {
        multiplier.push(
          <MultiplierNumber
            i={i}
            length={this.props.PrePickStore.multiplier}
            key={`multiplier-${i}`}
            textColor={isStar ? '#eede16' : '#ffffff'}
            color={isStar ? '#eede16' : backgroundColorLight[this.symbolIcon]}
            innerRef={c => (this.refMultiplierNumber = c)}
          >
            {i + 1}X
          </MultiplierNumber>
        )
      }
    }

    return multiplier
  }

  renderMultierHistory(r) {
    const multiplier = []
    let amt = 0

    for (var i = 0; i < r.livegameAnswers.length; i++) {
      let livegameAnswer = r.livegameAnswers[i]
      let correctAnswer = livegameAnswer.correctAnswer
        ? livegameAnswer.correctAnswer.trim().toLowerCase()
        : ''
      let correct = livegameAnswer.answer.trim().toLowerCase() === correctAnswer
      multiplier.push(
        <MultiplierNumber
          i={i}
          length={r.multiplier}
          key={`multiplier-${r.questionId}-${i}`}
          color={correct ? backgroundColorLight[r.type] : '#7d7d7d'}
          backgroundColor={correct ? '#ffffff' : '#4f4f4f'}
        >
          <div
            style={{
              color: correct ? backgroundColorLight[r.type] : '#7d7d7d',
            }}
          >
            {i + 1}X
          </div>
        </MultiplierNumber>
      )

      if (!livegameAnswer.isCredited) {
        if (correct) {
          this.props.ProfileStore.creditCurrencies({
            currency: 'points',
            amount: r.feeCounterValue * 100,
          })
        } else {
          r.shortHand = r.shortHand - r.feeCounterValue * 100
        }
        livegameAnswer.isCredited = true
      }
    }

    /*
        for (var i = 0; i < r.multiplier; i++) {
          multiplier.push(
            <MultiplierNumber
              i={i}
              length={r.multiplier}
              key={`multiplier-${r.questionId}-${i}`}
              color={backgroundColorLight[r.type]}
            >
              {i + 1}X
            </MultiplierNumber>
          )
        }
    */

    return multiplier
  }

  renderNoPoints(r) {
    return (
      <ResponseWrapper isEmpty color={'#c1c1c1'}>
        <ShortHand isEmpty color={'#888'}>
          no points
        </ShortHand>
        <EmptySymbol>
          <SymbolImg isEmpty src={Icons[r.type]} />
        </EmptySymbol>
      </ResponseWrapper>
    )
  }

  renderLivePlaySymbol() {
    let activeBarText = ''
    if (this.tmpAnswer && this.tmpAnswer.type === 'ExtraPoint') {
      activeBarText = this.tmpAnswer.extraPoints
        ? `+${this.tmpAnswer.extraPoints}`
        : this.preText
    } else {
      activeBarText =
        this.props.PrePickStore.multiplier > 0
          ? `+${this.props.PrePickStore.multiplier *
              (this.props.LiveGameStore.feeCounterValue * 100)}`
          : this.preText
    }
    return (
      <MasterWrapperOuter>
        <MasterWrapper
          maxWidth={!!this.props.PrePickStore.multiplier}
          innerRef={ref => (this.MasterWrapper = ref)}
          noPoint={this.preText}
          id="historytracker-masterwrapper"
        >
          <SymbolContainer
            dark={IconsColorDark[this.symbolIcon]}
            color={IconsColor[this.symbolIcon]}
            innerRef={ref => (this.SymbolContainer = ref)}
          >
            <ActiveWrapper
              color={backgroundColorLight[this.symbolIcon]}
              innerRef={ref => (this.ActiveWrapper = ref)}
              isAnsweredGameMaster={this.isAnsweredGameMaster}
            >
              {this.renderMultier()}
              <ShortHandWrapper
                color={IconsColor[this.symbolIcon]}
                innerRef={ref => (this.refShortHandLabelWrapper = ref)}
              >
                <ShortHandLabel>{this.shortHandText}</ShortHandLabel>
              </ShortHandWrapper>
              <PrePickNumberWrapper />

              <LivePlayText
                type={this.symbolIcon}
                color={textColor[this.symbolIcon]}
                innerRef={ref => (this.LivePlayText = ref)}
                isAnsweredGameMaster={this.isAnsweredGameMaster}
              >
                {activeBarText}
              </LivePlayText>
            </ActiveWrapper>
            <SymbolWrapper innerRef={ref => (this.refSymbolWrapper = ref)}>
              <SymbolImg
                innerRef={ref => (this.symbol = ref)}
                src={Icons[this.symbolIcon]}
              />
            </SymbolWrapper>
          </SymbolContainer>
        </MasterWrapper>
      </MasterWrapperOuter>
    )
  }

  render() {
    return (
      <HistoryContainer
        ref={ref => {
          this.body = ref
        }}
      >
        <NextPlayType
          maxWidth={this.animation}
          dark={
            IconsColorDark[
              this.props.mode === 'live' ? this.nextSymbolIcon : this.symbolIcon
            ]
          }
          color={
            IconsColor[
              this.props.mode === 'live' ? this.nextSymbolIcon : this.symbolIcon
            ]
          }
          innerRef={ref => (this.refNexPlayType = ref)}
        >
          <PlayIcon
            innerRef={ref => (this.PlayIcon = ref)}
            backgroundColor={
              IconsColor[
                this.props.mode === 'live'
                  ? this.nextSymbolIcon
                  : this.symbolIcon
              ]
            }
          >
            <PlayImage
              innerRef={ref => (this.PlayImage = ref)}
              src={
                IconsWhite[
                  this.props.mode === 'live'
                    ? this.nextSymbolIcon
                    : this.symbolIcon
                ]
              }
              backgroundColor={'#ffffff'}
            />
          </PlayIcon>
        </NextPlayType>
        {this.props.mode === 'live' ? (
          this.renderLivePlaySymbol()
        ) : (
          <MasterWrapperOuter>
            <MasterWrapper
              maxWidth={!!this.props.PrePickStore.multiplier}
              innerRef={ref => (this.MasterWrapper = ref)}
              id="historytracker-masterwrapper"
            >
              <SymbolContainer
                dark={IconsColorDark[this.symbolIcon]}
                color={IconsColor[this.symbolIcon]}
                innerRef={ref => (this.SymbolContainer = ref)}
              >
                <ActiveWrapper
                  color={backgroundColorLight[this.symbolIcon]}
                  innerRef={ref => (this.ActiveWrapper = ref)}
                >
                  {this.renderMultier()}
                  <ShortHandWrapper
                    color={IconsColor[this.symbolIcon]}
                    innerRef={ref => (this.refShortHandLabelWrapper = ref)}
                  >
                    <ShortHandLabel>{this.shortHandText}</ShortHandLabel>
                  </ShortHandWrapper>
                  <PrePickNumberWrapper>
                    {this.props.mode !== 'live' ? (
                      <PrePickNumber color={IconsColor[this.symbolIcon]}>
                        {this.props.PrePickStore.currentPrePick}
                      </PrePickNumber>
                    ) : null}
                  </PrePickNumberWrapper>
                  {this.props.mode === 'live' ? (
                    <LivePlayText color={textColor[this.symbolIcon]}>
                      {this.props.PrePickStore.multiplier > 0
                        ? `+${this.props.PrePickStore.multiplier *
                            (this.props.LiveGameStore.feeCounterValue * 100)}`
                        : this.preText}
                    </LivePlayText>
                  ) : (
                    <PrePickText color={textColor[this.symbolIcon]}>
                      {this.preText}
                    </PrePickText>
                  )}
                </ActiveWrapper>
                <SymbolWrapper innerRef={ref => (this.refSymbolWrapper = ref)}>
                  <SymbolImg
                    innerRef={ref => (this.symbol = ref)}
                    src={Icons[this.symbolIcon]}
                  />
                </SymbolWrapper>
              </SymbolContainer>
            </MasterWrapper>
          </MasterWrapperOuter>
        )}

        {this.answers.reverse().map((r, i) => (
          <RecordWrapper
            key={`answer-${this.answers.length - i}`}
            innerRef={ref => (this[`recordwrapper-${i}`] = ref)}
          >
            {r.livegameAnswers && r.livegameAnswers.length < 1 && !r.isStar ? (
              this.renderNoPoints(r)
            ) : r.type === 'LivePlay' ? (
              this.renderHistoryAnswerLivePlay(r)
            ) : r.type === 'GameMaster' ? (
              this.renderHistoryAnswerGameMaster(r)
            ) : r.type === 'Sponsor' ? (
              this.renderHistoryAnswerSponsor(r)
            ) : r.type === 'Prize' ? (
              this.renderHistoryAnswerPrize(r)
            ) : r.type === 'ExtraPoint' ? (
              this.renderHistoryAnswerExtraPoint(r)
            ) : (
              <ResponseWrapper color={IconsColor[r.type]}>
                <ShortHand color={IconsColor[r.type]}>{r.shortHand}</ShortHand>
                <ResponseText>{r.answer}</ResponseText>
              </ResponseWrapper>
            )}
          </RecordWrapper>
        ))}
      </HistoryContainer>
    )
  }
}

let MultiplierNumber = styled.div`
  position: absolute;
  height: 100%;
  width: ${props => (props.i + 1) * 16 + 20}%;
  z-index: ${props => props.length - props.i};
  background-color: ${props => props.backgroundColor || 'black'};
  border-bottom-right-radius: ${props => responsiveDimension(6)};
  border-top-right-radius: ${props => responsiveDimension(6)};
  color: ${props => props.textColor};
  display: flex;
  justify-content: flex-end;
  padding-right: 7.5%;
  animation: 0.45s ${keyframes`0%{left:-100%}100%{left:-20%;}`} forwards
    cubic-bezier(0.175, 0.885, 0.32, 1.275);
  align-items: center;
  border-right: ${props => responsiveDimension(0.3)} solid
    ${props => props.color || 'white'};
  border-top: ${props => responsiveDimension(0.3)} solid
    ${props => props.color || 'white'};
  border-bottom: ${props => responsiveDimension(0.3)} solid
    ${props => props.color || 'white'};
`

let EmptySymbol = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${responsiveDimension(5)};
  height: ${responsiveDimension(5)};
  border-radius: ${responsiveDimension(5)};
  align-self: center;
  margin-right: 0.4%;
`

let HistoryContainer = styled.ul`
  padding: 0;
  width: 55%;
  font-family: pamainregular;
  z-index: 0;
`

let MasterWrapperOuter = styled.div`
  width: 100%;
  height: ${props => responsiveDimension(6)};
  margin-bottom: ${props => responsiveDimension(1.3)};
`
let MasterWrapper = styled.li`
  width: 100%;
  height: ${props => responsiveDimension(6)};
  overflow: hidden;
  opacity: 1;
  display: flex;
  //--------margin-bottom: ${props => responsiveDimension(1.3)};

  filter: ${props =>
    props.noPoint === 'NO POINTS' ? `grayscale(1)` : `grayscale(0)`};
`

let PrePickNumberWrapper = styled.div`
  margin-left: 7%;
`

let PrePickNumber = styled.div`
  background-color: ${props => props.color};
  width: ${props => responsiveDimension(3)};
  height: ${props => responsiveDimension(3)};
  border-radius: 50%;
  font-family: pamainextrabold;
  font-size: ${props => responsiveDimension(2)};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4%;
`

let PrePickText = styled.div`
  color: ${props => props.color};
  font-size: ${props => responsiveDimension(2.2)};
  text-transform: uppercase;
  margin-right: ${props => responsiveDimension(2.5)};
`

let LivePlayText = styled.div`
  font-family: ${props =>
    props.isAnsweredGameMaster
      ? `pamainlight`
      : props.type === 'LivePlay'
        ? `pamainbold`
        : `pamainregular`};
  font-size: ${props =>
    props.isAnsweredGameMaster
      ? responsiveDimension(3.5)
      : props.type === 'LivePlay'
        ? responsiveDimension(3.5)
        : responsiveDimension(2.1)};
  color: ${props => props.color};
  text-transform: uppercase;
  margin-right: ${props => responsiveDimension(2.5)};
  padding-top: ${props => responsiveDimension(0.25)};
`

let SymbolContainer = styled.div`
  width: 100%;
  background-color: ${props => props.dark};
  border-radius: 0 ${props => responsiveDimension(6)}
    ${props => responsiveDimension(6)} 0;
  border-top: ${props => responsiveDimension(0.3)} solid ${props => props.color};
  border-right: ${props => responsiveDimension(0.3)} solid
    ${props => props.color};
  border-bottom: ${props => responsiveDimension(0.3)} solid
    ${props => props.color};
  display: flex;
  z-index: 3;
  opacity: 1;
  justify-content: space-between;
  align-items: center;
`

let SymbolWrapper = styled.div`
  background-color: white;
  border-radius: 50%;
  height: ${props => responsiveDimension(5.4)};
  width: ${props => responsiveDimension(5.4)};
  display: flex;
  justify-content: center;
  align-items: center;
`

let SymbolImg = styled.img`
  height: 90%;
  ${props => (props.isEmpty ? 'width:90%;' : '')};
`

let ActiveWrapper = styled.div`
  position: relative;
  display: flex;
  width: ${props => (props.isAnsweredGameMaster ? 60 : IsMobile ? 81 : 84)}%;
  height: ${props => responsiveDimension(6)};
  overflow: hidden;
  opacity: 1;
  z-index: 5;
  border-radius: 0 ${props => responsiveDimension(6)}
    ${props => responsiveDimension(6)} 0;
  background-color: ${props => props.color || '#ffffff'};
  justify-content: space-between;
  align-items: center;
`
let ShortHandWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 0;
  height: ${props => responsiveDimension(6)};
  border-radius: 0 ${props => responsiveDimension(6)}
    ${props => responsiveDimension(6)} 0;
  background: ${props => props.color};
`
let ShortHandLabel = styled.span`
  display: flex;
  margin-right: ${props => responsiveDimension(2.5)};
  color: #ffffff;
  font-size: ${props => responsiveDimension(2.2)};
  text-transform: uppercase;
`
let RecordWrapper = styled.li`
  height: ${props => responsiveDimension(5.5)};
  margin-bottom: ${props => responsiveDimension(0.3)};
  opacity: ${props => responsiveDimension(0.7)};
  display: flex;
  text-align: right;
`

let ShortHand = styled.div`
  font-size: ${props =>
    props.isEmpty ? responsiveDimension(3) : responsiveDimension(1.9)};
  background-color: ${props => props.color};
  ${props =>
    props.isEmpty
      ? `margin-right:0.8vh;text-transform:uppercase; width: 75%;`
      : `width: 65%;`} height: 100%;
  border-radius: 0 ${props => responsiveDimension(6)}
    ${props => responsiveDimension(6)} 0;
  color: white;
  display: flex;
  align-items: center;
  padding-top: ${props => responsiveDimension(0.25)};
  ${props =>
    props.isEmpty
      ? `justify-content:center;`
      : props.isGameMaster
        ? `justify-content: space-between; padding-right:${responsiveDimension(
            0.2
          )};`
        : `justify-content:flex-end; padding-right:${responsiveDimension(2)};`};
`

let GameMasterShortHand = styled.div`
  font-family: pamainlight;
  font-size: ${props => responsiveDimension(1.9)};
  background-color: ${props => props.color};
  text-transform: uppercase;
  width: 75%;
  height: 100%;
  border-top-right-radius: ${props => responsiveDimension(5)};
  border-bottom-right-radius: ${props => responsiveDimension(5)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  flex-direction: row;
`
let GameMasterShortHandText = styled.div`
  font-family: pamainlight;
  font-size: ${props => responsiveDimension(3)};
  color: #ffffff;
  align-items: center;
  display: flex;
  text-transform: uppercase;
  margin-right: ${props => responsiveDimension(1.5)};
  padding-top: ${props => responsiveDimension(0.2)};
`
let GameMasterSymbol = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => responsiveDimension(4.6)};
  height: ${props => responsiveDimension(4.6)};
  border-radius: ${props => responsiveDimension(4.6)};
  margin-right: ${props => responsiveDimension(0.5)};
`
let GameMasterResponseText = styled.div`
  font-family: pamainregular;
  font-size: ${props => responsiveDimension(3)};
  color: ${props => props.color};
  align-items: center;
  width: 40%;
  justify-content: flex-end;
  display: flex;
  text-transform: uppercase;
  padding-right: ${props => responsiveDimension(2)};
  padding-top: ${props => responsiveDimension(0.2)};
`

let ResponseWrapper = styled.div`
  height: 100%;
  background-color: ${props =>
    props.isEmpty
      ? '#c1c1c1; filter: grayscale(100%);'
      : props.backgroundColor || '#ffffff'};
  color: ${props => props.color};
  width: ${props => (props.isEmpty ? 55 : 80)}%;
  border-radius: 0 ${props => responsiveDimension(6)}
    ${props => responsiveDimension(6)} 0;
  display: flex;
  justify-content: space-between;
  opacity: 0.6;
  ${props =>
    props.isEmpty
      ? `border-top: ${responsiveDimension(0.2)} solid #888888;
            border-right: ${responsiveDimension(0.2)} solid #888888;
            border-bottom: ${responsiveDimension(0.2)} solid #888888;`
      : props.gms
        ? `border-top: ${responsiveDimension(0.2)} solid ${props.color};
          border-right: ${responsiveDimension(0.2)} solid ${props.color};
          border-bottom: ${responsiveDimension(0.2)} solid ${props.color};`
        : ''};
`

let ResponseText = styled.div`
  font-size: ${props => responsiveDimension(1.9)};
  align-items: center;
  width: 40%;
  justify-content: flex-end;
  display: flex;
  text-transform: uppercase;
  padding-right: ${props => responsiveDimension(2)};
`

let LivePlayResponseWrapper = styled.div`
  height: 100%;
  background-color: ${props =>
    props.isEmpty
      ? '#c1c1c1;filter: grayscale(100%)'
      : hex2rgb(props.backgroundColor, 0.8) || '#ffffff'};
  display: flex;
  color: ${props => props.color};
  width: ${props => (props.isEmpty ? 55 : 80)}%;
  border-radius: 0 ${props => responsiveDimension(6)}
    ${props => responsiveDimension(6)} 0;
  position: relative;
  justify-content: space-between;
  opacity: 0.8;
`
let LivePlayTierWrapper = styled.div``
let LivePlayResponseText = styled.div`
  font-family: pamainlight;
  font-size: ${props => responsiveDimension(3)};
  color: #ffffff;
  align-items: center;
  //width: 40%;
  justify-content: flex-end;
  display: flex;
  text-transform: uppercase;
  padding-right: ${props => responsiveDimension(2)};
  padding-top: ${props => responsiveDimension(0.2)};
`

const NextPlayType = styled.li`
  transform: scale(1);
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  //width: ${props => (props.maxWidth ? '25' : '0')}%;
  width: 25%;
  height: ${props => responsiveDimension(4.6)};
  border-radius: 0 ${props => responsiveDimension(4.6)} ${props =>
  responsiveDimension(4.6)} 0;
  background-color: ${props => props.dark};
  border-top: ${props => responsiveDimension(0.3)} solid ${props =>
  props.color};
  border-right: ${props => responsiveDimension(0.3)} solid ${props =>
  props.color};
  border-bottom: ${props => responsiveDimension(0.3)} solid ${props =>
  props.color};
  padding-right: ${props => responsiveDimension(0.1)};
  //----overflow: hidden;
  animation: ${props => bgbar} infinite 1s linear alternate,
    ${props => borderbar} infinite 0.5s ease alternate,
    ${props => barin} forwards 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

const PlayImage = styled.img`
  animation: ${props => symbolpulse} infinite 0.5s ease alternate;
  position: absolute;
  animation-play-state: running;
  width: inherit;
  height: inherit;
  transform-origin: center;
  transform: scale(1);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  margin-left: ${props => responsiveDimension(0.02)};
  padding: ${props => responsiveDimension(0.4)};
`
const PlayImageNEWNEW = styled.div`
  animation: ${props => symbolpulse} infinite 0.5s ease alternate;
  width: inherit;
  height: inherit;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: center;
`
const PlayImageNEW = styled.div`
  animation: ${props => symbolpulse} infinite 0.5s ease alternate;
  width: inherit;
  height: inherit;

  -o-mask-image: url(${props => props.src});
  -o-mask-size: ${props =>
    `${responsiveDimension(3.5)}, ${responsiveDimension(3.5)}`};
  -o-mask-repeat: no-repeat;

  -moz-mask-image: url(${props => props.src});
  -moz-mask-size: ${props =>
    `${responsiveDimension(3.5)}, ${responsiveDimension(3.5)}`};
  -moz-mask-repeat: no-repeat;

  -webkit-mask-image: url(${props => props.src});
  -webkit-mask-size: ${props =>
    `${responsiveDimension(3.5)}, ${responsiveDimension(3.5)}`};
  -webkit-mask-repeat: no-repeat;

  mask-image: url(${props => props.src});
  mask-size: ${props =>
    `${responsiveDimension(3.5)}, ${responsiveDimension(3.5)}`};
  mask-repeat: no-repeat;

  background-color: ${props => props.backgroundColor};
  margin-top: ${props => responsiveDimension(0.1)};
  margin-left: ${props => responsiveDimension(0.23)};
`

const PlayIcon = styled.div`
  //----position: absolute;
  width: ${props => responsiveDimension(3.8)};
  height: ${props => responsiveDimension(3.8)};
  overflow: hidden;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor};
`

const StarHistoryLivePlayWrapper = styled.div`
  height: 100%;
  background-color: ${props => (props.starEarned ? '#eede16' : '#3b3b3b')};
  display: flex;
  width: 80%;
  border-radius: 0 ${props => responsiveDimension(5.5)}
    ${props => responsiveDimension(5.5)} 0;
  position: relative;
  flex-direction: row;
  align-items: center;
`

const StarInnerPanel = styled.div`
  width: 85%;
  height: ${props => responsiveDimension(5.5)};
  border-top-right-radius: ${props => responsiveDimension(5.5)};
  border-bottom-right-radius: ${props => responsiveDimension(5.5)};
  background-color: white;

  display: flex;
  flex-direction: row;
`

const StarInnerPanelLeft = styled.div`
  width: 60%;
  height: ${props => responsiveDimension(5.5)};
  border-top-right-radius: ${props => responsiveDimension(5.5)};
  border-bottom-right-radius: ${props => responsiveDimension(5.5)};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  //background: #177fa2;
  background: ${props => props.backgroundColor};
`

const StarPanelLeftShorthand = styled.div`
  font-family: pamainlight;
  font-size: ${props => responsiveDimension(1.9)};
  text-transform: uppercase;
  color: #ffffff;
  padding-top: ${props => responsiveDimension(0.25)};
`

const StarPanelCircle = styled.div`
  width: ${props => responsiveDimension(5.5)};
  height: ${props => responsiveDimension(5.5)};
  border-radius: ${props => responsiveDimension(5.5)};
  border: ${props => responsiveDimension(0.4)} solid ${props => props.color};
  background-color: white;
  font-family: pamainextrabold;
  font-size: ${props => responsiveDimension(2)};
  color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${props => responsiveDimension(0.2)};

  &:after {
    content: '';
    width: ${props => responsiveDimension(5)};
    height: ${props => responsiveDimension(5)};
    display: inline-block;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: 85%;
    background-position: center;
  }
`

const StarInnerPanelRight = styled.div`
  width: 40%;
  height: 100%;
  font-family: pamainbold;
  font-size: ${props => responsiveDimension(2)};
  color: ${props => props.color};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${props => responsiveDimension(0.25)};
`

const Star = styled.span`
  width: ${props => responsiveDimension(4)};
  height: ${props => responsiveDimension(4)};
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    display: inline-block;
    width: ${props => responsiveDimension(4)};
    height: ${props => responsiveDimension(4)};
    background-color: #1f1d1e;
    -webkit-mask-image: url(${props => props.src});
    -webkit-mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-image: url(${props => props.src});
    mask-size: 70%
    mask-repeat: no-repeat;
    mask-position: center;
  }
`

const symbolpulse = keyframes`
  0% {transform:scale(1);}
  100% {transform:scale(0.7);}
`
const bgbar = keyframes`
  0% {}
  100% {background-color: #000000;}
`
const borderbar = keyframes`
  0% {}
  100% {border-color:#000000;}
`
const barin = keyframes`
  0% {}
  100% {left:0;}
`

export default GSAP()(HistoryTracker)
