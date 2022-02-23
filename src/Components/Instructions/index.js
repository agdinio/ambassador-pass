import React, { Component } from 'react'
import styled from 'styled-components'
import Background from '@/assets/images/playalong-default.jpg'
import MenuBanner from '@/Components/Common/MenuBanner'
import {responsiveDimension} from '@/utils'

export default class Instructions extends Component {
  render() {
    return (
      <Container>
        <MenuBannerWrap>
          <MenuBanner
            backgroundColor={'#414042'}
            icon={`menu-how_to_play-icon.svg`}
            iconBackgroundColor={'#414042'}
            iconMaskColor={'#ffffff'}
            iconBorderColor={'#ffffff'}
            sizeInPct="80"
            text="how to play"
            textColor={'#ffffff'}
          />
        </MenuBannerWrap>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
`

const MenuBannerWrap = styled.div`
  width: 100%;
  height: ${props => responsiveDimension(12)};
`
