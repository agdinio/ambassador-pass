import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { vhToPx, responsiveDimension } from '@/utils'

export default class TeamIcon extends PureComponent {
  render() {
    let { teamInfo } = this.props

    return (
      <Container size={this.props.size}>
        <Outer>
          <Inner>
            <InnerTop bgColor={teamInfo.iconTopColor} />
            <InnerBottom bgColor={teamInfo.iconBottomColor} />
          </Inner>
          <InnerAbbrev abbrSize={this.props.abbrSize}>
            {teamInfo.teamName.charAt(0)}
          </InnerAbbrev>
        </Outer>
      </Container>
    )
  }
}

const Container = styled.div`
  width: ${props => responsiveDimension(props.size)};
  height: ${props => responsiveDimension(props.size)};
  min-width: ${props => responsiveDimension(props.size)};
  min-height: ${props => responsiveDimension(props.size)};
  border-radius: ${props => responsiveDimension(props.size)};
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`
const Outer = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 80%;
  overflow: hidden;
`
const Inner = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
const InnerTop = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.bgColor};
`
const InnerBottom = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.bgColor};
`
const InnerAbbrev = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  font-family: pamainbold;
  font-size: ${props => responsiveDimension(props.abbrSize)};
  text-transform: uppercase;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`

TeamIcon.propTypes = {
  teamInfo: PropTypes.object.isRequired,
}
