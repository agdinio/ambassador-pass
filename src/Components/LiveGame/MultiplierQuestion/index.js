import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { extendObservable, intercept, observe } from 'mobx'
import { PaCircle } from '@/Components/IntroScreen'
import AbSlider from '@/Components/Slider/ABSlider'
import Multi from '@/Components/Slider/MultiSelectSlider'
import FeeCounter from '@/Components/FeeCounter'
import styled, { keyframes } from 'styled-components'
import token from '@/assets/images/playalong-token.svg'
import { vhToPx, hex2rgb, toFootage, responsiveDimension } from '@/utils'

@inject('PrePickStore', 'LiveGameStore')
@observer
export default class MultiplierQuestion extends Component {
  constructor(props) {
    debugger
    super(props)
    extendObservable(this, {
      //timer: this.props.timer,
      timer: this.props.LiveGameStore.runningLength,
      fadeInFeeCounter: false,
      isTimerExpired: false,
      isInsertedWhenTimeIsUp: false,
      check: null,
    })

    this.interceptedRunningLength = false
    this.advanceLockout = false
    this.observeCount = 0

    observe(this.props.LiveGameStore, 'inProgress', change => {
      debugger
      if (this.observeCount === 0) {
        this.observeCount++
        this.MonitorPlayInProgress(change.newValue)
      }

      // if (this.advanceLockout) {
      //
      //   this.props.isTimeUp(true, {
      //     isTimerExpired: true,
      //     hideTimeout: this.props.question.hideTimeout || false,
      //   })
      //
      // } else {
      //   this.MonitorPlayInProgress(change.newValue)
      // }

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
    this.handleAutoSelectFee()
    this.countdown()

    setTimeout(() => {
      this.fadeInFeeCounter = true
    }, 2000)
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

  countdownx() {
    /*
    if (this.props.videoFootage) {
      let m = 0
      let s = 0
      let footageSplit = this.props.videoFootage.split(':')
      if (footageSplit && footageSplit.length === 2) {
        m = parseInt(footageSplit[0]) * 60
        s = parseInt(footageSplit[1])
      }
      this.timer = m + s + 1

      this.check = setInterval(() => {
        this.innerFootage = toFootage(this.timer++)
        if (this.innerFootage === this.props.footage) {
          clearInterval(this.check)
          this.props.LiveGameStore.inProgress = true
        }
      }, 1000)
    }
*/
    /*
    let videoFootage = this.props.LiveGameStore.videoFootage || '0:0'
    if (videoFootage) {
      let m = 0
      let s = 0
      let footageSplit = this.props.LiveGameStore.videoFootage.split(':')
      if (footageSplit && footageSplit.length === 2) {
        m = parseInt(footageSplit[0]) * 60
        s = parseInt(footageSplit[1])
      }
      this.timer = (m + s + 1)

      this.check = setInterval(() => {
        debugger
        this.footage = Footage(this.timer++)
        if (this.footage === this.props.question.footage) {
          clearInterval(this.check)
          this.props.LiveGameStore.inProgress = true
        }
      }, 1000)
    }
*/
    /*
    if (this.timer) {
      this.check = setInterval(() => {
        debugger
        this.timer = this.timer - 1

        if (!this.timer) {
          //PERM
          //this.isTimerExpired = true
          //clearInterval(this.check)
          //this.timeIsUp()

          //TEMP -  if you changed the inProgress value to true, it will trigger MonitorPlayInProgress() function
          clearInterval(this.check)
          this.props.LiveGameStore.inProgress = true
        }
      }, 1000)
    }
*/
  }

  MonitorPlayInProgress(livegameInProgress) {
    debugger
    if (
      'MultiplierQuestion' ===
      this.props.LiveGameStore.currentScriptItem.componentName
    ) {
      if (livegameInProgress) {
        this.isInsertedWhenTimeIsUp = false
        setTimeout(() => {
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
        this.props.isTimeUp(true, {
          isTimerExpired: this.isTimerExpired,
          hideTimeout: this.props.question.hideTimeout || false,
          hidePlayInProgress: this.props.question.hidePlayInProgress || false,
        })
      }
    }
  }

  handleInterceptAnswer(response) {
    debugger
    if (response) {
      this.interceptedRunningLength = true
      clearInterval(this.check)
    }
  }

  answered(answer) {
    clearInterval(this.check)
    this.props.splash()
    setTimeout(() => {
      debugger
      this.props.LiveGameStore.setRunningLength(this.timer)
      answer.hideTimeout = this.props.question.hideTimeout
      answer.hidePlayInProgress =
        this.props.question.hidePlayInProgress || false
      this.props.answered(answer)

      // if (this.props.LiveGameStore.runningLength <= 3 && this.props.PrePickStore.multiplier > 1) {
      //
      //   this.advanceLockout = true
      //   this.props.LiveGameStore.setInProgress(true)
      //
      // } else {
      //
      //   answer.hideTimeout = this.props.question.hideTimeout
      //   this.props.answered(answer)
      //
      // }
    }, 100)
  }

  handleAutoSelectFee() {
    if (!this.props.LiveGameStore.isFeeCounterSpinned) {
      this.props.LiveGameStore.setIsFeeCounterSpinned(true)
      setTimeout(() => {
        this.props.LiveGameStore.setFeeCounterValue(2)
      }, 1000)
    }
  }

  render() {
    const { question } = this.props
    const Slider = question.choiceType === 'MULTI' ? Multi : AbSlider
    return (
      <Container color={question.backgroundColor}>
        <FadeIn>
          <QuestionContainer>
            <QuestionTitle>{question.playTitle}</QuestionTitle>
            <HiddenTimer>
              ID:
              {question.id}
              &nbsp;&nbsp;&nbsp;
              {this.props.LiveGameStore.runningLength}
            </HiddenTimer>
          </QuestionContainer>
          <div style={{ width: '100%' }}>
            <Slider
              currentPrePick={1}
              teams={this.props.teams}
              question={this.props.question}
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
          {this.props.PrePickStore.multiplier > 0 ? (
            <LowerSection center>
              <MultiSection>
                {this.props.PrePickStore.multiplier === 1 ? (
                  <Coin src={token} />
                ) : null}
                <MultiNum
                  white={!!(this.props.PrePickStore.multiplier > 1)}
                  border={
                    this.props.PrePickStore.multiplier > 1
                      ? { color: '#ffffff', opacity: 0.5 }
                      : { color: '#ff0000', opacity: 0.1 }
                  }
                  bgOpacity={this.props.PrePickStore.multiplier > 1 ? 1 : 0.5}
                >
                  {this.props.PrePickStore.multiplier > 1
                    ? `${this.props.PrePickStore.multiplier}x`
                    : this.props.LiveGameStore.feeCounterValue}
                </MultiNum>
                <MultiText
                  paddingLeft={this.props.PrePickStore.multiplier > 1 ? 11 : 9}
                >
                  <Text font={'pamainextrabold'} size={3.4}>
                    {this.props.LiveGameStore.feeCounterValue * 100}
                  </Text>
                  <Text font={'pamainregular'} size={3.4}>
                    <Blue>PTS</Blue>
                  </Text>
                  <Text font={'pamainlight'} size={3.4}>
                    {' '}
                    this Play
                  </Text>
                </MultiText>
              </MultiSection>
            </LowerSection>
          ) : (
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
          )}
        </FadeIn>
      </Container>
    )
  }
}

const MultiText = styled.div`
  text-transform: uppercase;
  padding-left: ${props => responsiveDimension(props.paddingLeft)};
  width: 100%;
`

const Text = styled.span`
  font-family: ${props => props.font};
  font-size: ${props => responsiveDimension(props.size)};
`

const Blue = styled.span`
  color: #18c5ff;
`

const Coin = styled.img`
  width: ${props => responsiveDimension(2)};
  left: 0;
  height: ${props => responsiveDimension(2)};
  z-index: 2;
`
const MultiNum = styled.div`
  width: ${props => responsiveDimension(10)};
  height: ${props => responsiveDimension(10)};
  border-radius: ${props => responsiveDimension(10)};
  color: ${props => (props.white ? 'white' : 'gold')};
  background-color: rgba(0, 0, 0, ${props => props.bgOpacity});
  font-family: pamainextrabold;
  font-size: ${props => responsiveDimension(5)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  border: ${props => responsiveDimension(0.8)} solid
    ${props => hex2rgb(props.border.color, props.border.opacity)};
`

const LowerSection = styled.div`
  flex-direction: row;
  justify-content: ${props => (props.center ? 'center' : 'space-between')};
  width: 100%;
  display: flex;
  align-items: center;
`

const MultiSection = styled.div`
  width: 60%;
  height: ${props => responsiveDimension(10)};
  border-radius: ${props => responsiveDimension(10)};
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
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
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
  background-color: ${props =>
    props.color ? hex2rgb(props.color, 0.8) : 'rgb(162, 23, 23)'};
  border-top: ${props => responsiveDimension(0.5)} solid
    rgba(255, 255, 255, 0.2);
`

const QuestionContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: inherit;
`
const QuestionTitle = styled.span`
  font-family: pamainregular;
  font-size: ${props => responsiveDimension(4.3)};
  text-transform: uppercase;
`
/*
const FadeIn = styled.div`
  padding: 5% 4.5% 5% 4.5%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: inherit;
  height: inherit;
  justify-content: ${props => (props.center ? 'center' : 'space-between')};
  animation: ${props => screenFadeIn} .5s;
`
const screenFadeIn = keyframes`
  from{opacity: 0;}
  to{opacity: 1;}
`
*/

const FadeIn = styled.div`
  ${props =>
    props.fadeOut
      ? `animation: 0.4s ${fadeOutBottom} forwards;`
      : `animation: 0.4s ${fadeInTop} forwards;
      animation-delay: ${props.delay ? 0.4 : 0}s;
      `} padding: 5% 4.5% 5% 4.5%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: inherit;
  height: inherit;
  justify-content: ${props => (props.center ? 'center' : 'space-between')};
`

const fadeInTop = keyframes`
  0% {opacity:0;position: relative; top: ${responsiveDimension(-45)};}
  100% {opacity:1;position: relative; top: 0; height:inherit;}
`

const fadeOutBottom = keyframes`
  0% {opacity:1; }
  99% {opacity: 0; height: inherit;}
  100% {opacity:0;height: 0px;}
`

const HiddenTimer = styled.div`
  position: absolute;
  left: 5%;
  bottom: 5%;
  display: none;
`
