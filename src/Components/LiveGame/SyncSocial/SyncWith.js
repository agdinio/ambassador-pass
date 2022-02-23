import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import styled, { keyframes } from 'styled-components'
import { TweenMax, TimelineMax, Quad } from 'gsap'
import { vhToPx, evalImage, responsiveDimension } from '@/utils'
import { PointsAndTokens } from '@/Components/PrePick/PicksPointsTokens'
import TokenIcon from '@/assets/images/playalong-token.svg'
import LoginFirst from '@/Components/Common/LoginFirst'
import ArrowIcon from '@/assets/images/icon-arrow-grey.svg'
import ContinueButton from '@/Components/Button'

@inject('NavigationStore', 'ProfileStore', 'CommonStore')
@observer
export default class SyncWith extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      isSynchronized: false,
      tokens: 0,
      caller: null,
      buttonLock: false,
    })
  }

  handleIsLoggedIn(response) {
    if (response) {
      setTimeout(() => {
        this.props.ProfileStore.getProfile()
      }, 1000)
    }
  }

  handleContinueClick() {
    clearTimeout(this.caller)
    this.props.continue({ nextId: 1000, isSynced: true })
  }

  animateBar(name, key) {
    this.buttonLock = true
    this.lockSocialBar(true, key)

    new TimelineMax({ repeat: 0 })
      .to(this.FlashContainer, 0.2, {
        zIndex: 100,
        opacity: 0.8,
        ease: Quad.easeIn,
      })
      .to(this.FlashContainer, 0.2, {
        delay: 0.1,
        zIndex: 100,
        opacity: 0,
        ease: Quad.easeOut,
      })
      .set(this.FlashContainer, {
        zIndex: -100,
        onComplete: () => {
          this.isSynchronized = true
          this.props.CommonStore.sync({ name: name, isSynced: true })
          this.syncSocial(key)
        },
      })
  }

  syncSocial(key) {
    new TimelineMax({ repeat: 0 })
      .set(this[`refSync${key}`], { width: '50%' })
      .to(this[`refSync${key}`], 0.5, {
        width: '90%',
        onComplete: () => {
          //this.fallingCoinsGroup(key)
          this.fallPrePickCoins(key)
          setTimeout(() => {
            this.buttonLock = false
            this.lockSocialBar(false, key)
          }, 2000)
        },
      })
  }

  fallPrePickCoins(key) {
    this.fallingTokenNumber(key)

    ReactDOM.unmountComponentAtNode(this[`refCoinsContainer${key}`])

    let coins = []
    let density = Math.floor(Math.random() * (6 - 5) + 5)

    for (let i = 0; i < density; i++) {
      let delayThis = Math.floor(Math.random() * (600 - 200) + 200)
      let min = 42,
        max = 52
      let randomPos = Math.floor(Math.random() * (max - min) + min) + 35

      coins.push(
        <Coin
          src={TokenIcon}
          key={`coin-${i}`}
          left={randomPos}
          delay={delayThis}
        />
      )
    }

    ReactDOM.render(coins, this[`refCoinsContainer${key}`])
  }

  lockSocialBar(isLock, key) {
    for (let i = 0; i < this.props.CommonStore.socials.length; i++) {
      if (key === i) {
        continue
      }
      TweenMax.set(this[`lockwhilesync${i}`], { zIndex: isLock ? 1 : 0 })
    }
  }

  fallingCoins() {
    let coins = []
    //let density = Math.floor(Math.random() * (10 - 8) + 8)
    let density = Math.floor(Math.random() * (20 - 18) + 18)

    for (let i = 0; i < density; i++) {
      //let delayThis = Math.floor(Math.random() * 500)
      let delayThis = Math.floor(Math.random() * 2000)
      let min = 80,
        max = 83
      let randomPos = Math.floor(Math.random() * (max - min) + min)

      coins.push(
        <Coin
          src={TokenIcon}
          key={`coin-${i}`}
          left={randomPos}
          delay={delayThis}
        />
      )
    }
    return coins
  }

  fallingTokenNumber(key) {
    this.updateTokens()
    ReactDOM.unmountComponentAtNode(this[`TokensContainer${key}`])
    let point = <TokenNumber>{80}</TokenNumber>
    ReactDOM.render(point, this[`TokensContainer${key}`])
  }

  fallingCoinsGroup(key) {
    this.fallingTokenNumber()
    ReactDOM.unmountComponentAtNode(this[`refCoinsContainer${key}`])
    //let min = 6, max = 9;
    let min = 17,
      max = 20
    let randomCoins = Math.floor(Math.random() * (max - min) + min)
    let wrappers = []

    let placecoin = c => {
      wrappers.push(<div key={`place-coin-${c}`}>{this.fallingCoins()}</div>)

      ReactDOM.render(wrappers, this[`refCoinsContainer${key}`])
    }

    let handler = count => {
      this.caller = setTimeout(() => {
        if (count > 5) {
          this.buttonLock = false
        }
        placecoin(count)
        if (count >= randomCoins) {
          clearTimeout(this.caller)
          return
        }

        handler(count + 1)
      }, 500)
    }

    placecoin(1)
    handler(2)
  }

  updateTokens() {
    this.props.CommonStore.setTokens(80)
  }

  componentDidUpdate(n) {
    // if (!this.props.ProfileStore.isLoading && !this.props.ProfileStore.err) {
    //   this.tokens = this.props.ProfileStore.profile.currencies['tokens']
    // }
  }

  render() {
    let { isLoading, err, profile } = this.props.ProfileStore
    let { socials } = this.props.CommonStore

    /*
    if (err) {
      return (
        <Container>
          <LoginFirst handleIsLoggedIn={this.handleIsLoggedIn.bind(this)} />
        </Container>
      )
    }

    if (isLoading && !err) {
      return (
        <Container>
          <Background />
        </Container>
      )
    }
*/

    return (
      <Container>
        <Background />
        <FlashContainer innerRef={c => (this.FlashContainer = c)} />
        <Content>
          <Section marginTop={5} height={20}>
            {this.isSynchronized ? (
              <TopContainerSynced />
            ) : (
              <TopContainerUnsynced />
            )}
          </Section>

          <Section>
            <SyncContainerColumn>
              {socials.map((item, key) => {
                if (item.isSynced) {
                  return (
                    <SyncWrapper key={key} justifyContent={'flex-start'}>
                      <LockWhileSync
                        innerRef={ref => (this[`lockwhilesync${key}`] = ref)}
                      />
                      <CoinsContainer
                        innerRef={ref =>
                          (this[`refCoinsContainer${key}`] = ref)
                        }
                      />
                      <TokensContainer
                        innerRef={ref => (this[`TokensContainer${key}`] = ref)}
                      />
                      <SyncLocked
                        name={item.name}
                        icon={evalImage(item.icon)}
                        backgroundColor={item.syncLockedBackgroundColor}
                        color={item.syncLockedTextColor}
                        refSync={ref => (this[`refSync${key}`] = ref)}
                        refCircleIcon={ref => (this.refCircleIcon = ref)}
                      />
                    </SyncWrapper>
                  )
                } else {
                  return (
                    <SyncWrapper key={key} justifyContent={'flex-end'}>
                      <LockWhileSync
                        innerRef={ref => (this[`lockwhilesync${key}`] = ref)}
                      />
                      <SyncUnlock
                        handleSync={this.animateBar.bind(this, item.name, key)}
                        name={item.name}
                        icon={evalImage(item.icon)}
                        backgroundColor={item.backgroundColor}
                        color={item.textColor}
                        refSync={ref => (this[`refSync${key}`] = ref)}
                      />
                    </SyncWrapper>
                  )
                }
              })}
            </SyncContainerColumn>
          </Section>

          <Section marginTop={6}>
            {this.isSynchronized ? (
              <BottomContainerSynced
                disabled={this.buttonLock}
                handleContinueClick={this.handleContinueClick.bind(this)}
              />
            ) : (
              <BottomContainerUnsynced />
            )}
          </Section>

          <PointsTokensWrapper>
            <PointsAndTokens
              totalPoints={profile.currencies['points']}
              totalTokens={profile.currencies['tokens']}
            />
          </PointsTokensWrapper>
        </Content>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Background = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.95);
`

const FlashContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: #ffffff;
  opacity: 0;
`

const Content = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${props => `${props.height}%` || `auto`};
  ${props =>
    props.marginTop ? `margin-top: ${vhToPx(props.marginTop)};` : ``} ${props =>
    props.marginBottom ? `margin-bottom: ${vhToPx(props.marginBottom)};` : ``};
`

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.span`
  font-family: ${props => props.font || 'pamainlight'};
  font-size: ${props => responsiveDimension(props.size || 4)};
  color: ${props => props.color || '#ffffff'};
  text-transform: uppercase;
  line-height: ${props => props.lineHeight || 1};
  ${props =>
    props.spacing
      ? `letter-spacing: ${responsiveDimension(props.spacing)};`
      : ``};
`

const TextAlign = styled.div`
  text-align: center;
  line-height: ${props => props.lineHeight || 1};
`

const PointsTokensWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-left: -5%;
  margin-bottom: 5%;
`

const SyncedUnsyncedWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonWrapper = styled.div`
  margin-bottom: ${props => responsiveDimension(3)};
`

const TopContainerUnsynced = () => {
  return (
    <SyncedUnsyncedWrapper>
      <TextWrapper>
        <TextAlign lineHeight={2.5}>
          <Text font={'pamainlight'} size={5}>
            challenge your
          </Text>
        </TextAlign>
      </TextWrapper>
      <TextWrapper>
        <TextAlign lineHeight={2.5}>
          <Text font={'pamainlight'} size={5}>
            circle of friends
          </Text>
        </TextAlign>
      </TextWrapper>
      <TextWrapper>
        <TextAlign lineHeight={3}>
          <Text
            font={'pamainregular'}
            size={3.5}
            color={'#18c5ff'}
            letterSpacing={0.1}
          >
            to play along, earn extra tokens
          </Text>
        </TextAlign>
      </TextWrapper>
    </SyncedUnsyncedWrapper>
  )
}

const BottomContainerUnsynced = () => {
  return (
    <SyncedUnsyncedWrapper>
      <TextWrapper>
        <TextAlign lineHeight={2}>
          <Text font={'pamainlight'} size={4}>
            earn&nbsp;
          </Text>
          <Text font={'pamainextrabold'} size={4} color={'#edbf00'}>
            20&nbsp;
          </Text>
          <Text font={'pamainextrabold'} size={4} color={'#18c5ff'}>
            ‘sync bonus’&nbsp;
          </Text>
          <Text font={'pamainextrabold'} size={4} color={'#edbf00'}>
            tokens
          </Text>
        </TextAlign>
      </TextWrapper>
      <TextWrapper>
        <TextAlign lineHeight={2}>
          <Text font={'pamainlight'} size={4}>
            for every&nbsp;
          </Text>
          <Text font={'pamainextrabold'} size={4}>
            10 friends
          </Text>
        </TextAlign>
      </TextWrapper>
    </SyncedUnsyncedWrapper>
  )
}

const TopContainerSynced = () => {
  return (
    <SyncedUnsyncedWrapper>
      <TextWrapper>
        <TextAlign lineHeight={2.5}>
          <Text font={'pamainlight'} size={5}>
            whoever does best
          </Text>
        </TextAlign>
      </TextWrapper>
      <TextWrapper>
        <TextAlign lineHeight={2.5}>
          <Text font={'pamainlight'} size={5}>
            and gets the most points
          </Text>
        </TextAlign>
      </TextWrapper>
      <TextWrapper>
        <TextAlign lineHeight={2.5}>
          <Text font={'pamainextrabold'} size={6.5}>
            wins&nbsp;
          </Text>
          <Text font={'pamainextrabold'} size={6.5} color={'#9368aa'}>
            big
          </Text>
        </TextAlign>
      </TextWrapper>
    </SyncedUnsyncedWrapper>
  )
}

const BottomContainerSynced = props => {
  return (
    <SyncedUnsyncedWrapper>
      <ButtonWrapper>
        <ContinueButton
          text={'CONTINUE'}
          padding={{ top: 0.8, bottom: 0.8 }}
          arrowSize={3.5}
          disabled={props.disabled}
          handleButtonClick={props.handleContinueClick}
        />
      </ButtonWrapper>
      <TextWrapper>
        <Text font={'pamainlight'} size={3.5} spacing={0.2}>
          42 friends synced
        </Text>
      </TextWrapper>
    </SyncedUnsyncedWrapper>
  )
}

/**
 * This part down: sync containers
 */

const SyncContainerColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${props => responsiveDimension(5)};
`

const LockWhileSync = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => responsiveDimension(8.2)};
  margin-top: ${props => responsiveDimension(0.6)};
  margin-bottom: ${props => responsiveDimension(0.6)};
`

const SyncWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent};
`

const CoinsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const TokensContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Sync = styled.div`
  background-color: ${props => props.backgroundColor};
  width: 90%;
  height: ${props => responsiveDimension(8.2)};

  ${props =>
    props.isSynced
      ? `border-top-right-radius: ${responsiveDimension(7)};
    border-bottom-right-radius: ${responsiveDimension(7)};`
      : `border-top-left-radius: ${responsiveDimension(7)};
    border-bottom-left-radius: ${responsiveDimension(7)};`}

  margin-top: ${props => responsiveDimension(0.6)};
  margin-bottom: ${props => responsiveDimension(0.6)};
  display: flex;
  align-items: center;
  position: relative;
  ${props =>
    !props.isSynced
      ? `&:hover {
    cursor: pointer;
    }`
      : ``}
`

const CircleImageWrapper = styled.div`
  width: ${props => responsiveDimension(8.2)};
  height: ${props => responsiveDimension(8.2)};
  border-radius: ${props => responsiveDimension(8.2)};
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CircleImage = styled.div`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  width: inherit;
  height: inherit;

  display: flex;
  justify-content: center;
  align-items: flex-end;
`
const SyncArrowWrapper = styled.div`
  width: 100%;
  height: 100%;
`
const SyncArrow = styled.div`
  background-image: url(${ArrowIcon});
  background-repeat: no-repeat;
  background-position: left center;
  background-size: auto 40%;
  width: inherit;
  height: inherit;
  position: absolute;
  animation: ${props => syncarrowloop} 2s infinite ease-out;
`
const syncarrowloop = keyframes`
  0% {left: 17%;opacity:0;}
  30% {opacity:1;}
  80% {opacity:1;}
  100% {left: 23%;opacity:0;}
`
const SyncTextWrapper = styled.div`
  width: 100%;
  padding-left: ${props => responsiveDimension(props.paddingLeft || 0)};
  padding-right: ${props => responsiveDimension(props.paddingRight || 0)};
  display: flex;
  justify-content: ${props => props.justifyContent};
`
const SyncTextBold = styled.span`
  font-family: pamainbold;
  font-size: ${props => responsiveDimension(4.5)};
  color: ${props => props.color};
`
const SyncTextLight = styled.span`
  font-family: pamainregular;
  font-size: ${props => responsiveDimension(4.5)};
  color: ${props => props.color};
`
const Coinx = styled.div`
  width: 4%;
  height: 4%;
  position: absolute;
  background: url(${props => props.src}) no-repeat center;
  background-size: contain;
  top: 5%;
  left: ${props => props.left}%;
  z-index: 100;
  transform: scale(1), rotate(0deg);
  animation: ${props => coinFall} forwards 1s
    cubic-bezier(0.6, -0.1, 0.735, 0.045);
  animation-delay: ${props => props.delay}ms;
  opacity: 0;
`
const Coin = styled.div`
  width: 5%;
  height: 5%;
  position: absolute;
  background: url(${props => props.src}) no-repeat center;
  background-size: contain;
  top: 10%;
  left: ${props => props.left}%;
  z-index: 100;
  transform: scale(1), rotate(0deg);
  animation: ${props => coinFall} forwards 0.9s
    cubic-bezier(0.6, -0.28, 0.735, 0.045);
  animation-delay: ${props => props.delay}ms;
  opacity: 0;
  &:nth-of-type(1) {
    transform: rotate(30deg);
    margin-left: 3%;
  }
  &:nth-of-type(2) {
    transform: rotate(-30deg);
    margin-left: -3%;
  }
  &:nth-of-type(3) {
    transform: rotate(-10deg);
    margin-left: 4%;
  }
  &:nth-of-type(4) {
    transform: rotate(-20deg);
    margin-left: 2%;
  }
  &:nth-of-type(5) {
    transform: rotate(30deg);
    margin-left: -2%;
  }
`

const TokenNumber = styled.div`
  color: #fff;
  font-size: ${props => responsiveDimension(5.6)};
  font-family: pamainbold;
  color: #ffb600;
  position: absolute;
  top: 5%;
  z-index: 100;
  &:before {
    content: '+';
    font-size: ${props => responsiveDimension(5)};
    margin-left: ${props => responsiveDimension(0.5)};
    display: inline-block;
  }
  right: ${responsiveDimension(12)};
  animation: ${props => tokenFall} forwards 1.5s
    cubic-bezier(0.1, -0.28, 0.735, 0.045);
`

const coinFall = keyframes`
  0% {opacity:0;}
  20% {opacity:1;transform:scale(1.2);}
  50%{transform:scale(1.5);opacity: 0.8;}
  70% {
    transform:scale(0.8);
  }
  100% {
    margin-left:0;
    opacity:0;
    top:90%;
    transform:scale(5),rotate(0deg);
  }
`
const tokenFall = keyframes`
  0% {opacity:0;}
  20% {opacity:1;transform:scale(1.2);}
  100%{
    transform:scale(1);
    top:80%;
    opacity: 0;
  }
`

const SyncUnlock = props => {
  return (
    <Sync
      backgroundColor={props.backgroundColor}
      isSynced={false}
      innerRef={props.refSync}
      onClick={props.handleSync}
    >
      <CircleImageWrapper>
        <CircleImage src={props.icon} />
      </CircleImageWrapper>
      <SyncArrowWrapper>
        <SyncArrow />
      </SyncArrowWrapper>
      <SyncTextWrapper justifyContent={'flex-end'} paddingRight={7}>
        <SyncTextBold color={props.color}>Sync</SyncTextBold>
        <SyncTextLight color={props.color}>&nbsp;with&nbsp;</SyncTextLight>
        <SyncTextBold color={props.color}>{props.name}</SyncTextBold>
      </SyncTextWrapper>
    </Sync>
  )
}

const SyncLocked = props => {
  return (
    <Sync
      backgroundColor={props.backgroundColor}
      isSynced={true}
      innerRef={props.refSync}
      onClick={props.handleSync}
    >
      <SyncTextWrapper justifyContent={'flex-start'} paddingLeft={7}>
        <SyncTextBold color={props.color}>Synced</SyncTextBold>
        <SyncTextLight color={props.color}>&nbsp;with&nbsp;</SyncTextLight>
        <SyncTextBold color={props.color}>{props.name}</SyncTextBold>
      </SyncTextWrapper>
      <CircleImageWrapper innerRef={props.refCircleIcon}>
        <CircleImage src={props.icon} />
      </CircleImageWrapper>
    </Sync>
  )
}
