import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { extendObservable, intercept, observe } from 'mobx'
import ProfileMe from '@/assets/images/profiles/icon-profile.svg'
import styled, { keyframes } from 'styled-components'
import {
  hex2rgb,
  vhToPx,
  ordinalSuffix,
  evalImage,
  responsiveDimension,
} from '@/utils'

@observer
export default class RankingItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { person, isGlobal } = this.props
    return (
      <Container isMe={person.isMe} innerRef={this.props.reference}>
        <InnerLeft isMe={person.isMe} isGlobal={isGlobal}>
          {isGlobal ? (
            this.props.globalTopNumber ? (
              <Rank isMe={person.isMe}>
                <div style={{ marginLeft: '40%' }}>
                  {this.props.globalTopNumber}
                </div>
              </Rank>
            ) : (
              <Rank isMe={person.isMe} />
            )
          ) : (
            <Rank isMe={person.isMe}>
              {person.place}
              <RankOrdinal>{ordinalSuffix(person.place)}</RankOrdinal>
            </Rank>
          )}
          <ProfileIcon src={evalImage(`profiles/${person.picture}`)} />
        </InnerLeft>
        <InnerRight>
          <Name>{person.name}</Name>
          <PointsWrapper>
            <PointsInner>
              <Points>
                {isGlobal ? this.props.globalPointsNumber : person.points}
              </Points>
              <PTS>PTS</PTS>
            </PointsInner>
          </PointsWrapper>
        </InnerRight>
      </Container>
    )
  }
}

const itemHeight = 8
const Container = styled.div`
  width: 100%;
  height: ${props => responsiveDimension(itemHeight)};
  margin-top: ${props => responsiveDimension(0.3)};
  background-color: #231f20;
  display: flex;
  justify-content: space-between;
  position: relative;
  ${props =>
    props.isMe
      ? `border: ${responsiveDimension(0.2)} solid #18c5ff; z-index: 8;`
      : `z-index: 7;`};
`

const InnerLeft = styled.div`
  width: 40%;
  height: 100%;
  border-top-right-radius: ${props => responsiveDimension(itemHeight)};
  border-bottom-right-radius: ${props => responsiveDimension(itemHeight)};
  background-color: ${props => (props.isMe ? '#18c5ff' : '#6d6e71')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: ${props => responsiveDimension(0.6)};
  ${props =>
    props.isGlobal ? `animation: ${adjustInnerLeftWidth} 2s forwards;` : ``};
`

const adjustInnerLeftWidth = keyframes`
  0%{
    width: 45%;
  }
  100%{
    width: 70%;
  }
`

const Rank = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: pamainregular;
  font-size: ${props => responsiveDimension(3)};
  text-transform: uppercase;
  color: ${props => (props.isMe ? '#000000' : '#ffffff')};
  white-space: nowrap;
`
const RankOrdinal = styled.span`
  font-size: ${props => responsiveDimension(2)};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  //height: 45%;
  margin-bottom: 6%;
`

const ProfileIconMe = styled.div`
  width: ${props => responsiveDimension(5)};
  height: ${props => responsiveDimension(5)};
  border-radius: ${props => responsiveDimension(5)};
  background: #ffffff;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const ProfileIcon = styled.div`
  width: ${props => responsiveDimension(0.8 * 8)};
  height: ${props => responsiveDimension(0.8 * 8)};
  min-width: ${props => responsiveDimension(0.8 * 8)};
  min-height: ${props => responsiveDimension(0.8 * 8)};
  border-radius: 50%;
  background: #ffffff;
  border: ${props => responsiveDimension(0.3)} solid #ffffff;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const InnerRight = styled.div`
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  padding 0 4% 0 5%;
`

const Name = styled.div`
  font-family: pamainregular;
  font-size: ${props => responsiveDimension(2.3)};
  text-transform: uppercase;
  color: #ffffff;
  display: flex;
  align-items: center;
`

const PointsWrapper = styled.div`
  display: flex;
  align-items: center;
`
const PointsInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`
const Points = styled.div`
  flex-direction: row;
  font-family: pamainextrabold;
  font-size: ${props => responsiveDimension(3.1)};
  color: #ffffff;
  line-height: 1.1;
`

const PTS = styled.div`
  font-family: pamainregular;
  font-size: ${props => responsiveDimension(2)};
  color: #18c5ff;
  text-transform: uppercase;
`
