import React from 'react'
import ReactDOM from 'react-dom'
import promiseFinally from 'promise.prototype.finally'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from '@/Containers/App'
import AuthStore from '@/stores/AuthStore'
import CommonStore from '@/stores/CommonStore'
import UserStore from '@/stores/UserStore'
import ProfileStore from '@/stores/ProfileStore'
import IntroScreenStore from '@/stores/IntroScreenStore'
import LiveGameStore from '@/stores/LiveGameStore'
import NavigationStore from '@/stores/NavigationStore'
import PrePickStore from '@/stores/PrePickStore'
import LowerPanelStore from '@/stores/LowerPanelStore'
import PrizeBoardStore from '@/stores/PrizeBoardStore'
import ShareStatusStore from '@/stores/ShareStatusStore'
import StarBoardStore from '@/stores/StarBoardStore'
import ResolveStore from '@/stores/ResolveStore'
import PrizeChestStore from '@/stores/PrizeChestStore'
import PurchaseTokensStore from "./stores/PurchaseTokensStore";
import '@/styles/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

const stores = {
  AuthStore,
  CommonStore,
  ProfileStore,
  UserStore,
  IntroScreenStore,
  LiveGameStore,
  NavigationStore,
  PrePickStore,
  LowerPanelStore,
  PrizeBoardStore,
  ShareStatusStore,
  StarBoardStore,
  ResolveStore,
  PrizeChestStore,
  PurchaseTokensStore,
}

// needed for PWA
//import registerServiceWorker from "./registerServiceWorker";

// debugging
window._____APP_STATE_____ = stores

promiseFinally.shim()

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
