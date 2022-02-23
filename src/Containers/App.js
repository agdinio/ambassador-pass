import React, { PureComponent } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import styled from 'styled-components'
import * as util from '@/utils'
import Main from '@/Components/Main'
import { inject } from 'mobx-react'

@inject('LiveGameStore')
class App extends PureComponent {
  componentDidMount() {
    window.addEventListener('blur', () => {
      this.props.LiveGameStore.setAppOnBlur(true)
    })

    window.addEventListener('focus', () => {
      this.props.LiveGameStore.setAppOnBlur(false)
    })
  }

  render() {
    return (
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppContainer>
    )
  }
}

//@observer
export default App

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
`
