import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { extendObservable } from 'mobx'
import styled, { keyframes } from 'styled-components'
import bgDefault from '@/assets/images/playalong-default.jpg'
import ABSlider from '@/Components/Slider/ABSlider'
import MultiSelectSlider from '@/Components/Slider/MultiSelectSlider'
import PicksPointsTokens from '@/Components/PrePick/PicksPointsTokens'
import QuestionChoicesPanel from '@/Components/PrePick/QuestionChoicesPanel'
import PrePickMsg from '@/Components/PrePick/PrePickMsg'
import CountdownClock from '@/Components/CountdownClock/CountdownClock'
import HistoryTracker from '@/Components/HistoryTracker/HistoryTracker'
import { TweenMax, TimelineMax, Quad, Ease } from 'gsap'
import BezierEasing from '@/bezier-easing'
import * as util from '@/utils'
import { vhToPx, responsiveDimension } from '@/utils'

@inject('PrePickStore', 'NavigationStore', 'ProfileStore')
@withRouter
@observer
export default class PrePick extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      notifyPicksPointsTokens: false,
      lastRow: null,
    })

    this.props.PrePickStore.pullData()
    //this.props.ProfileStore.getProfile()
  }

  handleUpdateBackground(response) {
    debugger
    switch (response) {
      case 0:
        break
      case 1:
        TweenMax.to(this.refBGContainer, 0, { filter: 'grayscale(0)' })
        break
      case 2:
        new TimelineMax({ repeat: 0 })
          .to(this.refFlashContainer, 0.2, {
            zIndex: 100,
            opacity: 0.8,
            ease: Quad.easeIn,
          })
          .to(this.refFlashContainer, 0.2, {
            delay: 0.1,
            zIndex: 100,
            opacity: 0,
            ease: Quad.easeOut,
          })
          .set(this.refFlashContainer, {
            zIndex: -100,
          })
        TweenMax.to(this.refPrePickMsg, 0, { opacity: 0 })
        break
      default:
    }
  }

  handlePicksPointsTokenNotification(evt) {
    this.lastRow = null
    this.notifyPicksPointsTokens = evt.isNotify
  }

  toggleReadyForSelection() {
    debugger
    TweenMax.fromTo(
      this.refReadyContainer,
      0.5,
      { zIndex: 100 },
      { zIndex: -100 }
    )
  }

  picksPointsTokensCallback(evt) {
    if (evt) {
      if (
        this.props.PrePickStore.totalPrePicks >
        this.props.PrePickStore.currentPrePick
      ) {
        setTimeout(() => {
          this.notifyPicksPointsTokens = false
          this.props.PrePickStore.incrementCurrentPrePick(1)
          this.props.PrePickStore.captureAnalyticPrePickStart()

          new TimelineMax({ repeat: 0 })
            .to(this.refBGContainer, 0, { filter: 'grayscale(1)' })
            .fromTo(
              this.refBGContainer,
              0.5,
              { opacity: 0 },
              {
                opacity: 1,
                ease: new Ease(BezierEasing(0.77, 0, 0.175, 1)),
                //onComplete: this.toggleReadyForSelection.bind(this),
              }
            )
          TweenMax.fromTo(
            this.refQuestionPanelWrapper,
            0.3,
            { opacity: 1, y: '-100%' },
            {
              opacity: 1,
              y: '0%',
              ease: new Ease(BezierEasing(0.77, 0, 0.175, 1)),
            }
          )
          TweenMax.fromTo(
            this.refSliderWrapper,
            0.3,
            { opacity: 0, y: '-100%' },
            {
              opacity: 1,
              y: '0%',
              ease: new Ease(BezierEasing(0.77, 0, 0.175, 1)),
            }
          )
          TweenMax.fromTo(
            this.refPrePickMsg,
            0.3,
            { opacity: 0, y: '-100%' },
            {
              opacity: 1,
              y: '0%',
              ease: new Ease(BezierEasing(0.77, 0, 0.175, 1)),
            }
          )
        }, 300)
      } else {
        //this.props.PrePickStore.setPrePickPlaythrough(1)

        this.props.NavigationStore.setPlayThroughOnActiveMenu('/prepick')

        setTimeout(() => {
          this.props.NavigationStore.setCurrentView('/starprize')
        }, 1000)
      }
    }
  }

  answered(answer) {
    this.props.PrePickStore.captureAnalyticPrePickAnswered(
      JSON.stringify(answer)
    )
  }

  componentDidMount() {
    this.props.PrePickStore.captureAnalyticPrePickStart()
  }

  render() {
    let {
      totalPrePicks,
      currentPrePick,
      teams,
      questions,
      messages,
      isLoading,
    } = this.props.PrePickStore
    if (!isLoading) {
      let question = questions.filter(
        o => o.prepickSequence === currentPrePick
      )[0]
      question.labels.sort((a, b) => a.prepickSequence > b.prepickSequence)

      let message = messages.filter(
        o => o.prepickSequence === currentPrePick
      )[0]
      message.headers.sort((a, b) => a.sequence > b.sequence)
      message.details.sort((a, b) => a.sequence > b.sequence)

      let background = ''
      try {
        background = require('@/assets/images/' + question.background)
      } catch (e) {
        background = ''
      }

      let SliderTag =
        question.choiceType === 'AB' ? ABSlider : MultiSelectSlider

      return (
        <Container bg={bgDefault} key={currentPrePick}>
          <BackgroundContainer
            innerRef={c => (this.refBGContainer = c)}
            bg={background}
          />

          <HistoryContainer>
            <HistoryTracker preText="Pre Pick" symbol="PrePick" />
          </HistoryContainer>

          <ContentContainer>
            <UpperPanel>
              {/*<LogoWrapper>*/}
              {/*<SportocoLogoWrapper>*/}
              {/*<SportocoLogo src={sportocoLogo} />*/}
              {/*</SportocoLogoWrapper>*/}
              {/*<PlayAlongLogoWrapper>*/}
              {/*<PlayAlongLogo src={playalongLogo} />*/}
              {/*</PlayAlongLogoWrapper>*/}
              {/*</LogoWrapper>*/}
              <CountdownClockWrapper>
                <CountdownClock />
              </CountdownClockWrapper>
              <QuestionPanelWrapper
                innerRef={c => (this.refQuestionPanelWrapper = c)}
              >
                <QuestionChoicesPanel
                  currentPrePick={currentPrePick}
                  question={question}
                />
              </QuestionPanelWrapper>

              <SliderWrapper innerRef={c => (this.refSliderWrapper = c)}>
                <SliderTag
                  key={`slider-${currentPrePick}`}
                  currentPrePick={currentPrePick}
                  teams={teams}
                  question={question}
                  handlePicksPointsTokenNotification={this.handlePicksPointsTokenNotification.bind(
                    this
                  )}
                  handleUpdateBackground={this.handleUpdateBackground.bind(
                    this
                  )}
                  groupComponent="PREPICK"
                  answered={this.answered.bind(this)}
                />
              </SliderWrapper>
            </UpperPanel>
            <LowerPanel>
              <MessageWrapper innerRef={c => (this.refPrePickMsg = c)}>
                <PrePickMsg
                  reference={ref => {
                    if (!this.lastRow) {
                      this.lastRow = ref
                    }
                  }}
                  currentPrePick={currentPrePick}
                  message={message}
                />
              </MessageWrapper>
              <PoinstTokensWrapper>
                <PicksPointsTokens
                  question={question}
                  totalPrePicks={totalPrePicks}
                  currentPrePick={currentPrePick}
                  isNotified={this.notifyPicksPointsTokens}
                  picksPointsTokensCallback={this.picksPointsTokensCallback.bind(
                    this
                  )}
                />
              </PoinstTokensWrapper>
            </LowerPanel>
          </ContentContainer>

          <FlashContainer innerRef={c => (this.refFlashContainer = c)} />
          <ReadyContainer innerRef={c => (this.refReadyContainer = c)} />
        </Container>
      )
    } else {
      return <Container />
    }
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  margin: 0 auto;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
`
const BackgroundContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: grayscale(1);
  -webkit-animation: ${props => fadeInBackground} 0.5s ease-in;
  -moz-animation: ${props => fadeInBackground} 0.5s ease-in;
  -o-animation: ${props => fadeInBackground} 0.5s ease-in;
  animation: ${props => fadeInBackground} 0.5s ease-in;
`
const fadeInBackground = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`
const ContentContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 4.5% 4.5% 0 4.5%;
  width: 100%;
  height: 100%;
`
const FlashContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: #2fc12f;
  opacity: 0.6;
`

const ReadyContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: transparent;
`

const UpperPanel = styled.div`
  width: 100%;
`
const LowerPanel = styled.div`
  width: 100%;
  height: 100%;
  bottom: 0;
  position: relative;
  display: flex;
`
const LogoWrapper = styled.div`
  width: 100%;
  height: ${responsiveDimension(12)};
  display: flex;
  flex-direction: row;
`
const SportocoLogoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-left: 9%;
`
const SportocoLogo = styled.img`
  height: ${responsiveDimension(3.2)};
  align-self: center;
`
const PlayAlongLogoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 9%;
`
const PlayAlongLogo = styled.img`
  height: ${responsiveDimension(6)};
  align-self: center;
`
const CountdownClockWrapper = styled.div`
  content: '';
  text-align: center;
`
const QuestionPanelWrapper = styled.div`
  padding-top: ${responsiveDimension(2.9)};
  text-align: center;
`
const SliderWrapper = styled.div`
  padding-top: ${responsiveDimension(3)};
`
const MessageContainer = styled.div`
  width: 100%;
  height: 525px;
  position: relative;
  overflow: hidden;
  display: flex;
`
const MessageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
`
const PoinstTokensWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`
const HistoryContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: 70%;
`

const NextPlayType = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 14%;
  height: ${responsiveDimension(4.6)};
  border-radius: 0 ${responsiveDimension(4.6)} ${responsiveDimension(4.6)} 0;
  background-color: #146314;
  border-top: ${responsiveDimension(0.3)} solid #2fc12f;
  border-right: ${responsiveDimension(0.3)} solid #2fc12f;
  border-bottom: ${responsiveDimension(0.3)} solid #2fc12f;
  padding-right: ${responsiveDimension(0.1)};
  overflow: hidden;
  animation: ${props => bgbar} infinite 1s linear alternate,
    ${props => borderbar} infinite 0.5s ease alternate,
    ${props => barin} forwards 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

const PlayIcon = styled.div`
  position: absolute;
  width: ${responsiveDimension(3.8)};
  height: ${responsiveDimension(3.8)};
  overflow: hidden;
  border-radius: 100%;
  background-color: #2fc12f;
  &:before {
    content: '';
    background-image: url(${props => props.bg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 90% auto;
    animation: ${props => symbolpulse} infinite 0.5s ease alternate;
    position: absolute;
    width: inherit;
    height: inherit;
    transform-origin: center;
    transform: scale(1);
    left: 1px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
`

const LoginFirst = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: pamainbold;
  text-transform: uppercase;
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
const symbolpulse = keyframes`
  0% {transform:scale(1);}
  100% {transform:scale(0.7);}
`

const Refresh = ({ path = '/' }) => (
  <Route
    path={path}
    component={({ history, location, match }) => {
      history.replace({
        ...location,
        pathname: location.pathname.substring(match.path.length),
      })
      return null
    }}
  />
)
