import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import styled, { keyframes } from 'styled-components'
import token from '@/assets/images/playalong-token.svg'
import { PaCircle } from '@/Components/IntroScreen'
import pa_default from '@/assets/images/bg-default.jpg'
import Arrow from '@/assets/images/icon-arrow-grey.svg'

@observer
class InitialScreen extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      me: {
        name: 'Jasper Forest2',
        id: 2,
        isMe: true,
        picture: token,
        points: 12334,
      },
    })
  }

  render() {
    return (
      <Container hasLoaded={!this.props.isLoading}>
        <div>
          <PaCircle />
        </div>
        <SocialRankText> Social Ranking </SocialRankText>
        <GameText> This Game </GameText>
        <LowerTextContainer>
          <ArrowImg src={Arrow} alt="" />
          <span>see how well you did</span>
          <span>against your friends</span>
        </LowerTextContainer>
      </Container>
    )
  }
}

export default InitialScreen

const fadeOut = keyframes`
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`

const Container = styled.div`
  width: 100%;
  max-width: 660px;
  ${props =>
    props.hasLoaded ? `animation:1s ${fadeOut} forwards;` : ''} top: 0;
  position: absolute;
  color: white;
  height: -webkit-fill-available;
  background-image: url(${pa_default});
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: pamainlight;
  align-items: center;
`

const LowerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-family: pamainbold;
  line-height: 1;
`

const ArrowImg = styled.img`
  transform: rotate(-90deg);
  margin-top: 20px;
  margin-bottom: 10px;
`

const SocialRankText = styled.div`
  color: #18c5ff;
  font-size: 3.6em;
  text-transform: uppercase;
  line-height: 1;
`

const GameText = styled.div`
  text-transform: uppercase;
  font-size: 5em;
  line-height: 1;
  letter-spacing: 2px;
`
