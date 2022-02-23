import React, { Component } from 'react'
import styled from 'styled-components'
import { vhToPx, responsiveDimension } from '@/utils'

export class SyncPanel extends Component {
  render() {
    return (
      <Container>
        <TextWrapper>
          <Text font={'pamainregular'} size={4.5}>
            time remaing for
          </Text>
        </TextWrapper>
        <TextWrapper>
          <TextAlign>
            <Text font={'pamainregular'} size={4.5}>
              kick off, 30
            </Text>
            <Text font={'pamainlight'} size={4.5}>
              mins
            </Text>
          </TextAlign>
        </TextWrapper>
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

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.span`
  font-family: ${props => props.font || 'pamainlight'};
  font-size: ${props => vhToPx(props.size || 4)};
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
