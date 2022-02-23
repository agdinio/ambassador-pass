import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { extendObservable, intercept } from 'mobx'
import styled from 'styled-components'
import LiveStreamPanel from '@/Components/LiveGame/LiveStreamPanel'
import FriendRanking from '@/Components/LiveGame/FriendRanking'
import { SyncPanel } from '@/Components/LiveGame/LiveStreamPanel/SyncPanel'
import { LivePlaySocialRanking } from '@/Components/LiveGame/LiveStreamPanel/LivePlaySocialRanking'
import TweenMax from 'gsap/TweenMax'
import { vhToPx, responsiveDimension } from '@/utils'

@inject('LiveGameStore')
@observer
export default class FirstTab extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      showRanks: false,
      inner: null,
      showSocialRanking: false,
    })
    intercept(this.props.LiveGameStore, change => {
      if (
        change.name === 'statusPanel' &&
        change.newValue.gameStatus === 'Live'
      ) {
        this.showSocialRanking = true

        if (this.inner) {
          TweenMax.to(this.inner, 0.25, {
            opacity: 0,
            onComplete: () => {
              // this.showRanks = true
              TweenMax.to(this.inner, 0.25, {
                opacity: 1,
              })
            },
          })
        }
      }
      return change
    })
  }

  showItem() {
    if (this.props.current.componentName === 'SyncSocial') {
      return <SyncPanel />
    }

    if (this.showSocialRanking) {
      return <LivePlaySocialRanking />
    }

    return this.showRanks ? (
      <LiveStreamPanel switchToLive={this.props.switchToLive} />
    ) : (
      // <FriendRanking />
      <LiveStreamPanel switchToLive={this.props.switchToLive} />
    )
  }

  render() {
    return (
      <Container>
        <Inner innerRef={ref => (this.inner = ref)}>{this.showItem()}</Inner>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: ${props => responsiveDimension(39)};
  position: relative;
`
const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
`
