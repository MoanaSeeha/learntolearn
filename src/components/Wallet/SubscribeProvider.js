// TODO: not used, but should be general file for connecting
import {update_chain_id} from "../../state/chainIdSlice";
import {update_network_name} from "../../state/networkNameSlice";
import {update_network_modal} from "../../state/networkModalSlice";
import {update_chain_id_hex} from "../../state/chainIdHexSlice";
import CheckNetwork from "../Moralis/CheckNetwork";
import GetNetworkInfo from "./GetNetworkInfo"


const SubscribeProvider = async (provider, dispatch) => {
  // Error calling subscribeProvider - Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:x
  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()

  if (!provider.on) {
    return;
  }
  // provider.on("close", () => this.resetgetWeb3Provider());
  provider.on("accountsChanged", async (accounts) => {
    console.log("inside accountsChanged");
    console.log("process.env", process.env);
  });

  // CHAIN ID CHANGE NOT NEEDED
  // provider.on("chainChanged", async (chainId) => {
  //   console.log("Subscribe Provider: chainChanged", chainId);
  //   dispatch(update_chain_id(chainId));
  //
  //   // will need to figure out network name from chain id
  //   switch (chainId.toString()) {
  //     case '0x4':
  //     case "4":
  //       dispatch(update_network_modal("hide"));
  //       dispatch(update_network_name('rinkeby', 'rinkeby'));
  //       break;
  //     case '1':
  //     case '0x1':
  //       dispatch(update_network_modal("show"));
  //       dispatch(update_network_name('main',"main"));
  //       break;
  //     case '42': // kovan
  //     case '0x2a':
  //       dispatch(update_network_modal("show"));
  //       dispatch(update_network_name('kovan',"kovan"));
  //       break;
  //     case '3': // ropsten
  //     case '0x3':
  //       dispatch(update_network_modal("show"));
  //       dispatch(update_network_name('ropsten',"ropsten"));
  //       break;
  //     case '80001': // matic mumbai
  //     case '0x13881': // matic mumbai
  //       dispatch(update_network_modal("show"));
  //       dispatch(update_network_name('maticmum',"maticmum"));
  //       break;
  //     case '137': // matic main
  //     case '0x89': // matic main
  //       dispatch(update_network_modal("show"));
  //       dispatch(update_network_name('matic',"matic"));
  //       break;
  //     case '5': // goerli
  //     case '0x5':
  //       dispatch(update_network_modal("show"));
  //       dispatch(update_network_name('goerli',"goerli"));
  //       break;
  //     default:
  //       dispatch(update_network_modal("show"));
  //       console.log(`Sorry, we are out of ${chainId}.`);
  //   }
  // });

  /**
   * NOt even sure when this is fired, chain ID fires a lot
   */
  provider.on("networkChanged", async (networkId) => {

    dispatch(update_chain_id(networkId.toString()));

    let current_chain = process.env.CURRENT_CHAIN

    GetNetworkInfo(provider, dispatch, networkId)
    // TODO: change to polygon and update state for prices IF on right network
    // /Users/amirmeshkin/_code/_blockchain/learntoearn/src/components/Wallet/MoralisConnect.js
    // replace with this


  });
};

export default SubscribeProvider;