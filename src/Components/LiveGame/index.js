import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { extendObservable, intercept } from 'mobx'
import styled, { keyframes } from 'styled-components'
import { TweenMax, TimelineMax, Quad, Ease } from 'gsap'
import bgDefault from '@/assets/images/playalong-default.jpg'
import StatusPanel from '@/Components/LiveGame/StatusPanel/StatusPanel'
import GameHeader from '@/Components/GameHeader'
import FirstTab from '@/Components/LiveGame/FirstTab'
import ThirdTab from '@/Components/LiveGame/ThirdTab'
import HistoryTracker from '@/Components/HistoryTracker/HistoryTracker'
import LiveGameQuestions from '@/Components/LiveGame/LiveGameQuestions'
import PrePickTokens from '@/Components/PrePick/PicksPointsTokens'
import SyncWith from '@/Components/LiveGame/SyncSocial/SyncWith'
import BezierEasing from '@/bezier-easing'
import {
  hex2rgb,
  vhToPx,
  IsMobile,
  IsTablet,
  isInStandaloneMode,
  responsiveDimension,
} from '@/utils'

@inject('ProfileStore', 'UserStore', 'LiveGameStore', 'PrePickStore')
@observer
export default class LiveGameComponent extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      //muted: true,
      activeTab: -1,
      //timer: 30,
      //check: undefined,
      //heightCalc: 0,
      notifyPicksPointsTokens: false,
      gotoKickOff: false,
      nextScreenAfterSync: null,
      ikaw: null,
    })

    this.preText = ''
    this.nextType = ''
    this.state = {
      isPlayVideo: false,
    }

    intercept(this.props.LiveGameStore, 'proceedToVideoScreen', change => {
      if (change.newValue) {
        this.next(2)
      }
      return change
    })
  }

  next(key) {
    debugger

    if (this[`tab${key}`] && this[`step${key}`]) {
      this.activeTab = key

      let tab = this[`tab${key}`]
      let step = this[`step${key}`]

      TweenMax.to(this.refTabs, 0.5, { left: -tab.offsetWidth * key })
      if (this.history) {
        TweenMax.to(this.history, 0.5, {
          right: key === 0 || key === 2 ? '-50%' : '0%',
        })
      }
      for (let i = 0; i < 3; i++) {
        this[`step${i}`].className = this[`step${i}`].className.replace(
          'active',
          ''
        )
      }
      step.className += ' active'
    }
  }

  componentWillUnmount() {
    //clearInterval(this.check)
    clearTimeout(this.to)
    clearTimeout(this.cl)
  }

  componentWillMount() {
    debugger

    this.props.PrePickStore.pullData()
    /*
    this.props.ProfileStore.getProfile().then(profile => {
      if (
        this.props.ProfileStore.profile.currencies &&
        this.props.ProfileStore.profile.currencies.points < 1
      ) {
        this.props.ProfileStore.setProfileCurrencies({
          points: 10000,
          stars: 0,
          tokens: 250,
        })
      }
    })
*/

    if (
      this.props.ProfileStore.profile &&
      this.props.ProfileStore.profile.currencies
    ) {
      if (this.props.ProfileStore.profile.currencies.tokens < 1) {
        this.props.ProfileStore.setProfileCurrencies({
          points: 10000,
          stars: 0,
          tokens: 250,
        })
      }
    }

    //this.props.PrePickStore.setTokensTemp(200)
    //this.props.PrePickStore.setPointsTemp(1000)
    this.props.LiveGameStore.initScript()
    this.props.LiveGameStore.gameFetch()
    /*
    setTimeout(() => {
      this.props.LiveGameStore.gameStart()
    }, 5000)
*/
  }

  componentDidMount() {
    //this.countdown()
    this.next(0)

    let startX
    let isDown = false

    this.refTabs.addEventListener('mousedown', e => {
      isDown = true
      startX = e.screenX + this[`tab${this.activeTab}`].offsetLeft
    })

    this.refTabs.addEventListener('mousemove', e => {
      if (!isDown) {
        return false
      }

      let change = startX - e.screenX
      TweenMax.to(this.refTabs, 0, { left: -change })
    })

    this.refTabs.addEventListener('mouseup', e => {
      isDown = false

      let x = this[`tab${this.activeTab}`].offsetWidth * this.activeTab
      let change = startX - e.screenX

      let threshold = 0
      let distX = x + (e.screenX - startX)
      if (distX < 0) {
        threshold = x + this[`tab${this.activeTab}`].offsetWidth / 2
      } else {
        threshold = x - this[`tab${this.activeTab}`].offsetWidth / 2
      }

      if (distX < 0) {
        //LEFT DIRECTION
        if (change < threshold) {
          this.next(this.activeTab)
        } else {
          this.next(this.activeTab < 2 ? this.activeTab + 1 : this.activeTab)
        }
      } else {
        //RIGHT DIRECTION
        if (change < threshold) {
          this.next(
            this.activeTab > 0 && this.activeTab < 3
              ? this.activeTab - 1
              : this.activeTab
          )
        } else {
          this.next(this.activeTab)
        }
      }
    })

    this.refTabs.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX + this[`tab${this.activeTab}`].offsetLeft
    })

    this.refTabs.addEventListener('touchmove', e => {
      let change = startX - e.touches[0].clientX
      TweenMax.to(this.refTabs, 0, { left: -change })
    })

    this.refTabs.addEventListener('touchend', e => {
      let x = this[`tab${this.activeTab}`].offsetWidth * this.activeTab
      let change = startX - e.changedTouches[0].clientX

      let threshold = 0
      let distX = x + (e.changedTouches[0].clientX - startX)
      if (distX < 0) {
        threshold = x + this[`tab${this.activeTab}`].offsetWidth / 2
      } else {
        threshold = x - this[`tab${this.activeTab}`].offsetWidth / 2
      }

      if (distX < 0) {
        //LEFT DIRECTION
        if (change < threshold) {
          this.next(this.activeTab)
        } else {
          this.next(this.activeTab < 2 ? this.activeTab + 1 : this.activeTab)
        }
      } else {
        //RIGHT DIRECTION
        if (change < threshold) {
          this.next(
            this.activeTab > 0 && this.activeTab < 3
              ? this.activeTab - 1
              : this.activeTab
          )
        } else {
          this.next(this.activeTab)
        }
      }
    })
  }

  onClickTogglePlayHasStarted() {
    this.props.LiveGameStore.inProgress = !this.props.LiveGameStore.inProgress
  }

  handleLockout(val) {
    //let el = ReactDOM.findDOMNode(this.StatusPanel)
    let bgColor = 'transparent'
    if (this.StatusPanel) {
      bgColor = val ? '#000000' : 'transparent'
      TweenMax.set(this.StatusPanel, { backgroundColor: bgColor })
      TweenMax.set(this['tab0'], { backgroundColor: bgColor })
      TweenMax.set(this['tab1'], { backgroundColor: bgColor })
    }
  }

  handleAnswered(evt, cb) {
    this.notifyPicksPointsTokens = evt.isNotify
    this.to = setTimeout(() => {
      this.notifyPicksPointsTokens = false
    }, 1250)
    this.cl = setTimeout(() => {
      cb()
    }, 500)
  }

  handleSplash() {
    new TimelineMax({ repeat: 0 })
      .to(this.refBlankContainer, 0.2, {
        zIndex: 100,
        opacity: 0.9,
        ease: Quad.easeIn,
      })
      .to(this.refBlankContainer, 0.2, {
        delay: 0.1,
        zIndex: 100,
        opacity: 0,
        ease: Quad.easeOut,
      })
      .set(this.refBlankContainer, {
        zIndex: -100,
      })
  }

  getNextQuestion() {
    debugger
    let current = this.props.LiveGameStore.currentScriptItem

    if (
      current &&
      current.id === 1003 &&
      (current.choices && current.choices.length > 1)
    ) {
      //--rellythis.next(1)
    }

    // while (current && !current.isQuestion) {
    //   current = current.next && current.next[0] ? current.next[0] : current.next
    // }

    if (current && current.choices && current.choices.length > 1) {
      this.props.LiveGameStore.gameStart()
    } else {
      this.props.LiveGameStore.gamePost()
    }

    return current
  }

  setPreText() {
    if (
      this.props.PrePickStore.multiplier === 0 &&
      !this.props.LiveGameStore.inProgress
    ) {
      this.nextType = this.props.LiveGameStore.getNextType(
        this.props.LiveGameStore.currentScriptItem.nextId
      )
      let shortHand = this.props.LiveGameStore.currentScriptItem.shortHand
      //if (this.props.LiveGameStore.currentScriptItem.stars > 0) {
      //  this.preText = shortHand + ' STAR'
      //} else {
      this.preText = shortHand
      //}
    }
  }

  getType(cur) {
    debugger
    if (!cur) {
      return 'LivePlay'
    }
    switch (cur.componentName) {
      case 'GameMasterQuestion':
        return 'GameMaster'
      case 'SponsorQuestion':
        return 'Sponsor'
      case 'AdvertisementQuestion':
        return 'Prize'
      case 'ExtraPointQuestion':
        return 'ExtraPoint'
      case 'Summary':
        return 'Summary'
      default:
        return 'LivePlay'
    }
  }

  handleBackground(img) {
    let bg = ''
    try {
      bg = require('@/assets/images/' + img)
    } catch (e) {
      bg = bgDefault
    }

    if (this.refBackground) {
      TweenMax.to(this.refBackground, 0.3, {
        backgroundImage: 'url(' + bg + ')',
      })
    }
  }

  handleGotoKickOff() {
    this.gotoKickOff = true
  }

  handleShowSync(response) {
    if (response) {
      TweenMax.to(this.SyncWrapper, 0.6, {
        x: '0%',
        ease: new Ease(BezierEasing(0.77, 0, 0.175, 1)),
      })
    } else {
      TweenMax.to(this.SyncWrapper, 0.6, { x: '101%' })
    }
  }

  handleSyncContinue(response) {
    if (response) {
      TweenMax.to(this.SyncWrapper, 0.6, { x: '101%' })
      this.nextScreenAfterSync = response
    }
  }

  render() {
    debugger
    const current = this.getNextQuestion()
    this.setPreText()
    return (
      <Container>
        <BackgroundWrapper innerRef={c => (this.refBackground = c)} />
        <BlankContainer innerRef={c => (this.refBlankContainer = c)} />
        <SyncWrapper innerRef={c => (this.SyncWrapper = c)}>
          <SyncWith continue={this.handleSyncContinue.bind(this)} />
        </SyncWrapper>
        {/*
        <ImaginaryContainer>
          <TogglePlayInProgress
            onClick={this.onClickTogglePlayHasStarted.bind(this)}
          />
        </ImaginaryContainer>
*/}
        <ContentWrapper>
          <StatusPanelWrapper
            innerRef={ref => {
              this.StatusPanel = ref
            }}
          >
            {/*<StatusPanel />*/}
            <GameHeader />
          </StatusPanelWrapper>

          <BodyWrapper>
            <Content>
              <LiveGameQuestions
                questionBackground={this.handleBackground.bind(this)}
                isLockout={this.handleLockout.bind(this)}
                answered={this.handleAnswered.bind(this)}
                splash={this.handleSplash.bind(this)}
                proceedToVideoScreen={this.next.bind(this, 2)}
                showSync={this.handleShowSync.bind(this)}
                nextScreenAfterSync={this.nextScreenAfterSync}
              />
            </Content>

            <StepWrapper innerRef={ref => (this.StepWrapper = ref)}>
              <Step
                key={0}
                innerRef={c => (this[`step0`] = c)}
                onClick={this.next.bind(this, 0)}
              />
              <Step
                key={1}
                innerRef={c => (this[`step1`] = c)}
                onClick={this.next.bind(this, 1)}
              />
              <Step
                key={2}
                innerRef={c => (this[`step2`] = c)}
                onClick={this.next.bind(this, 2)}
              />
            </StepWrapper>
            <TabWrapper innerRef={ref => (this.TabWrapper = ref)}>
              <TabInnerWrapper innerRef={c => (this.refTabs = c)}>
                <Tab key={0} innerRef={c => (this['tab0'] = c)}>
                  <FirstTab
                    current={current}
                    switchToLive={this.next.bind(this, 2)}
                  />
                </Tab>
                <Tab key={1} innerRef={c => (this['tab1'] = c)}>
                  <SecondTab>
                    <HistoryTracker
                      mode={'live'}
                      //preText={current ? current.shortHand : null}
                      preText={this.preText || ''}
                      symbol={this.getType(current)}
                      nextSymbol={this.nextType}
                    />
                  </SecondTab>
                </Tab>
                <Tab key={2} innerRef={c => (this['tab2'] = c)}>
                  <ThirdTab />
                </Tab>
              </TabInnerWrapper>
            </TabWrapper>
            <TokenContainer innerRef={ref => (this.history = ref)}>
              <Token>
                <PrePickTokens
                  question={this.props.LiveGameStore.currentScriptItem}
                  currentPrePick={0}
                  isNotified={this.notifyPicksPointsTokens}
                  picksPointsTokensCallback={() => {}}
                />
              </Token>
            </TokenContainer>
          </BodyWrapper>
        </ContentWrapper>
      </Container>
    )
  }
}

const TokenContainer = styled.div`
  width: 100%;
  height: 20%;
  position: absolute;
  bottom: 0%;
  right: 0%;
`
const Token = styled.div`
  height: 100%;
  width: inherit;
  padding-right: 5%;
  padding-bottom: 5%;
`

const SecondTab = styled.div`
  padding-top: 5px;
  position: relative;
  height: inherit;
  overflow: hidden;
`
const Container = styled.div`
  position: relative;
  animation: 0.25s ${props => fadeInAnimation} forwards;
  margin: 0 auto;
  overflow: hidden;
  width: inherit;
  height: inherit;
`
const fadeInAnimation = keyframes`
  0% { opacity:0; }
  100% { opacity:1; }
`

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const BackgroundWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: grayscale(1);
`
const BlankContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: #ffffff;
  opacity: 0;
`
const SyncWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 200;
  transform: translateX(101%);
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`

const ContentNav = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const StatusPanelWrapper = styled.div`
  width: 100%;
  height: ${props => responsiveDimension(9)};
`

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const StepWrapper = styled.div`
  width: 100%;
  /*height: ${props => responsiveDimension(1.5)};*/
  height: 1.5%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #565859;

  position: relative;
  z-index: 99;
`
const Step = styled.span`
  height: ${props => responsiveDimension(2.2)};
  width: ${props => responsiveDimension(2.2)};
  background-color: #919594;
  border: none;
  border-radius: 50%;
  display: inline-block;
  z-index: 1;
  margin-right: ${props => responsiveDimension(3.5)};
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: #ffffff;
  }
`
const TabWrapper = styled.div`
  width: 100%;
  height: ${props =>
    IsMobile && isInStandaloneMode()
      ? 70
      : IsTablet && isInStandaloneMode()
        ? 90
        : 80}%;
  position: relative;
  display: flex;
  background-color: transparent;
  overflow: hidden;
`
const TabInnerWrapper = styled.div`
  position: absolute;
  display: flex;
  width: calc(100% * 3);
  height: fill-available;

  &:hover {
    cursor: -moz-grab;
    cursor: -webkit-grab;
    cursor: grab;
  }
  &:active {
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
`
const Tab = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  z-index: 1;
`

const ImaginaryContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 2%;
  z-index: 100;
  bottom: 0;
`
const TogglePlayInProgress = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  &:hover {
    background: ${hex2rgb('#f46e42', 0.1)};
  }
`
