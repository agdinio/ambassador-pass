import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { extendObservable } from 'mobx'
import { TweenMax } from 'gsap'
import FieldDecorator from '@/Components/Signup/FieldDecorator'
import BeginButton from '@/Components/Button'
import { vhToPx, validEmail } from '@/utils'

@inject('AuthStore', 'ProfileStore')
@observer
export default class LoginFirst extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      valid: undefined,
      isAuthenticating: false,
      textAttr: {},
      formInputAttr: {},
    })

    this.props.AuthStore.resetValues()
  }

  handleEmailChange(e) {
    this.props.AuthStore.setEmail(e.target.value)
    this.valid = undefined
  }

  handleEnterKey(e) {
    if (e.which === 13 || e.keyCode === 13) {
      this.login()
    }
  }

  handleButtonClick() {
    this.login()
  }

  login() {
    debugger
    this.isAuthenticating = true
    this.props.AuthStore.login()
      .then(d => {
        debugger
        this.valid = true
        this.props.ProfileStore.profile = d
        this.props.handleIsLoggedIn(true)
      })
      .catch(e => {
        this.error = e
      })
  }

  componentWillMount() {
    this.textAttr['fontSize'] = vhToPx(6)

    this.formInputAttr['borderRadius'] = vhToPx(0.5)
    this.formInputAttr['height'] = vhToPx(7)
    this.formInputAttr['marginBottom'] = vhToPx(1.5)
    this.formInputAttr['fontSize'] = vhToPx(3)
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <Section>
            <TextWrapper>
              <Text
                font={'pamainlight'}
                size={6}
                color={'white'}
                attr={this.textAttr}
              >
                log-in with your&nbsp;
              </Text>
              <Text
                font={'pamainbold'}
                size={6}
                color={'#17c5ff'}
                attr={this.textAttr}
              >
                e-mail
              </Text>
            </TextWrapper>
          </Section>
          <Section>
            <FormWrapper
              onSubmit={e => {
                e.preventDefault()
              }}
            >
              <FormFieldSet attr={this.formInputAttr}>
                <FormInput
                  onChange={this.handleEmailChange.bind(this)}
                  onKeyPress={this.handleEnterKey.bind(this)}
                  valid={this.valid}
                  value={this.props.AuthStore.values.email}
                  type="text"
                  placeholder="E-MAIL"
                  readOnly={this.isAuthenticating ? true : false}
                  attr={this.formInputAttr}
                />
                <FieldDecorator valid={this.valid} />
              </FormFieldSet>

              <Errors>{this.error}</Errors>
              <ButtonWrapper>
                <BeginButton
                  text="BEGIN"
                  height={10}
                  handleButtonClick={this.handleButtonClick.bind(this)}
                  disabled={
                    !validEmail(this.props.AuthStore.values.email) ||
                    this.isAuthenticating
                  }
                  padding={{ top: 0.8, bottom: 0.8, left: 6, right: 6 }}
                  arrowSize={3.5}
                />
              </ButtonWrapper>
            </FormWrapper>
          </Section>
        </Wrapper>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  z-index: 100;
`

const Wrapper = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const TextWrapper = styled.div`
  text-align: center;
`
const Text = styled.span`
  font-family: ${props => props.font || 'pamainlight'};
  font-size: ${props => props.attr.fontSize};
  color: ${props => props.color || '#ffffff'};
  text-transform: uppercase;
`

const FormWrapper = styled.form`
  position: relative;
  margin-bottom: 15%;
  width: inherit;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

const FormFieldSet = styled.fieldset`
  width: 70%;
  border-radius: ${props => props.attr.borderRadius};
  border: none;
  height: ${props => props.attr.height};
  position: relative;
`

const FormInput = styled.input`
  ${props =>
    props.valid === undefined
      ? 'color: black;'
      : `color:#${props.valid ? '2fc12f' : 'ed1c24'};`} font-family: pamainbold;
  width: 100%;
  margin-bottom: ${props => props.attr.marginBottom};
  height: ${props => props.attr.height};
  text-align: center;
  border-radius: ${props => props.attr.borderRadius};
  border: none;
  outline: none;
  font-size: ${props => props.attr.fontSize};
  text-transform: uppercase;
`

const Errors = styled.div`
  width: 100%;
  margin-top: 2%;
  font-family: pamainbold;
  font-size: ${props => vhToPx(1.75)};
  color: #ed1c24;
  text-align: center;
  text-transform: uppercase;
`
const ButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  margin-top: 5%;
`
