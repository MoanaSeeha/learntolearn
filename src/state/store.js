import { createStore, configureStore, applyMiddleware, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reduxBatch } from '@manaflair/redux-batch'
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import networkNameSlice from '../state/networkNameSlice'
import chainIdSlice from '../state/chainIdSlice'
import chainIdHexSlice from '../state/chainIdHexSlice'
import learnTokenSlice from "../state/learnTokenSlice"
import ltsTokenSlice from "../state/tokens/ltsTokenSlice"
import ethTokenSlice from "../state/ethTokenSlice"
import unclaimedLearnSlice from "../state/tokens/unclaimedLearnSlice"
import mainAddressSlice  from "../state/mainAddressSlice"
import claimingSlice  from "../state/claimingSlice"
import transactionUrlSlice from "../state/transactionUrlSlice"
import networkModalSlice from "../state/networkModalSlice"
import activitySlice from "../state/activity/activitySlice"
import genericModalSlice from "../state/genericModalSlice"
import fullModalSlice from "../state/fullModalSlice"
import nftBuyListSlice from "../state/nftBuyListSlice"
import nftHashSlice from "../state/nftHashSlice"
import contractSlice from "../state/nft/contractSlice"
import contractNFTSlice from "../state/nft/contractNFTSlice"
import userDataSlice from "../state/user/userDataSlice"
import attentionSlice from "./user/attentionSlice";

const preloadedState = {
  // network_modal: "show",
  attention_span: 24,
  full_modal:{
    network_modal: "",
    praise: "",
    points: "",
    network_name: "",
  },
  generic_modal: {
    error: 0,
    title: "",
    message: "",
    show: 0,
    btn_text: "",
    btn_action: "",
    loader: "",
    close: true,
  },
  user_data: {
    initData: {},
    data: [],
    email: "",
    password: "",
    address: "Wallet address",
    errors: {}
  }
}

export default configureStore({
  reducer: {
    chain_id: chainIdSlice,
    chain_id_hex: chainIdHexSlice,
    network_name: networkNameSlice,
    learn_token_amount: learnTokenSlice,
    lts_token_amount: ltsTokenSlice,
    eth_token_amount: ethTokenSlice,
    unclaimed_learn_amount: unclaimedLearnSlice,
    main_address: mainAddressSlice,
    claiming: claimingSlice,
    transaction_url: transactionUrlSlice,
    network_modal: networkModalSlice,
    list_activities: activitySlice,
    generic_modal: genericModalSlice,
    full_modal: fullModalSlice,
    nft_buy_list: nftBuyListSlice,
    nft_hash_list: nftHashSlice,
    contract_test: contractSlice,
    contract_nfttest: contractNFTSlice,
    user_data: userDataSlice,
    attention_span: attentionSlice
  },
  rootReducer:applyMiddleware(thunk),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})



// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );