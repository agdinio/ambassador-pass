import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { intercept } from 'mobx'
import { vhToPx, isEqual } from '@/utils'
import PrizeChestItem from '@/Components/PrizeChest/PrizeChestItem'
import PrizeClaimTerms from '@/Components/PrizeBoard/PrizeList/PrizeClaimTerms'

@inject('ProfileStore', 'StarBoardStore', 'NavigationStore')
export default class UserStarPrizeList extends Component {
  constructor(props) {
    super(props)
    this.userPrize = null
    this._isMounted = false

    // intercept(this.props.StarBoardStore, 'userPrize', change => {
    //   if (change.newValue) {
    //     if (!isEqual(change.newValue, this.userPrize)) {
    //       if (change.newValue.prizes && change.newValue.prizes.length > 0) {
    //         this.userPrize = change.newValue
    //         this.userPrize.prizes = [
    //           ...this.props.StarBoardStore.userPrize.prizes.filter(
    //             o => o.forRedeem
    //           ),
    //         ]
    //         this.forceUpdate()
    //
    //         console.log('NOT EXQUAL DAW E', this.userPrize)
    //       }
    //     }
    //   }
    //   return change;
    // })

    intercept(
      this.props.StarBoardStore,
      'currentSinglePrizeForRedeem',
      change => {
        if (change.newValue) {
          if (this.userPrize) {
            if (this.userPrize.prizes && this.userPrize.prizes.length > 0) {
              const exists = this.userPrize.prizes.filter(
                o =>
                  o.shortName === change.newValue.shortName &&
                  o.seasonId === change.newValue.seasonId &&
                  o.boardTypeId === change.newValue.boardTypeId
              )[0]
              if (!exists) {
                this.userPrize.prizes.push(change.newValue)
                if (this._isMounted) {
                  this.forceUpdate()
                }
              }
            } else {
              this.userPrize.prizes.push(change.newValue)
              if (this._isMounted) {
                this.forceUpdate()
              }
            }
          } else {
            this.query()
          }
        }
        return change
      }
    )
  }

  handleShowPrizeClaimTerms(item) {
    let comp = (
      <PrizeClaimTerms item={item} refHideBanner={this.props.refHideBanner} />
    )
    this.props.NavigationStore.addSubScreen(comp, 'PrizeClaimTerms')
  }

  query() {
    this.props.StarBoardStore.getStarPrizesByUser().then(res => {
      if (res) {
        this.userPrize = this.props.StarBoardStore.userPrize
        this.userPrize.prizes = [
          ...this.props.StarBoardStore.userPrize.prizes.filter(
            o => o.forRedeem
          ),
        ]
        if (this._isMounted) {
          this.forceUpdate()
        }
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this.query()
  }

  render() {
    let { userPrize } = this
    let { profile } = this.props.ProfileStore
    let { baseColor } = this.props.StarBoardStore

    if (!userPrize) {
      return <Container />
    }

    return (
      <Container>
        {/**
         * User Claim Prizes from PrizeBoard
         */
        userPrize
          ? (userPrize.prizes || []).map((item, index) => {
              const uniqueId = `${item.shortName}-${item.seasonId}-${
                item.boardTypeId
              }`

              item.awardTitle = 'get it'
              item.awardIcon = 'star-icon-white.svg'
              item.styles = {
                backgroundColor: '#231f20',
                secondaryBackgroundColor: '#ffffff',
                tertiaryBackgroundColor: '#b9aa13',
                prizeImageColor: baseColor,
                titleColor: '#b9aa13',
                subTitleColor: '#000000',
                awardBackgroundColor: '#2fc12f',
              }
              return (
                <PrizeChestItem
                  key={`${uniqueId}-${index}`}
                  item={item}
                  profile={profile}
                  isPrizeBoard={true}
                  //handleClick={this.handleShowPrizeClaimTerms.bind(this, item)}
                  refHideBanner={this.props.refHideBanner}
                />
              )
            })
          : null}
      </Container>
    )
  }
}

const Container = styled.div``
