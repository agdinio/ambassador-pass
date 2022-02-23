import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled, { keyframes } from 'styled-components'
import { TweenMax, Ease } from 'gsap'
import Background from '@/assets/images/playalong-default.jpg'
import { vhToPx, hex2rgb, responsiveDimension } from '@/utils'
import CelebEarner from './CelebEarner'
import Earner from './Earner'
//import Signin from '@/Components/Menu/Signin'
import MenuBanner from '@/Components/Common/MenuBanner'

@inject('CommonStore', 'NavigationStore', 'ProfileStore')
@observer
export default class LeaderBoard extends Component {
  constructor(props) {
    super(props)

    if (this.props.ProfileStore.profile.userName) {
      this.props.CommonStore.getLeaderboard()
    }
  }

  handleLoggedIn() {
    this.props.CommonStore.getLeaderboard()
  }

  componentWillUnmount() {
    this.props.NavigationStore.setActiveMenu(null)
  }

  componentDidMount() {
    this.props.NavigationStore.setActiveMenu(
      this.props.NavigationStore.location
    )
  }

  render() {
    // this.earners.sort((a, b) => a.points - b.points)
    // let celebs = this.earners.filter(o => o.isCelebrity)

/*
    if (!this.props.ProfileStore.profile.userName) {
      return (
        <Container>
          <Signin loggedIn={this.handleLoggedIn.bind(this)} />
        </Container>
      )
    }
*/

    let { isLoading, leaderboard } = this.props.CommonStore
    if (!isLoading) {
      if (leaderboard.length < 10) {
        let lblen = leaderboard.length
        for (let i = lblen; i < 10; i++) {
          let earner = { userName: '', displayName: '', score: 0, rank: i + 1 }
          leaderboard.push(earner)
        }
      }

      let celebs = leaderboard.filter(o => o.isCelebrity)

      console.log(':::', JSON.parse(JSON.stringify(leaderboard)))

      return (
        <Container>
          <Wrapper>
            <MenuBanner
              backgroundColor={'#353773'}
              icon={`menu-leaderboard-icon.svg`}
              iconBackgroundColor={'#353773'}
              iconBorderColor={'#ffffff'}
              sizeInPct="40"
              text="leaderboard"
              textColor={'#444693'}
            />
            <Content>
              <Bottom>
                <EarnerOuter>
                  <EarnerHeader>CELEBRITIES PLAYING</EarnerHeader>
                </EarnerOuter>
                <CelebPointEarners>
                  {celebs.map((celeb, key) => {
                    return <CelebEarner item={celeb} key={key} />
                  })}
                </CelebPointEarners>
                <PointEarners>
                  <EarnerOuter>
                    <EarnerHeader>TOP 10 POINT EARNERS</EarnerHeader>
                  </EarnerOuter>

                  {leaderboard.slice(0, 10).map((earner, key) => {
                    return <Earner item={earner} key={key} rank={key} />
                  })}
                </PointEarners>
              </Bottom>
            </Content>
          </Wrapper>
        </Container>
      )
    } else {
      return (
        <Container>
          <Wrapper>
            <MenuBanner
              backgroundColor={'#353773'}
              icon={`menu-leaderboard-icon.svg`}
              iconBackgroundColor={'#353773'}
              iconBorderColor={'#ffffff'}
              sizeInPct="40"
              text="leaderboard"
              textColor={'#444693'}
            />
          </Wrapper>
        </Container>
      )
    }
  }
}

const Container = styled.div`
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`

const Wrapper = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  background: linear-gradient(rgba(21, 21, 21, 0.8) 20%, rgba(21, 21, 21, 0));
`

const DropDownBannerContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${props => responsiveDimension(1.4)};
  display: flex;
  flex-direction: row;
`
const BannerText = styled.div`
  margin-top: ${props => responsiveDimension(1)};
  font-size: ${props => responsiveDimension(5)};
  font-family: pamainlight;
  color: #444693;
  text-transform: uppercase;
  &:before {
    content: 'Leaderboard';
  }
`

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: ${props => responsiveDimension(5)};
  height: ${props => responsiveDimension(8.5)};
  background-color: #353773;
  margin-left: ${props => responsiveDimension(1.5)};
  position: relative;
  border-bottom-left-radius: ${props => responsiveDimension(5)};
  border-bottom-right-radius: ${props => responsiveDimension(5)};
  animation: ${props => backBanner} 0.75s forwards;
  z-index: 10;
`

const backBanner = keyframes`
  0%{height: ${responsiveDimension(1)};}
  50%{height: ${responsiveDimension(9.5)};}
  100%{height: ${props => responsiveDimension(8.5)};}
`

const Icon = styled.div`
  width: ${props => responsiveDimension(4.5)};
  height: ${props => responsiveDimension(4.5)};
  border-radius: ${props => responsiveDimension(4.5)};
  background-color: #ffffff;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;

  margin-left: ${props => responsiveDimension(0.1)};
  margin-bottom: ${props => responsiveDimension(0.3)};
`

const Content = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  animation: ${props => fadeincontents} forwards 0.75s;
  opacity: 0;
`

const fadeincontents = keyframes`
  0%{opacity: 0;}
  100%{opacity: 1;}
`

const Bottom = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`

const CelebPointEarners = styled.div`
  width: 100%;
  border-bottom: ${props => responsiveDimension(0.15)} solid #414042;
`

const PointEarners = styled.div`
  width: 100%;
  ///////////////background-color: #353773;

  background: linear-gradient(#2d2f62, rgba(11, 11, 23, 1));
`

const EarnerHeader = styled.div`
  width: 100%;
  height: ${props => responsiveDimension(6.5)};
  background: ${props => props.bgcolor || 'transparent'};

  font-family: pamainregular;
  font-size: ${props => responsiveDimension(3)};
  color: #ffffff;
  letter-spacing: ${props => responsiveDimension(0.1)};
  display: flex;
  align-items: center;
  padding-left: 5%;
`

const EarnerOuter = styled.div`
  width: 100%;
  background: ${props => props.bgcolor || 'transparent'};
`
