import React, { Component } from 'react'
import styled from 'styled-components'
import { vhToPx, hex2rgb, ordinalSuffix, responsiveDimension } from '@/utils'

export default class Earner extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { rank, item } = this.props

    let obj = Opac[rank]

    return (
      <EarnerOuter>
        <EarnerInner
          rank={rank + 1}
          opacity={obj.opacity}
          pct={obj.blackPct}
          backgroundColor={obj.backgroundColor}
        >
          {/*
          {
            item.isCelebrity ? (
              <CelebRankTab rank={rank+1} />
            ) : (
              <RankTab rank={rank+1}>
                <Ordinal>
                  <RankText rank={rank+1}>{rank+1}</RankText>
                  <OrdinalText rank={rank+1}>{ordinalSuffix(rank+1)}</OrdinalText>
                </Ordinal>
              </RankTab>
            )
          }
*/}

          <RankTab rank={rank + 1} celeb={item.isCelebrity}>
            <Ordinal>
              <RankText rank={rank + 1} celeb={item.isCelebrity}>
                {rank + 1}
              </RankText>
              <OrdinalText rank={rank + 1} celeb={item.isCelebrity}>
                {ordinalSuffix(rank + 1)}
              </OrdinalText>
            </Ordinal>
          </RankTab>

          <Username>{item.displayName}</Username>
          <PointsWrapper>
            <Points>{item.score}</Points>
          </PointsWrapper>
        </EarnerInner>
      </EarnerOuter>
    )
  }
}

const EarnerOuter = styled.div`
  width: 100%;
  border-top: ${props => responsiveDimension(0.1)} solid #353773;
`

const EarnerInner = styled.div`
  width: 100%;
  height: ${props =>
    props.rank === 1 ? responsiveDimension(8.5) : responsiveDimension(5.3)};
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0) 25%
  );
  display: flex;
  flex-direction: row;
  align-items: center;
`

const RankTab = styled.div`
  width: ${props => (props.rank === 1 ? 22 : 17)}%;
  height: ${props =>
    props.rank === 1 ? responsiveDimension(8.3) : responsiveDimension(5.1)};
  border-top-right-radius: ${props =>
    props.rank === 1 ? responsiveDimension(8.3) : responsiveDimension(5.1)};
  border-bottom-right-radius: ${props =>
    props.rank === 1 ? responsiveDimension(8.3) : responsiveDimension(5.1)};
  display: flex;
  align-self: flex-end;
  align-items: center;
  padding-left: 5%;
  ${props =>
    props.celeb
      ? `background: linear-gradient(to right, #837a26, #e6d636);`
      : `background-color: ${props.rank <= 5 ? '#5d64af' : '#353773'};`};
`

const Username = styled.div`
  width: 100%;
  height: 100%;
  font-family: pamainlight;
  font-size: ${props => responsiveDimension(2.5)};
  color: white;
  text-transform: uppercase;
  letter-spacing: ${props => props => responsiveDimension(0.1)};
  padding-left: 5%;
  display: flex;
  align-items: center;
`

const PointsWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  line-height: 1;
  padding-right: 5%;
`
const Points = styled.div`
  font-family: pamainextrabold;
  font-size: ${props => responsiveDimension(3)};
  color: white;

  &:after {
    content: 'PTS';
    font-family: pamainlight;
    font-size: ${props => responsiveDimension(2)};
    color: #17c5ff;
    margin-left: ${props => responsiveDimension(0.5)};
  }
`

const Ordinal = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 1;
`

const RankText = styled.div`
  font-family: pamainlight;
  font-size: ${props =>
    props.rank === 1 ? responsiveDimension(3.9) : responsiveDimension(2.8)};
  color: ${props => (props.celeb ? 'black' : 'white')};
  font-weight: bold;
`

const OrdinalText = styled.div`
  font-family: pamainregular;
  font-size: ${props =>
    props.rank === 1 ? responsiveDimension(2.5) : responsiveDimension(1.7)};
  color: ${props => (props.celeb ? 'black' : 'white')};
  text-transform: uppercase;
`

const Opac = [
  {
    rank: 1,
    opacity: 0.1,
    blackPct: 8,
    backgroundColor: '#282a57',
  },
  {
    rank: 2,
    opacity: 0.15,
    blackPct: 11,
    backgroundColor: '#24264f',
  },
  {
    rank: 3,
    opacity: 0.2,
    blackPct: 12,
    backgroundColor: '#212248',
  },
  {
    rank: 4,
    opacity: 0.25,
    blackPct: 13,
    backgroundColor: '#1e1f41',
  },
  {
    rank: 5,
    opacity: 0.3,
    backgroundColor: '#1b1c3a',
  },
  {
    rank: 6,
    opacity: 0.35,
    backgroundColor: '#181933',
  },
  {
    rank: 7,
    opacity: 0.4,
    backgroundColor: '#14152b',
  },
  {
    rank: 8,
    opacity: 0.45,
    backgroundColor: '#111225',
  },
  {
    rank: 9,
    opacity: 0.5,
    blackPct: 50,
    backgroundColor: '#0e0e1e',
  },
  {
    rank: 10,
    opacity: 0.55,
    blackPct: 100,
    backgroundColor: '#0b0b17',
  },
]
