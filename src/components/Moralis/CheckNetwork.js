import {update_chain_id} from "../../state/chainIdSlice";
import {update_network_modal} from "../../state/networkModalSlice";
import {update_network_name} from "../../state/networkNameSlice";

// NOT SURE WHERE THIS IS STILL BEING USED
const CheckNetwork = async (chainId, dispatch) => {

  //Moralis.getNetwork()

  dispatch(update_chain_id(chainId.toString()));
  // "maticmum"  matic mumbai
  switch (chainId.toString()) {
    case "1":

      dispatch(update_network_modal("show"));
      dispatch(update_network_name('main',"main"));
    case "80001":
      console.log('MATIC MUMBAI');
      dispatch(update_chain_id("0x13881"));
      dispatch(update_network_modal("hide"));
      dispatch(update_network_name('maticmum',"maticmum"));
      break;
    case "4":
      dispatch(update_chain_id("0x4"));
      dispatch(update_network_modal("hide"));
      dispatch(update_network_name('rinkeby',"rinkeby"));
      break;
    default:
      console.log(`DEFAULT CheckNetwork`);
      console.log("chainId ", chainId);
  }
  return chainId;

}

export default CheckNetwork