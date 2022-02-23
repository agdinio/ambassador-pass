import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import styled, { keyframes } from 'styled-components'
import BlankProfile from '@/assets/images/icon-profile.svg'

@observer
class SocialRankingRow extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      hide: false,
    })
  }

  getPlacePostFix(place) {
    switch (place) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  componentWillReceiveProps(np, op) {
    if (op.global !== np.global && np.global) {
      this.timer = setTimeout(() => {
        this.hide = true && !np.person.isMe
      }, 700)
    }
  }

  render() {
    return (
      <Row
        total={this.props.total}
        isMe={this.props.person.isMe}
        global={this.props.global}
        index={this.props.index}
        rank={this.props.person.globalRank}
        hasLoaded={this.props.hasLoaded}
      >
        <LeftSection isMe={this.props.person.isMe} global={this.props.global}>
          <RankContainer
            global={this.props.global}
            isMe={this.props.person.isMe}
          >
            {this.hide ? null : (
              <Rank small={this.props.global}>
                {this.props.hasLoaded
                  ? this.props.global && this.props.person.isMe
                    ? 1 - this.props.person.globalRank
                      ? `TOP ${(
                          (1 - this.props.person.globalRank) *
                          100
                        ).toFixed(0)}%`
                      : '#1'
                    : this.props.person.place
                  : '--'}
              </Rank>
            )}
            {!this.props.hasLoaded ||
            this.hide ||
            (this.props.global && this.props.person.isMe) ? null : (
              <RankPostFix>
                {this.getPlacePostFix(this.props.person.place)}
              </RankPostFix>
            )}
          </RankContainer>
          <PictureContainer
            isMe={this.props.person.isMe}
            global={this.props.global}
          >
            <Picture
              src={this.hide ? BlankProfile : this.props.person.picture}
              alt=""
            />
          </PictureContainer>
        </LeftSection>
        <Name>{this.hide ? null : this.props.person.name}</Name>
        <PointsContainer
          isMe={this.props.person.isMe}
          global={this.props.global}
        >
          {this.props.person.points}
          <PointsPostFix>PTS</PointsPostFix>
        </PointsContainer>
      </Row>
    )
  }
}

export default SocialRankingRow

const fadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`

const ExitAndReturnAnimation = (index, total) => {
  return keyframes`
    0%{
      top: ${155 + index * 57}px;
    }
    70%{
      top: ${0 - (155 + (total - index) * 57)}px;
      opacity:0;
    }
    71%{
      top: ${(index - 1) * 6.3 + 16}vh;
      opacity: 0;
    }
    100%{
      top: ${(index - 1) * 6.3 + 16}vh;
      opacity: 1;
    }
  `
}

const MoveAnimation = (index, total, rank) => {
  return keyframes`
   0%{
     top: ${155 + index * 57}px;
   }
   100%{
     top: ${rank ? 15.7 + (1 - rank) * 80 : 60}vh;
   }
  `
}

const moveIn = props => {
  return keyframes`
    0%{
      top: ${props.index * 6 + 94}vh;
    }
    100%{
      top: ${props.index * 6.3 + 14.2}vh;
    }
  `
}

const Row = styled.div`
  background-color: #231f20;
  height: 6vh;
  margin-bottom: 1px;
  margin-top: 1px;
  position: fixed;
  color: white;
  max-width: 69vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  top: ${props => props.index * 6 + 94}vh;
  ${props =>
    props.hasLoaded ? `animation: 1s ${moveIn(props)} forwards;` : ''}
  align-items: center;
  font-family: pamainregular;
  ${props =>
    props.isMe
      ? 'border: 2px solid #00b4ff;'
      : `animation : 1s ${fadeIn} fowards;`}
  ${props => (props.isMe ? 'z-index: 100;' : '')}
  ${props =>
    props.global && !props.isMe
      ? `width: inherit;top:${155 + props.index * 57}px;`
      : ''}
  ${props =>
    props.global && props.isMe
      ? `z-index:20;width: inherit;position:fixed;top:${155 +
          props.index * 57}px;`
      : ''}
  ${props =>
    props.global && !props.isMe
      ? `animation: 1.25s ${ExitAndReturnAnimation(
          props.index,
          props.total
        )} forwards`
      : ''}
  ${props =>
    props.global && props.isMe
      ? `animation: 1.8s ${MoveAnimation(
          props.index,
          props.total,
          props.rank
        )} forwards`
      : ''}
`

const LeftSection = styled.div`
  ${props =>
    props.global && props.isMe
      ? `animation: 1.5s ${keyframes`0%{width:30%;}100%{width:40%;}`} forwards;`
      : ''} margin-right: 20px;
  display: flex;
  flex-direction: row;
  width: 30%;
  height: 100%;
`

const RankContainer = styled.div`
  background-color: ${props => (props.isMe ? '#00b4ff' : '#6d6e71')};
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.isMe && props.global ? 'flex-end' : 'center'};
  ${props =>
    props.global && props.isMe
      ? `animation: 1.5s ${keyframes`0%{width:50%;}100%{width:60%;}`} forwards;`
      : ''};
`

const Rank = styled.span`
  font-size ${props => (props.small ? 2 : 3)}vh;
`

const RankPostFix = styled.span`
  margin-bottom: 5px;
  margin-left: 1px;
  font-size: 2.5vh;
`

const PictureContainer = styled.div`
  width: 50%;
  justify-content: flex-end;
  display: flex;
  margin-right: 8px;
  align-items: center;
  background-color: ${props => (props.isMe ? '#00b4ff' : '#6d6e71')};
  border-bottom-right-radius: 30px;
  padding-right: 7px;
  border-top-right-radius: 30px;
  ${props =>
    props.global && props.isMe
      ? `animation: 1.5s ${keyframes`0%{width:50%;}100%{width:40%;}`} forwards;`
      : ''};
`

const Picture = styled.img`
  border: 3px solid white;
  border-radius: 50%;
  width: 5vh;
  height: 5vh;
`

const Name = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  font-size: 2.4vh;
  text-transform: uppercase;
  height: 100%;
`

const PointsContainer = styled.div`
  ${props =>
    props.global && props.isMe
      ? `animation: 1.5s ${keyframes`0%{width:30%;}100%{width:20%;}`} forwards;`
      : ''} display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 20px;
  width: 30%;
  font-size: 2.4vh;
  height: 100%;
  align-items: center;
`

const PointsPostFix = styled.span`
  font-size: 1.5vh;
  margin-bottom: 5px;
  margin-left: 5px;
  color: rgb(0, 180, 255);
  align-items: flex-end;
  display: flex;
`
