import React, { Component } from 'react'
import styled from 'styled-components'
import { TweenMax } from 'gsap'
import { vhToPx } from '@/utils'
import { PACircle } from '@/Components/PACircle'

class ProgressIndicator extends Component {
  render() {
    return (
      <Container innerRef={this.props.reference}>
        <PACircle size={8} />
      </Container>
    )
  }
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
`

export default ProgressIndicator
