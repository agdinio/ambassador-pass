import React, { Component } from 'react'
import styled from 'styled-components'
import ActivityIndicator from "@/Components/Common/ActivityIndicator";
import {IsMobile, IsTablet, vwToPx, maxWidth, maxHeight} from '@/utils'

export default class ActivityLoaderOLD extends Component {
  render() {
    return (
      <Container backgroundColor={this.props.backgroundColor}>
        <ActivityIndicator height={7} color={'#ffffff'} />
      </Container>
    )
  }
}

const Container = styled.div`
  width: ${props => (IsMobile || IsTablet ? vwToPx(100) : maxWidth)};
  height: ${props => maxHeight}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*background-color: ${props => props.backgroundColor || 'rgba(0,0,0, 0.9)'};*/
`
