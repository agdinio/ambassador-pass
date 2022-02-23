import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { extendObservable, intercept } from 'mobx'
import { PACircle } from '@/Components/PACircle'
import AbSlider from '@/Components/Slider/ABSlider'
import Multi from '@/Components/Slider/MultiSelectSlider'
import FeeCounter from '@/Components/FeeCounter'
import styled, { keyframes } from 'styled-components'
import { TweenMax, TimelineMax } from 'gsap'
import gm_white from '@/assets/images/symbol-gm_white.svg'
import gm from '@/assets/images/symbol-gm.svg'
import {
  vhToPx,
  hex2rgb,
  evalImage,
  toFootage,
  responsiveDimension,
} from '@/utils'
import GameMasterIntro from './GameMasterIntro'
import TextCard from '@/Components/LiveGame/Common/TextCard'

@inject('ProfileStore', 'UserStore', 'PrePickStore', 'LiveGameStore')
@observer
export default class GameMasterQuestion extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      //timer: this.props.timer,
      timer: this.props.LiveGameStore.runningLength,
      fadeInFeeCounter: false,
      isTimerExpired: false,
      isInsertedWhenTimeIsUp: false,
      check: undefined,
      footage: null,
      showTextCard: false,
    })

    this.interceptedRunningLength = false
    this.observeCount = 0

    intercept(this.props.LiveGameStore, 'inProgress', change => {
      if (this.observeCount === 0) {
        this.observeCount++
        this.MonitorPlayInProgress(change.newValue)
      }
      return change
    })

    intercept(this.props.LiveGameStore, 'isPlaying', change => {
      if (change.newValue) {
        if (!this.interceptedRunningLength) {
          this.interceptedRunningLength = true
          clearInterval(this.check)
          this.props.LiveGameStore.setInProgress(true)
          this.props.LiveGameStore.setRunningLength(0)
        }
      }
      return change
    })
  }

  handleFeeCounterValue(response) {
    this.props.LiveGameStore.setFeeCounterValue(response)
  }

  componentDidMount() {
    this.countdown()
    TweenMax.to(this.IntroWrapper, 0.5, {
      opacity: 0,
      delay: 2,
      onStart: () => {
        TweenMax.to(this.QuestionWrapper, 0.5, {
          opacity: 1,
        })
      },
      onComplete: () => {
        setTimeout(() => {
          this.fadeInFeeCounter = true
        }, 2000)
      },
    })
  }

  countdown() {
    if (!this.timer) {
      return
    }

    this.check = setInterval(() => {
      --this.timer
      if (!this.timer) {
        clearInterval(this.check)
      }
    }, 1000)
  }

  MonitorPlayInProgress(livegameInProgress) {
    debugger
    if (
      'GameMasterQuestion' ===
      this.props.LiveGameStore.currentScriptItem.componentName
    ) {
      if (livegameInProgress) {
        clearInterval(this.check)
        this.isInsertedWhenTimeIsUp = false
        setTimeout(() => {
          this.isTimerExpired = true
          this.timeIsUp()
        }, 0)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.check)
  }

  insertAnswerWhenTimeIsUp() {
    debugger
    if (!this.isInsertedWhenTimeIsUp) {
      this.isInsertedWhenTimeIsUp = true
      let { question, LiveGameStore } = this.props
      let ans = {
        type: question.type,
        id:
          this.props.PrePickStore.multiplier < 1
            ? question.id
            : LiveGameStore.currentMainQuestion.id > 0
              ? LiveGameStore.currentMainQuestion.id
              : question.id,
        sequence: question.sequence,
        answer: '',
        stars: question.stars,
        isStar: question.stars > 0 ? true : false,
        shortHand: question.shortHand,
      }

      this.props.PrePickStore.pushAnswerOnLivePlay(ans)
    }
  }

  timeIsUp() {
    debugger
    if (!this.isInsertedWhenTimeIsUp) {
      this.insertAnswerWhenTimeIsUp()
      if (this.props.LiveGameStore.currentPageId === this.props.question.id) {
        let lockoutText = {
          header: 'time is up',
          detail: 'next play begins',
        }
        this.props.isTimeUp(true, {
          isTimerExpired: this.isTimerExpired,
          //nextPlay: true,
          lockoutText,
          hideTimeout: this.props.question.hideTimeout || false,
          hidePlayInProgress: this.props.question.hidePlayInProgress || false,
        })
      }
    }
  }

  handleInterceptAnswer(response) {
    if (response) {
      this.interceptedRunningLength = true
      clearInterval(this.check)
    }
  }

  answered(answer) {
    clearInterval(this.check)
    this.props.splash()
    setTimeout(() => {
      this.props.LiveGameStore.setRunningLength(0)
      answer.hideTimeout = this.props.question.hideTimeout
      answer.hidePlayInProgress =
        this.props.question.hidePlayInProgress || false
      this.props.answered(answer)
    }, 100)
  }

  render() {
    const { question, sponsorLogo, msg } = this.props
    const Slider = question.choiceType === 'MULTI' ? Multi : AbSlider

    return (
      <Container>
        <MasterContainer
          color={question.backgroundColor}
          innerRef={ref => (this.MasterContainer = ref)}
        >
          <IntroWrapper innerRef={ref => (this.IntroWrapper = ref)}>
            <GameMasterIntro sponsorLogo={sponsorLogo} />
          </IntroWrapper>

          <QuestionWrapper innerRef={ref => (this.QuestionWrapper = ref)}>
            <FadeIn>
              <QuestionContainer>
                <HiddenTimer>
                  ID:
                  {question.id}
                  &nbsp;&nbsp;&nbsp;
                  {this.props.LiveGameStore.runningLength}
                </HiddenTimer>
                <QuestionSponsorWrapper>
                  {sponsorLogo && sponsorLogo.image ? (
                    <Sponsor
                      src={evalImage(sponsorLogo.image)}
                      height={2}
                      marginRight={1}
                    />
                  ) : null}
                  <QuestionText maxWidth={50}>
                    {question.playTitle}
                  </QuestionText>
                </QuestionSponsorWrapper>
                <PACircleWrapper>
                  <PACircle value={true}>{this.timer}s</PACircle>
                </PACircleWrapper>
              </QuestionContainer>
              <div style={{ width: 'inherit' }}>
                <Slider
                  currentPrePick={1}
                  teams={this.props.teams}
                  question={question}
                  answered={this.answered.bind(this)}
                  handlePicksPointsTokenNotification={() => {}}
                  handleUpdateBackground={() => {}}
                  groupComponent="LIVEGAME"
                  feeCounterValue={this.props.LiveGameStore.feeCounterValue}
                  handleLiveGameInterceptAnswer={this.handleInterceptAnswer.bind(
                    this
                  )}
                />
              </div>
              <LowerSection>
                <LowerLeft>
                  <PlaceYour>Place your</PlaceYour>
                  <TokenFee>Token Fee</TokenFee>
                  <Minimum>Minimum 1-10</Minimum>
                </LowerLeft>
                <LowerRight>
                  <FeeCounter
                    min={1}
                    max={10}
                    currentValue={this.props.LiveGameStore.feeCounterValue}
                    maxSlidingDistance={100}
                    maxAnimationSpeed={0.3}
                    fadeIn={this.fadeInFeeCounter}
                    handleSetFeeCounterValue={this.handleFeeCounterValue.bind(
                      this
                    )}
                  />
                </LowerRight>
              </LowerSection>
            </FadeIn>
          </QuestionWrapper>
        </MasterContainer>
      </Container>
    )
  }
}

const LowerSection = styled.div`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  display: flex;
  align-items: center;
`

const LowerLeft = styled.div`
  flex-direction: column;
  display: flex;
  color: white;
  font-family: pamainregular;
  width: 50%;
  line-height: 1;
`

const PlaceYour = styled.span`
  text-transform: uppercase;
  letter-spacing: ${props => responsiveDimension(0.8)};
  font-size: ${props => responsiveDimension(3.1)};
`
const TokenFee = styled.span`
  text-transform: uppercase;
  font-size: ${props => responsiveDimension(5.6)};
`

const Minimum = styled.span`
  text-transform: lowercase;
  font-size: ${props => responsiveDimension(3.1)};
  letter-spacing: ${props => responsiveDimension(0.5)};
`

const LowerRight = styled.div`
  width: 50%;
`

const Container = styled.div`
  width: inherit;
  height: inherit;
`

const MasterContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
  background-color: ${props =>
    props.color ? hex2rgb(props.color, 0.8) : hex2rgb('#c61818', 0.8)};
  border-top: ${props => responsiveDimension(0.5)} solid
    rgba(255, 255, 255, 0.2);

  position: absolute;
`

const IntroWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

const QuestionWrapper = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
`

const QuestionContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: inherit;
`
const QuestionSponsorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const QuestionText = styled.span`
  font-family: pamainregular;
  font-size: ${props => responsiveDimension(4)};
  text-transform: uppercase;
  color: #ffffff;
  width: auto;
  //max-width: ${props => props.maxWidth || 'auto'}%;
  line-height: 1;
`
const PACircleWrapper = styled.div``

const FadeIn = styled.div`
  padding: 5% 4.5% 5% 4.5%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: inherit;
  height: inherit;
  justify-content: ${props => (props.center ? 'center' : 'space-between')};
`

const Sponsor = styled.img`
  height: ${props => responsiveDimension(props.height || 5)};
  margin-right: ${props => responsiveDimension(props.marginRight || 0)};
`

const fadeInTop = keyframes`
  0% {opacity:0;position: relative; top: -500px;}
  100% {opacity:1;position: relative; top: 0px; height:inherit;}
`

const fadeOutBottom = keyframes`
  0% {opacity:1; }
  99% {opacity: 0; height: inherit;}
  100% {opacity:0;height: 0px;}
`

const TCContainer = styled.div`
  width: inherit;
  height: inherit;
`

const HiddenTimer = styled.div`
  position: absolute;
  left: 5%;
  bottom: 5%;
  display: none;
`
