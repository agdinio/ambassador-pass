import { observable, action } from 'mobx'
import agent from '@/Agent'

class PurchaseTokensStore {
  @observable
  isLoading = false

  purchaseTokenImages = [
    {
      image:
        'https://www.sportocotoday.com/image/data/products/playalongnow-icon-tokens_v1.svg',
      //heightInPct: 35
      height: 11,
    },
    {
      image:
        'https://www.sportocotoday.com/image/data/products/playalongnow-icon-tokens_v2.svg',
      //heightInPct: 50
      height: 16,
    },
    {
      image:
        'https://www.sportocotoday.com/image/data/products/playalongnow-icon-tokens_v3.svg',
      //heightInPct: 50
      height: 16,
    },
    {
      image:
        'https://www.sportocotoday.com/image/data/products/playalongnow-icon-tokens_v4.svg',
      //heightInPct: 70
      height: 22,
    },
    {
      image:
        'https://www.sportocotoday.com/image/data/products/playalongnow-icon-tokens_v5.svg',
      //heightInPct: 90
      height: 20,
    },
  ]

  @observable
  values = []

  valuesxx = [
    {
      qty: 100,
      bonus: 10,
      amount: 0.99,
    },
    {
      qty: 500,
      bonus: 20,
      amount: 1.99,
    },
    {
      qty: 2000,
      bonus: 100,
      amount: 5.99,
    },
    {
      qty: 6000,
      bonus: 300,
      amount: 10.99,
    },
    {
      qty: 10000,
      bonus: 800,
      amount: 45.99,
    },
  ]

  tokenProducts = [
      {
        "productId":1548,
        "name":"100 Tokens +10 Bonus Tokens",
        "model":"token110",
        "bonusTokens":10,
        "points":110,
        "currency":"tokens",
        "tokens":100,
        "price":0.99
      },
      {
        "productId":1549,
        "name":"500 Tokens +20 Bonus Tokens",
        "model":"token520",
        "bonusTokens":20,
        "points":520,
        "currency":"tokens",
        "tokens":500,
        "price":1.99
      },
      {
        "productId":1550,
        "name":"2000 Tokens +100 Bonus Tokens",
        "model":"token2100",
        "bonusTokens":100,
        "points":2100,
        "currency":"tokens",
        "tokens":2000,
        "price":5.99
      },
      {
        "productId":1551,
        "name":"6000 Tokens +300 Bonus Tokens",
        "model":"token6300",
        "bonusTokens":300,
        "points":6300,
        "currency":"tokens",
        "tokens":6000,
        "price":10.99
      },
      {
        "productId":1552,
        "name":"10000 Tokens +800 Bonus Tokens",
        "model":"token10800",
        "bonusTokens":800,
        "points":10800,
        "currency":"tokens",
        "tokens":10000,
        "price":45.99
      }
    ]

  @action
  getData(args) {
    this.isLoading = true
    return new Promise(resolve => {
      resolve(this.tokenProducts)
    }).then(data => {
      console.log(JSON.parse(JSON.stringify(data)), args)
      data.sort((a, b) => a.tokens - b.tokens)
      for (let i = 0; i < data.length; i++) {
        data[i].image = this.purchaseTokenImages[i].image
        data[i].height = this.purchaseTokenImages[i].height
      }

      this.values = data
    })
      .finally(_ => {
        this.isLoading = false
      })
  }
}

export default new PurchaseTokensStore()
