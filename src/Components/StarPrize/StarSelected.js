import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { extendObservable } from 'mobx'
import { TweenMax, TimelineMax } from 'gsap'
import { vhToPx, evalImage, responsiveDimension } from '@/utils'
import IconStarSelected from '@/assets/images/star-icon-selected.svg'
import ContinueButton from '@/Components/Button'
import SmallStadiumIcon from '@/assets/images/starboard/stadium.svg'

@inject('NavigationStore', 'StarBoardStore', 'ProfileStore')
@observer
export default class StarSelected extends Component {
  constructor(props) {
    super(props)
  }

  onClickContinue() {
    if (
      this.props.NavigationStore.location === '/prepick' ||
      this.props.NavigationStore.location === '/livegame'
    ) {
      this.props.toGameState()
    } else {
      if (this.props.selectedStar) {
        this.props.StarBoardStore.setSelectedStar(this.props.selectedStar)
        this.props.NavigationStore.setPlayThroughOnActiveMenu('/starprize')
      }

      setTimeout(() => {
        this.props.NavigationStore.setCurrentView('/livegame')
      }, 500)
    }
  }

  componentDidUpdate(nextProps) {
    debugger
    if (this.props.selectedStar) {
      if (this.refImage) {
        TweenMax.to(this.refImage, 0.75, { y: '5%' })
      }
      if (this.refSelectedStar) {
        TweenMax.to(this.refSelectedStar, 0.75, { opacity: 1 })
      }
    }
  }

  render() {
    let { selectedStar } = this.props

    let starImage = selectedStar
      ? require(`@/assets/images/${this.props.StarBoardStore.url}${
          selectedStar.id
        }-${selectedStar.boardImage}`)
      : null
    let starText = selectedStar ? selectedStar.boardName : ''
    return (
      <Container innerRef={this.props.reference}>
        <Section height={60}>
          <SubSection>
            <TextWrapper>
              <div style={{ textAlign: 'center' }}>
                <Text font={'pamainlight'} size={5.5} uppercase>
                  use your&nbsp;
                </Text>
                <Text
                  font={'pamainextrabold'}
                  size={5.5}
                  color={'#eede16'}
                  uppercase
                >
                  stars
                </Text>
              </div>
            </TextWrapper>
            <TextWrapper>
              <div style={{ textAlign: 'center' }}>
                <Text font={'pamainbold'} size={4.7} uppercase>
                  win discounts and prizes
                </Text>
              </div>
            </TextWrapper>
          </SubSection>
        </Section>

        <Section>
          <SubSection innerRef={ref => (this.refImage = ref)}>
            <ImageWrapper>
              <SelectedStar
                src={IconStarSelected}
                innerRef={ref => (this.refSelectedStar = ref)}
              />
              {/*
              <StadiumWrapper>
                <StadiumIconAndLabel>
                  <SIALInnerWrapper
                    alignItems={'flex-end'}
                    paddingBottom={1.5}
                  >
                    <StadiumIcon />
                  </SIALInnerWrapper>
                  <SIALInnerWrapper
                    alignItems={'flex-start'}
                    paddingTop={1.5}
                  >
                    <StarLabel>{''}</StarLabel>
                  </SIALInnerWrapper>
                </StadiumIconAndLabel>
              </StadiumWrapper>
*/}
              <SelectedIcon src={starImage} />
            </ImageWrapper>
            <Text
              font={'pamainlight'}
              size={8}
              color={'#eedf17'}
              uppercase
              lineheight={1.5}
            >
              {starText}
            </Text>
          </SubSection>
        </Section>

        <Section height={50}>
          <SubSection>
            <TextWrapper>
              <div style={{ textAlign: 'center' }}>
                <Text font={'pamainlight'} size={4.2} uppercase>
                  awarded during the&nbsp;
                </Text>
                <Text
                  font={'pamainbold'}
                  size={4.2}
                  color={'#ec1c23'}
                  uppercase
                >
                  live events
                </Text>
              </div>
            </TextWrapper>
          </SubSection>
        </Section>

        <Section height={50}>
          <ContinueButton
            buttonText={'CONTINUE'}
            handleButtonClick={this.onClickContinue.bind(this)}
          />
        </Section>

        <Section height={23}>
          <Footer>PlayAlongNow Demo 1.0v</Footer>
        </Section>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  opacity: 0;
  z-index: -1;
`

const ImageWrapper = styled.div`
  width: ${props => responsiveDimension(20)};
  height: ${props => responsiveDimension(20)};
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-5%);
  z-index: 11;
`

const SelectedIcon = styled.div`
  width: inherit;
  height: inherit;
  border-radius: 50%;
  border ${props => responsiveDimension(0.5)} solid #eedf17;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 12;
`

const SelectedStar = styled.div`
  width: inherit;
  height: inherit;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  opacity: 0;
  z-index: 14;
`

const Section = styled.div`
  width: 100%;
  height: ${props => props.height || `100`}%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SubSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Text = styled.span`
  font-family: ${props => props.font};
  font-size: ${props => responsiveDimension(props.size)};
  color: ${props => props.color || '#ffffff'};
  line-height: ${props => props.lineheight || 1};
  letter-spacing: ${props => responsiveDimension(0.1)};
  ${props => (props.uppercase ? `text-transform: uppercase;` : '')};
`

const Footer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  bottom: 5%;
  font-size: ${props => responsiveDimension(1.5)};
  color: white;
  font-family: pamainregular;
`

const StadiumWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  z-index: 13;

  font-size: 2em;
`

const StadiumIconAndLabel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const SIALInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: ${props => props.alignItems};
  padding-top: ${props => props.paddingTop || 0}%;
  padding-bottom: ${props => props.paddingBottom || 0}%;
`

const StadiumIcon = styled.div`
  width: 25%;
  height: 0;
  padding-bottom: 25%;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    border-radius: 50%;
    border: ${props => responsiveDimension(0.2)} solid #ffffff;
  }
  &:after {
    position: absolute;
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    background-image: url(${SmallStadiumIcon});
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
  }
`

const StarLabel = styled.span`
  font-family: pamainlight;
  font-size: ${props => responsiveDimension(4)};
  color: ${props => props.color || '#ffffff'};
  text-transform: uppercase;
  line-height: 1;
  margin-top: ${props => responsiveDimension(props.marginTop || 0)};
  margin-bottom: ${props => responsiveDimension(props.marginBottom || 0)};
  transform-style: preserve-3d;
  transition: all 0.4s linear;
`
