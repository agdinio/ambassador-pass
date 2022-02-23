import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { extendObservable } from 'mobx'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import iconArrow from '@/assets/images/icon-arrow.svg'
import { vhToPx, responsiveDimension } from '@/utils'

@inject('PrePickStore')
@observer
export default class PrePickMsg extends Component {
  constructor(props) {
    super(props)

    extendObservable(this, {})
  }

  render() {
    let { message } = this.props

    return (
      <Container>
        <ArrowUp src={iconArrow} />
        {message.headers.length > 0 ? (
          <Header>
            {message.headers.map((item, key) => {
              return (
                <HeaderItem color={item.color} key={key}>
                  {item.value}
                  &nbsp;
                </HeaderItem>
              )
            })}
          </Header>
        ) : (
          <div />
        )}
        {message.details.length > 0 ? (
          <Detail innerRef={this.props.reference}>
            {message.details.map((item, key) => {
              return item.break ? (
                <br key={key} />
              ) : (
                <DetailItem color={item.color} key={key}>
                  {item.value}
                  &nbsp;
                </DetailItem>
              )
            })}
          </Detail>
        ) : (
          <div />
        )}
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding-top: ${props => vhToPx(6.2)};
`
const ArrowUp = styled.img`
  transform: rotate(-90deg);
  width: ${props => responsiveDimension(2.8)};
`
const Header = styled.div`
  display: inline-block;
  flex-direction: row;
  width: 100%;
  font-family: pamainlight;
  font-size: ${props => responsiveDimension(7.6)};
  overflow-wrap: break-word;
  height: ${props => responsiveDimension(6.5)};
  line-height: ${props => responsiveDimension(7.5)};
  padding-left: ${props => responsiveDimension(1)};
`
const HeaderItem = styled.span`
  text-transform: uppercase;
  color: ${props => props.color};
`
const Detail = styled.div`
  display: inline-block;
  width: 74%;
  font-family: pamainbold;
  font-size: ${props => responsiveDimension(3.7)};
  justify-content: center;
  align-items: center;
  line-height: ${props => responsiveDimension(3.7)};
  padding-top: ${props => responsiveDimension(1)};
`
const DetailItem = styled.span`
  color: ${props => props.color};
  padding-right: ${props => responsiveDimension(0.5)};
`

PrePickMsg.propTypes = {
  currentPrePick: PropTypes.number.isRequired,
  message: PropTypes.object.isRequired,
}
