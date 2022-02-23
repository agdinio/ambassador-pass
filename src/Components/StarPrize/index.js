import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Background from '@/assets/images/playalong-default.jpg'
import { extendObservable, runInAction } from 'mobx'
import { inject, observer } from 'mobx-react'
import { TweenMax } from 'gsap'
import {
  vhToPx,
  isEqual,
  evalImage,
  loadImagesSelectedUponPageLoad,
  responsiveDimension,
} from '@/utils'
import StarIconDarkGoldBorder from '@/assets/images/star-icon-dark-gold-border.svg'
import StarIconSelected from '@/assets/images/star-icon-selected.svg'
import SmallStadiumIcon from '@/assets/images/starboard/stadium.svg'
import PolygonIcon from '@/assets/images/star-category-diamond.svg'
import { StarCircle } from '@/Components//StarBoard/StarCategory'
import { PACircle } from '@/Components/PACircle'
import StarCategoryPrizeList from '@/Components//StarBoard/StarCategoryPrizeList'
import AuthSequence from '@/Components/PrizeBoard/PrizeList/Auth'
import StarSelected from './StarSelected'

const itemPos = {
  1: [
    {
      top: -50,
      left: 0,
    },
  ],
  2: [
    {
      top: -50,
      left: 0,
    },
    {
      top: 50,
      left: 0,
    },
  ],
  3: [
    {
      top: -50,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      top: 50,
      left: 0,
    },
  ],
  4: [
    {
      top: -50,
      left: 0,
    },
    {
      top: 0,
      left: -42,
    },
    {
      top: 50,
      left: 0,
    },
    {
      top: 0,
      left: 42,
    },
  ],
}

@inject('StarBoardStore', 'PrizeBoardStore', 'ProfileStore', 'NavigationStore')
//@observer
export default class StarPrize extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      initialSelect: false,
      finalSelect: false,
    })
    //this.props.StarBoardStore.getStarCategories()
    //this.props.StarBoardStore.getStarPrizesByUser()
    //this.props.ProfileStore.getProfile()
    this.selectionWaitTime = null
    this.timeout = null
    this.timeoutStarOpacity = []
    this.state = {
      starCategories: null,
      isSelected: false,
      selectedStar: null,
    }
  }

  clearTimeoutStarOpacity() {
    if (this.timeoutStarOpacity) {
      for (let x = 0; x < this.timeoutStarOpacity.length; x++) {
        clearTimeout(this.timeoutStarOpacity[x])
      }
      this.timeoutStarOpacity = []
    }
  }

  handleStarCatClick(item) {
    if (this.selectionWaitTime) {
      clearTimeout(this.selectionWaitTime)
    }

    this.selectionWaitTime = setTimeout(() => {
      this.clearTimeoutStarOpacity()
      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      const polygon = document.getElementById('polygon')
      if (!polygon) {
        return
      }

      let { starCategories } = this.props.StarBoardStore
      const duration = 1500
      this.initialSelect = true

      for (let i = 0; i < starCategories.length; i++) {
        const uid = `${starCategories[i].id}-${starCategories[i].seasonGroup}`
        const el = document.getElementById(`starcat-${uid}`)
        if (el) {
          if (`${item.id}-${item.seasonGroup}` === uid) {
            this.setState({ isSelected: true })
            if (this[`starlabel-${uid}`]) {
              this[`starlabel-${uid}`].style.color = '#eede16'
            }
            el.style.zIndex = 10
            el.style.transition = 'all 0.4s linear'
            el.style.transform = 'scale(2.5) translate(-50%, -50%)'
            polygon.style.transition = 'all 0.4s linear'
            polygon.style.transform = 'scale(0.5)'

            if (this.refStarBucket) {
              TweenMax.to(this.refStarBucket, 0.4, { top: '52%' })
            }

            setTimeout(() => {
              let comp = (
                <StarCategoryPrizeList
                  key={`${item.id}-${item.seasonGroup}`}
                  item={item}
                  refHideBanner={this.props.refHideBanner}
                />
              )

              //SHOW SELECTED SCREEN
              if (this.refStarSelection) {
                this.refStarSelection.style.opacity = 0
                this.refStarSelection.style.zIndex = -1
              }
              if (this.refStarSelected) {
                this.refStarSelected.style.opacity = 1
                this.refStarSelected.style.zIndex = 1
              }
              this.setState({ selectedStar: item })
            }, duration)
          } else {
            el.style.zIndex = 9
            if (this[`starcircle-${uid}`]) {
              this[`starcircle-${uid}`].style.opacity = 0.5
            }

            if (this[`starlabel-${uid}`]) {
              this[`starlabel-${uid}`].style.opacity = 0
            }
            this.timeoutStarOpacity[
              this.timeoutStarOpacity.length++
            ] = setTimeout(() => {}, duration)
          }
        }
      }
    }, 1500)
  }

  handleStarCatHover(order) {
    if (!this.initialSelect) {
      this.clearTimeoutStarOpacity()
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }

    if (this.initialSelect) {
      this.handleStarCatUnHover(order)
    }

    const polygon = document.getElementById('polygon')
    if (!polygon) {
      return
    }

    let { starCategories } = this.props.StarBoardStore

    for (let i = 0; i < starCategories.length; i++) {
      const uid = `${starCategories[i].id}-${starCategories[i].seasonGroup}`

      if (order === uid) {
        const el = document.getElementById(`starcat-${uid}`)

        if (this[`starcircle-${uid}`]) {
          this[`starcircle-${uid}`].style.opacity = 1
        }
        if (this[`starlabel-${uid}`]) {
          this[`starlabel-${uid}`].style.color = '#eede16'
        }

        if (el) {
          el.style.transition = 'all 0.2s linear'
          el.style.transform = 'scale(1.2) translate(-50%, -50%)'
          polygon.style.transition = 'all 0.2s linear'
          polygon.style.transform = 'scale(0.9)'
        }

        if (this[`starcircle-selected-${uid}`]) {
          TweenMax.to(this[`starcircle-selected-${uid}`], 0.2, { opacity: 1 })
        }
      }
    }
  }

  handleStarCatUnHover(order) {
    if (!this.initialSelect) {
      this.clearTimeoutStarOpacity()
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }

    const polygon = document.getElementById('polygon')
    if (!polygon) {
      return
    }
    polygon.style.transition = 'all 0.2s linear'
    polygon.style.transform = 'scale(1)'

    let { starCategories } = this.props.StarBoardStore

    for (let i = 0; i < starCategories.length; i++) {
      const uid = `${starCategories[i].id}-${starCategories[i].seasonGroup}`
      const el = document.getElementById(`starcat-${uid}`)
      if (el) {
        if (!this.initialSelect) {
          el.style.zIndex = 9
        }
        el.style.transition = 'all 0.2s linear'
        el.style.transform = 'scale(1) translate(-50%, -50%)'
        if (this[`starcircle-${uid}`]) {
          this[`starcircle-${uid}`].style.opacity = 1
        }
        if (this[`starlabel-${uid}`]) {
          this[`starlabel-${uid}`].style.color = '#ffffff'
        }
      }

      if (this[`starcircle-selected-${uid}`]) {
        TweenMax.to(this[`starcircle-selected-${uid}`], 0.3, { opacity: 0 })
      }
    }
  }

  // loginFirst() {
  //   let comp = (
  //     <AuthSequence refGotoPrizeTermClaims={this.handleLoggedIn.bind(this)} />
  //   )
  //   this.props.NavigationStore.addSubScreen(comp, 'AuthSequence', true)
  // }

  // handleLoggedIn() {
  //   this.props.NavigationStore.removeSubScreen('AuthSequence')
  //   this.props.StarBoardStore.getStarPrizes()
  //   this.props.StarBoardStore.getStarPrizesByUser()
  //
  //   //TEMPORARY - CODE_SERVER.JS
  //   if (
  //     !this.props.StarBoardStore.userPrize &&
  //     this.props.ProfileStore.profile.currencies &&
  //     this.props.ProfileStore.profile.currencies.stars <= 0
  //   ) {
  //     runInAction(() => (this.props.ProfileStore.profile.currencies.stars = 50))
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.state.starCategories, nextState.starCategories)) {
      return true
    }

    if (!isEqual(this.state.selectedStar, nextState.selectedStar)) {
      return true
    }

    if (this.state.isSelected != nextState.isSelected) {
      return true
    }

    return false
  }

  componentDidMount() {
    this.props.StarBoardStore.getStarCategories().then(res => {
      if (res) {
        let images = []
        res.forEach(star => {
          images.push(
            require(`@/assets/images/${this.props.StarBoardStore.url}${
              star.id
            }-${star.boardImage}`)
          )
        })

        loadImagesSelectedUponPageLoad(images, next => {
          if (next) {
            if (this.refLoader) {
              this.refLoader.style.zIndex = -100
            }
            this.setState({ starCategories: res })
            this.props.StarBoardStore.getStarPrizesByUser()

            if (this.props.StarBoardStore.selectedStar) {
              this.setState({
                selectedStar: this.props.StarBoardStore.selectedStar,
              })
              if (this.refStarSelected) {
                this.refStarSelected.style.opacity = 1
                this.refStarSelected.style.zIndex = 1
              }
              if (this.refStarSelection) {
                this.refStarSelection.style.opacity = 0
                this.refStarSelection.style.zIndex = -1
              }
            }
          }
        })
      }
    })
  }

  render() {
    let { ProfileStore, StarBoardStore } = this.props
    let { profile } = ProfileStore
    let { url } = StarBoardStore
    let { starCategories, selectedStar } = this.state

    if (!this.state.starCategories) {
      return (
        <Container>
          <Loader innerRef={ref => (this.refLoader = ref)}>
            <PACircle size={8} />
          </Loader>
        </Container>
      )
    }

    return (
      <Container>
        <StarSelected
          reference={ref => (this.refStarSelected = ref)}
          selectedStar={selectedStar}
          toGameState={this.props.toGameState}
        />
        <FadeIn innerRef={ref => (this.refStarSelection = ref)}>
          <Content>
            <Section>
              <TextWrapper>
                <Text
                  font={'pamainlight'}
                  size={4.6}
                  color={'#ffffff'}
                  uppercase
                >
                  select any&nbsp;
                </Text>
                <Text
                  font={'pamainbold'}
                  size={4.6}
                  color={'#eede16'}
                  uppercase
                >
                  star category
                </Text>
              </TextWrapper>
            </Section>
            <Section
              marginTop={5}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <PolygonWrapper id={'polygon'}>
                {starCategories.map((star, idx) => {
                  const uid = `${star.id}-${star.seasonGroup}`
                  const len = starCategories.length
                  return (
                    <StarWrapper
                      key={uid}
                      top={itemPos[len][idx].top}
                      left={itemPos[len][idx].left}
                      id={`starcat-${uid}`}
                    >
                      <StarCircleWrap>
                        <StarCircle
                          reference={ref => (this[`starcircle-${uid}`] = ref)}
                          item={star}
                          image={evalImage(
                            `${url}${star.id}-${star.boardImage}`
                          )}
                          borderColor={'#a6aaad'}
                          hoverBorderColor={'#eede16'}
                          fullSized
                        />
                        <StarCircleSelected
                          innerRef={ref =>
                            (this[`starcircle-selected-${uid}`] = ref)
                          }
                          onClick={
                            this.state.isSelected
                              ? null
                              : this.handleStarCatClick.bind(this, star)
                          }
                          onMouseOver={
                            this.state.isSelected
                              ? null
                              : this.handleStarCatHover.bind(this, uid)
                          }
                          onMouseOut={
                            this.state.isSelected
                              ? null
                              : this.handleStarCatUnHover.bind(this, uid)
                          }
                        />
                      </StarCircleWrap>
                    </StarWrapper>
                  )
                })}
              </PolygonWrapper>
            </Section>
            <Section marginTop={5}>
              <TextWrapper>
                <Text
                  font={'pamainlight'}
                  size={4.6}
                  color={'#ffffff'}
                  uppercase
                >
                  get&nbsp;
                </Text>
                <Text
                  font={'pamainbold'}
                  size={4.6}
                  color={'#eede16'}
                  uppercase
                >
                  stars&nbsp;
                </Text>
                <Text
                  font={'pamainlight'}
                  size={4.6}
                  color={'#ffffff'}
                  uppercase
                >
                  in&nbsp;
                </Text>
                <Text
                  font={'pamainbold'}
                  size={4.6}
                  color={'#ec1c23'}
                  uppercase
                >
                  live events
                </Text>
              </TextWrapper>
            </Section>
            <Section>
              <TextWrapper>
                <Text
                  font={'pamainlight'}
                  size={4.7}
                  color={'#ffffff'}
                  uppercase
                >
                  view&nbsp;
                </Text>
                <Text
                  font={'pamainbold'}
                  size={4.7}
                  color={'#eede16'}
                  uppercase
                >
                  stars&nbsp;
                </Text>
                <Text
                  font={'pamainlight'}
                  size={4.7}
                  color={'#ffffff'}
                  uppercase
                >
                  in your prize chest
                </Text>
              </TextWrapper>
            </Section>
          </Content>
          <Bottom>
            <Footer>PlayAlongNow Demo 1.0v</Footer>
          </Bottom>
        </FadeIn>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
/*
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
*/
  display: flex;
  flex-direction: column;
`

const FadeIn = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  animation: ${props => fadeIn} 0.4s forwards;
`

const fadeIn = keyframes`
  0%{opacity: 0;}
  100%{opacity: 1;}
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => vhToPx(props.marginTop || 0)};
  margin-bottom: ${props => vhToPx(props.marginBottom || 0)};
`

const StarWrapper = styled.div`
  position: absolute;
  width: 48%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: ${props => props.top || 0}%;
  margin-left: ${props => props.left || 0}%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-style: preserve-3d;
  transition: all 0.2s linear;
  transform-origin: left top;
  z-index: 9;
`

const StarCircleWrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 100%;
  height: 0;
  padding-bottom: 100%;
  display: flex;
`

const StadiumWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const StarCircleSelected = styled.div`
  position: absolute;
  width: 107%;
  height: 107%;
  background-image: url(${StarIconSelected});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  opacity: 0;
`

const TextWrapper = styled.div`
  text-align: center;
`

const Text = styled.span`
  font-family: ${props => props.font || 'pamainregular'};
  font-size: ${props => responsiveDimension(props.size || 3)};
  color: ${props => props.color || '#000000'};
  line-height: ${props => props.lineHeight || 1};
  ${props => (props.uppercase ? 'text-transform: uppercase;' : '')} ${props =>
    props.italic ? 'font-style: italic;' : ''};
  ${props =>
    props.nowrap
      ? `white-space: nowrap; backface-visibility: hidden; -webkit-backface-visibility: hidden;`
      : ''};
  letter-spacing: ${props => responsiveDimension(0.1)};
`

const Content = styled.div`
  width: 100%;
  height: 95%
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Bottom = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
`

const PolygonWrapper = styled.div`
  width: 50%;
  padding-bottom: 50%;
  background-image: url(${PolygonIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: relative;
  margin-top: 15%;
  margin-bottom: 15%;
  transform-style: preserve-3d;
  transition: all 0.2s linear;
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

const Loader = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const Footer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  //bottom: 5%;
  font-size: ${props => responsiveDimension(1.5)};
  color: white;
  font-family: pamainregular;
`
