import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import SyncButton from '@/Components/Button'
import { vhToPx, hex2rgb, responsiveDimension } from '@/utils'

@observer
export default class SyncSocial extends Component {
  constructor(props) {
    super(props)
  }

  handleSyncClick() {
    this.props.showSync(true)
  }

  handleNotifyOnKickOffClick() {
    this.props.isTimeUp(true)
  }

  componentDidUpdate(n) {
    debugger
    if (
      this.props.nextScreenAfterSync &&
      this.props.nextScreenAfterSync.nextId
    ) {
      this.props.isTimeUp(true, {
        nextId: this.props.nextScreenAfterSync.nextId,
      })
    }
  }

  render() {
    const { question } = this.props

    return (
      <Container color={question.backgroundColor}>
        <Section>
          <TextWrapper>
            <Text
              font={'pamainlight'}
              size={4}
              onClick={() => {
                alert('t')
              }}
            >
              invite your friends to play with you
            </Text>
          </TextWrapper>
          <TextWrapper>
            <TextAlign lineHeight={1.1}>
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
            <Text font={'pamainlight'} size={4}>
              for every&nbsp;
            </Text>
            <Text font={'pamainextrabold'} size={4}>
              10 friends
            </Text>
          </TextWrapper>
        </Section>
        <Section marginTop={5}>
          <SyncButton
            text={'SYNC NOW'}
            hoverTextColor={'#3a5999'}
            padding={{ top: 1, bottom: 1 }}
            arrowSize={3.5}
            handleButtonClick={this.handleSyncClick.bind(this)}
          />
        </Section>
        <Section marginTop={5}>
          <TextWrapper>
            <Underline>
              <Text
                font={'pamainregular'}
                size={3.5}
                color={'rgba(0,0,0, 0.5)'}
                style={{ cursor: 'pointer', zIndex: 100 }}
                onClick={this.handleNotifyOnKickOffClick.bind(this)}
              >
                or, notify me at kick-off
              </Text>
            </Underline>
          </TextWrapper>
        </Section>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
  background-color: ${props =>
    props.color ? hex2rgb(props.color, 1) : 'rgb(162, 23, 23)'};
  border-top: ${props => responsiveDimension(0.5)} solid
    rgba(255, 255, 255, 0.2);
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

const Underline = styled.div`
  display: flex;
  flex-direction: column;
  &:after {
    content: '';
    height: ${props => responsiveDimension(0.1)};
    width: inherit;
    background-color: rgba(0, 0, 0, 0.5);
    margin-top: ${props => responsiveDimension(0.5)};
  }
`
