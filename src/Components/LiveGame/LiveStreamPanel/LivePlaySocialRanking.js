import React, { Component } from 'react'
import styled from 'styled-components'
import { vhToPx } from '@/utils'
import SocialRankImage from '@/assets/images/socialrank-sample-zommedout.png'

export class LivePlaySocialRanking extends Component {
  render() {
    return (
      <Container>
        <Ranking src={SocialRankImage} />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Ranking = styled.div`
  width: inherit;
  height: 100%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
