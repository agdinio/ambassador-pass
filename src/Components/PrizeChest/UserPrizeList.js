import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { vhToPx } from '@/utils'
import PrizeChestItem from '@/Components/PrizeChest/PrizeChestItem'
import PrizeClaimTerms from '@/Components/PrizeBoard/PrizeList/PrizeClaimTerms'

@inject('ProfileStore', 'PrizeBoardStore', 'NavigationStore')
export default class UserPrizeList extends Component {
  constructor(props) {
    super(props)
    this.userPrize = null
  }

  handleShowPrizeClaimTerms(item) {
    let comp = (
      <PrizeClaimTerms item={item} refHideBanner={this.props.refHideBanner} />
    )
    this.props.NavigationStore.addSubScreen(comp, 'PrizeClaimTerms')
  }

  componentDidMount() {
    this.props.PrizeBoardStore.getPrizesByUser().then(res => {
      if (res === 'success') {
        this.userPrize = this.props.PrizeBoardStore.userPrize
        this.forceUpdate()
      }
    })
  }

  render() {
    let { userPrize } = this
    let { profile } = this.props.ProfileStore

    if (!userPrize) {
      return <Container />
    }

    return (
      <Container>
        {/**
         * User Claim Prizes from PrizeBoard
         */
        userPrize && userPrize.prizes
          ? userPrize.prizes.map((item, index) => {
              const uniqueId = `${item.shortName}-${item.seasonId}-${
                item.boardTypeId
              }`

              item.awardTitle = 'get it'
              item.awardIcon = 'symbol-prize_white.svg'
              item.styles = {
                backgroundColor: '#231f20',
                secondaryBackgroundColor: '#ffffff',
                tertiaryBackgroundColor: '#574263',
                prizeImageColor: '#9368aa',
                titleColor: '#9368aa',
                subTitleColor: '#000000',
                awardTitle: [{ value: 'get it' }],
                awardIcon: 'symbol-prize_white.svg',
                awardIconColor: '#ffffff',
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
