import util from 'util'
import socketCluster from 'socketcluster-client'

let socket = null

// Used to establish connection with Ambassador Server
// hostname will need to be changed when the Server is
//    running somewhere else besides localhost
// TODO: Hardcode live connection string
const connectOptions = {
  //hostname: 'ec2-54-202-177-20.us-west-2.compute.amazonaws.com',
  //hostname: 'localhost',
  //hostname: 'ec2-35-164-175-253.us-west-2.compute.amazonaws.com',
  //update1 hostname: 'ec2-54-188-137-103.us-west-2.compute.amazonaws.com',
  hostname: '192.249.114.226',
  port: 6604,
  path: '/socketcluster',
  multiplex: false,
  // autoReconnectOptions: {
  //   initialDelay: 6000,
  //   randomness: 10000,
  //   multiplier: 1.5,
  //   maxDelay: 60000,
  // },
}

//------------------------------------------------------------------------
const debug = obj => {
  return console.log(util.inspect(obj, { depth: null }))
}

//------------------------------------------------------------------------
export const connect = () => {
  if (socket == null) {
    socket = socketCluster.create(connectOptions)

    socket.on('subscribeFail', function(channelname) {
      console.log(
        '[Server Socket] Failed to Subscibe to Channel:' + channelname
      )
    })

    socket.on('connect', status => {
      console.log('Game Socket is connected')
      // Add code here to check if authenticated
      if (status.isAuthenticated) {
        console.log('connection status:')
        debug(status)
      } else {
        console.log('client not authenticated:')
        debug(status)
      }
    })

    socket.on('close', _ => {
      console.log(`[Server Socket] Socket has closed`)
    })

    socket.on('error', _ => {
      console.log('Game Server Error')
    })
  }
}

export function send(channel, data) {
  return new Promise((resolve, reject) => {
    connect()
    console.log(`[Server Send : ${channel}]`)
    socket.emit(channel, data, response => {
      if (response) {
        if (response.success) {
          return resolve(response.response)
        } else {
          return reject(response)
        }
      }
    })
  })
}

export const activeGame = gameType => {
  // send('games.active', [gameType]).then(response => {
  //   if (response && response.length > 0) {
  //     console.log('GAMES.ACTIVE', response)
  //     initGameServer(response[0])
  //   } else {
  //     pendingGame()
  //   }
  // })
  return Promise.resolve()
}

const pendingGame = () => {
  // send('games.pending', { progress: 'Pending' }).then(response => {
  //   console.log('GAMES.PENDING', response)
  //   if (response && response.length > 0) {
  //     initGameServer(response[0])
  //   }
  // })
  return Promise.resolve()
}

// const initGameServer = data => {
//   PlayStore.setGame(data)
//
//   if (data.playStack && !data.playStack.currentPlay) {
//     PlayStore.broadcastStandby()
//   }
//
//   const gameChannelName = data.id + '.game'
//   socket.destroyChannel(gameChannelName)
//
//   const socketSubscriptions = socket.subscriptions(true)
//   let gameSubscriptionChannel
//   if (socketSubscriptions.indexOf(gameChannelName) >= 0) {
//     gameSubscriptionChannel = socket.channel(gameChannelName)
//   } else {
//     gameSubscriptionChannel = socket.subscribe(gameChannelName)
//   }
//
//   if (gameSubscriptionChannel.watchers().length <= 0) {
//     gameSubscriptionChannel.watch(data => {
//       switch (data.event) {
//         case 'games.start':
//           console.log('GAMES.START', data)
//           break
//         case 'games.startplay':
//           console.log('GAMES.STARTPLAY', data.data)
//           PlayStore.gamesStartPlay(data.data)
//           break
//         case 'games.endplay':
//           console.log('GAMES.ENDPLAY', data.data)
//           PlayStore.setGamesEndPlayId(data.data)
//           break
//         case 'plays.update':
//           console.log('PLAYS.UPDATE', data.data)
//           PlayStore.playsUpdate(data.data)
//           break
//         case 'games.update':
//           console.log('GAMES.UPDATE', data.data)
//           PlayStore.setGame(data.data)
//           break
//         case 'database.reset':
//           console.log('DATABASE.RESET', data.data)
//           PlayStore.databaseReset(true)
//           break
//       }
//     })
//   }
//
// }

export const readCountries = args => {
  return send('app.read.countries', args)
}

export const readZonesByCountry = args => {
  return send('app.read.zones.by.country', args)
}

export const readCitiesByZone = args => {
  return send('app.read.cities.by.zone', args)
}
