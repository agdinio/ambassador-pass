import superagent from 'superagent'
import PlayFab, { registerUser, login, checkPlayerToken } from '@/Agent/PlayFab'
import * as Server from '@/Agent/Server'
import IntroScreen from '@/Agent/IntroScreen'
import PrePick from '@/Agent/PrePick'
import Auth from '@/Agent/Auth'
import PrizeBoard from '@/Agent/PrizeBoard'
import StarBoard from '@/Agent/StarBoard'
import * as GameServer from '@/Agent/GameServer'

export default {
  Auth: Auth(PlayFab),
  PlayFab,
  Server,
  IntroScreen,
  PrePick,
  registerUser,
  login,
  checkPlayerToken,
  PrizeBoard,
  StarBoard,
  GameServer
}
