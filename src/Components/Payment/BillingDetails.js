import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import { vhToPx, responsiveDimension, evalImage, validEmail } from '@/utils'

@inject('ProfileStore', 'CommonStore')
@observer
export default class BillingDetails extends Component {
  constructor(props) {
    super(props)
    this.formInputAttr = {}
    this.formInputAttr['borderRadius'] = responsiveDimension(0.4)
    this.formInputAttr['height'] = responsiveDimension(7)
    this.formInputAttr['marginBottom'] = responsiveDimension(1.5)
    this.formInputAttr['fontSize'] = responsiveDimension(3.5)
    this.formInputAttr['emailSectionMarginTop'] = responsiveDimension(1)
    this.formInputAttr['emailSectionPaddingTop'] = responsiveDimension(1.5)
    this.formInputAttr['emailSectionPaddingBottom'] = responsiveDimension(1.5)

    this.attr = {
      headerLabel: {
        height: vhToPx(9),
        fontSize: responsiveDimension(9 * 0.4),
      },
      useShippingAddress: {
        fontSize: responsiveDimension(3),
        paddingRight: responsiveDimension(1),
        marginTop: responsiveDimension(2.5),
        marginBottom: responsiveDimension(2.5),
      },
      check: {
        width: responsiveDimension(4),
        height: responsiveDimension(4),
      },
      paymentButton: {
        width: responsiveDimension(28),
        height: responsiveDimension(9),
        borderWidth: responsiveDimension(0.4),
        borderRadius: responsiveDimension(0.4),
        beforeFontSize: responsiveDimension(9 * 0.4),
        beforeHeight: responsiveDimension(9 * 0.4 * 0.8),
        beforeLetterSpacing: responsiveDimension(0.1),
      },
    }
  }

  handleInputChange(e) {
    this.props.ProfileStore.billingAddress[e.target.name] = e.target.value
    if ('country' === e.target.name) {
      this.props.ProfileStore.billingAddress['state'] = ''
      const _country = JSON.parse(e.target.value)
      this.props.CommonStore.readZonesByCountry({
        countryId: _country.countryId,
        countryCode: _country.code,
      })
    }
    if ('state' === e.target.name) {
      this.props.ProfileStore.billingAddress['city'] = ''
      const _state = JSON.parse(e.target.value)
      this.props.CommonStore.readCitiesByZone({
        zoneId: _state.zoneId,
        countryId: _state.countryId,
      })
    }
  }

  handleInputBlur(required, e) {
    const isEmail = new RegExp('email', 'gi').test(e.target.name)

    if (required) {
      if (e.target.value.trim().length < 2) {
        e.target.style.borderStyle = 'solid'
        e.target.style.borderWidth = responsiveDimension(0.5)
        e.target.style.borderColor = '#ff0000'
      } else {
        if (isEmail) {
          if (validEmail(e.target.value)) {
            e.target.style.borderStyle = 'none'
            e.target.style.borderWidth = 0
            e.target.style.borderColor = 'transparent'
          } else {
            e.target.style.borderStyle = 'solid'
            e.target.style.borderWidth = responsiveDimension(0.5)
            e.target.style.borderColor = '#ff0000'
          }
        } else {
          e.target.style.borderStyle = 'none'
          e.target.style.borderWidth = 0
          e.target.style.borderColor = 'transparent'
        }
      }
    }
  }

  handleUseAsShipAddr(val) {
    this.props.ProfileStore.billingAddress.useAsShippingAddress = val
  }

  handlePaymentDetailsClick() {
    const errors = []
    let email = ''
    let confirmEmail = ''

    for (let key in this.props.ProfileStore.billingAddress) {
      if (this.props.ProfileStore.billingAddress.hasOwnProperty(key)) {
        if (
          !'addressline2, useasshippingaddress'.match(new RegExp(key, 'gi'))
        ) {
          const splitted = key.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1)
          let newKey = ''

          if (this.props.ProfileStore.billingAddress[key].length < 2) {
            for (let i = 0; i < splitted.length; i++) {
              newKey += ' ' + splitted[i]
            }
            errors.push(newKey)
          } else {
            const isEmail = new RegExp('email', 'gi').test(key)
            if (isEmail) {
              if (!validEmail(this.props.ProfileStore.billingAddress[key])) {
                for (let i = 0; i < splitted.length; i++) {
                  newKey += ' ' + splitted[i]
                }
                errors.push(newKey)
              } else {
                if (key.toLowerCase() === 'email') {
                  email = this.props.ProfileStore.billingAddress[key].trim()
                }
                if (key.toLowerCase() === 'confirmemail') {
                  confirmEmail = this.props.ProfileStore.billingAddress[
                    key
                  ].trim()
                }
              }
            }
          }
        }
      }
    }

    if (
      email &&
      confirmEmail &&
      email.toLowerCase() !== confirmEmail.toLowerCase()
    ) {
      errors.push('email does not match')
    }

    if (errors.length > 0) {
      this.props.error(errors)
      return
    } else {
      this.props.next('BillingDetails', 'PaymentDetails')
    }
  }

  render() {
    let { ProfileStore, CommonStore } = this.props
    return (
      <Scrolling>
        <HeaderLabel attr={this.attr.headerLabel}>
          fill out your billing address
        </HeaderLabel>
        <Form
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <FormInput
            // onChange={this.handleEmailChange.bind(this)}
            // onKeyPress={this.handleEnterKey.bind(this)}
            // valid={this.valid}
            // value={this.props.AuthStore.values.email}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="FIRST NAME*"
            // readOnly={this.isAuthenticating ? true : false}
            attr={this.formInputAttr}
            value={ProfileStore.billingAddress.firstName}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputBlur.bind(this, true)}
          />
          <FormInput
            id="lastName"
            name="lastName"
            type="text"
            placeholder="LAST NAME*"
            attr={this.formInputAttr}
            value={ProfileStore.billingAddress.lastName}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputBlur.bind(this, true)}
          />
          <FormInput
            id="phone"
            name="phone"
            type="text"
            placeholder="PHONE*"
            attr={this.formInputAttr}
            value={ProfileStore.billingAddress.phone}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputBlur.bind(this, true)}
          />
          <FormInput
            id="addressLine1"
            name="addressLine1"
            type="text"
            placeholder="ADDRESS LINE 1*"
            attr={this.formInputAttr}
            value={ProfileStore.billingAddress.addressLine1}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputBlur.bind(this, true)}
          />
          <FormInput
            id="addressLine2"
            name="addressLine2"
            type="text"
            placeholder="ADDRESS LINE 2"
            attr={this.formInputAttr}
            value={ProfileStore.billingAddress.addressLine2}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputBlur.bind(this, false)}
          />
          <DropDown
            id="country"
            name="country"
            attr={this.formInputAttr}
            value={ProfileStore.billingAddress.country}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputBlur.bind(this, true)}
          >
            <option value="" disabled defaultValue>
              COUNTRY*
            </option>
            {CommonStore.countries.map(country => {
              return (
                <option key={country.code} value={JSON.stringify(country)}>
                  {(country.name || '').toUpperCase()}
                </option>
              )
            })}
          </DropDown>
          <DropDown
            id="state"
            name="state"
            attr={this.formInputAttr}
            value={ProfileStore.billingAddress.state}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputBlur.bind(this, true)}
          >
            <option value="" disabled defaultValue>
              STATE*
            </option>
            {CommonStore.zones.map(zone => {
              return (
                <option key={zone.zoneId} value={JSON.stringify(zone)}>
                  {(zone.name || '').toUpperCase()}
                </option>
              )
            })}
          </DropDown>
          {CommonStore.cities && CommonStore.cities.length > 0 ? (
            <DropDown
              id="city"
              name="city"
              attr={this.formInputAttr}
              value={ProfileStore.billingAddress.city}
              onChange={this.handleInputChange.bind(this)}
              onBlur={this.handleInputBlur.bind(this, true)}
            >
              <option value="" disabled defaultValue>
                CITY*
              </option>
              {CommonStore.cities.map(city => {
                return (
                  <option key={city.cityId} value={city.name}>
                    {(city.name || '').toUpperCase()}
                  </option>
                )
              })}
            </DropDown>
          ) : (
            <FormInput
              id="city"
              name="city"
              type="text"
              placeholder="CITY*"
              attr={this.formInputAttr}
              value={ProfileStore.billingAddress.city}
              onChange={this.handleInputChange.bind(this)}
              onBlur={this.handleInputBlur.bind(this, true)}
            />
          )}
          <FormInput
            id="zip"
            name="zip"
            type="text"
            placeholder="ZIP*"
            attr={this.formInputAttr}
            value={ProfileStore.billingAddress.zip}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputBlur.bind(this, true)}
            noMarginBottom
          />
          <EmailSection attr={this.formInputAttr}>
            <FormInput
              id="email"
              name="email"
              type="text"
              placeholder="EMAIL*"
              attr={this.formInputAttr}
              value={ProfileStore.billingAddress.email}
              onChange={this.handleInputChange.bind(this)}
              onBlur={this.handleInputBlur.bind(this, true)}
              isEmail
            />
            <FormInput
              id="confirmEmail"
              name="confirmEmail"
              type="text"
              placeholder="CONFIRM-EMAIL*"
              attr={this.formInputAttr}
              value={ProfileStore.billingAddress.confirmEmail}
              onChange={this.handleInputChange.bind(this)}
              onBlur={this.handleInputBlur.bind(this, true)}
              isEmail
              noMarginBottom
            />
          </EmailSection>
          <Section>
            <UseShippingAddress attr={this.attr.useShippingAddress}>
              {ProfileStore.billingAddress.useAsShippingAddress ? (
                <CheckYes
                  id={`payment-button-billingdetails-use-shippingaddress`}
                  src={evalImage(`input_feld-verified-profile.svg`)}
                  onClick={this.handleUseAsShipAddr.bind(this, false)}
                  attr={this.attr.check}
                />
              ) : (
                <CheckNo
                  id={`payment-button-billingdetails-use-shippingaddress`}
                  onClick={this.handleUseAsShipAddr.bind(this, true)}
                  attr={this.attr.check}
                />
              )}
            </UseShippingAddress>
          </Section>
          <Section justifyContent="center" marginBottomInPct="7">
            <Button
              id={`payment-button-paymentdetails`}
              text="payment"
              color={'#ffffff'}
              borderColor="#ffffff"
              onClick={this.handlePaymentDetailsClick.bind(this)}
              attr={this.attr.paymentButton}
            >
              <ButtonArrow src={evalImage(`icon-arrow.svg`)} />
            </Button>
          </Section>
        </Form>
      </Scrolling>
    )
  }
}

const HeaderLabel = styled.div`
  width: 100%;
  height: ${props => props.attr.height};
  font-family: pamainlight;
  font-size: ${props => props.attr.fontSize};
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Scrolling = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  &::-webkit-scrollbar {
    width: ${props => responsiveDimension(0.1)};
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
  }
`

const Section = styled.div`
  width: 100%;
  ${props => (props.heightInPct ? `height:${props.heightInPct}%` : ``)};
  background-color: ${props => props.backgroundColor || 'transparent'};
  display: flex;
  ${props => (props.direction ? `flex-direction:${props.direction}` : ``)};
  ${props =>
    props.justifyContent ? `justify-content:${props.justifyContent};` : ``};
  ${props => (props.alignItems ? `align-items:${props.alignItems};` : ``)};
  ${props =>
    props.marginTopInPct ? `margin-top:${props.marginTopInPct}%` : ``};
  ${props =>
    props.marginBottomInPct ? `margin-bottom:${props.marginBottomInPct}%` : ``};
`

const Form = styled.form`
  position: relative;
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
      ? 'color: black'
      : `color: ${props.valid ? '#2fc12f' : '#ed1c24'}`};
  font-family: pamainregular;
  width: ${props => (props.isEmail ? 78 : 70)}%;
  height: ${props => props.attr.height};
  border-radius: ${props => props.attr.borderRadius};
  border: none;
  outline: none;
  font-size: ${props => props.attr.fontSize};
  text-transform: uppercase;
  padding-left: 5%;
  margin-bottom: ${props =>
    props.noMarginBottom ? 0 : props.attr.marginBottom};
`

const DropDown = styled.select`
  width: 70%;
  height: ${props => props.attr.height};
  border-radius: ${props => props.attr.borderRadius};
  outline: none;
  border: none;
  -webkit-appearance: none;
  margin-bottom: ${props => props.attr.marginBottom};
  background-color: #ffffff;
  font-family: pamainregular;
  font-size: ${props => props.attr.fontSize};
  color: #000000;
  padding-left: 5%;
  background-image: url(${evalImage(`icon-arrow-down-black.svg`)});
  background-repeat: no-repeat;
  background-position: 95%;
  background-size: 10%;
`

const EmailSection = styled.div`
  width: 90%
  background-color: #19c5ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.attr.emailSectionMarginTop};
  padding: ${props => props.attr.emailSectionPaddingTop} 0 ${props =>
  props.attr.emailSectionPaddingBottom} 0;
`

const UseShippingAddress = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: 'also use as a shipping address';
    font-family: pamainregular;
    font-size: ${props => props.attr.fontSize};
    color: #ffffff;
    text-transform: uppercase;
    padding-right: ${props => props.attr.paddingRight};
  }
  margin-top: ${props => props.attr.marginTop};
  margin-bottom: ${props => props.attr.marginBottom};
`

const CheckYes = styled.img`
  height: ${props => props.attr.height};
  &:hover {
    cursor: pointer;
  }
`

const CheckNo = styled.div`
  width: ${props => props.attr.width};
  height: ${props => props.attr.height};
  border-radius: 50%;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
  }
  position: relative;
`

const Button = styled.div`
  width: ${props => props.attr.width};
  height: ${props => props.attr.height};
  ${props =>
    props.borderColor
      ? `border:${props.attr.borderWidth} solid ${props.borderColor}`
      : ''};
  border-radius: ${props => props.attr.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${props =>
    props.backgroundColor ? `background-color:${props.backgroundColor}` : ''};
  &:before {
    content: '${props => props.text}';
    text-transform: uppercase;
    font-family: pamainregular;
    font-size: ${props => props.attr.beforeFontSize};
    color: ${props => props.color || '#000000'};
    line-height: 0.9;
    height: ${props => props.attr.beforeHeight};
    letter-spacing: ${props => props.attr.beforeLetterSpacing};
  }
`

const ButtonArrow = styled.img`
  height: 40%;
  margin-left: 7%;
`
