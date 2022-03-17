import {update_network_modal} from "../../state/networkModalSlice";
import {update_network_name} from "../../state/networkNameSlice";
import {update_chain_id_hex} from "../../state/chainIdHexSlice";
import {update_chain_id} from "../../state/chainIdSlice";

const GetNetworkInfo = async (provider, dispatch, networkId) => {

  switch (networkId.toString()) {
    case "1":
    case "0x1":
      dispatch(update_network_modal("show"));
      dispatch(update_network_name('main',"main"));
      dispatch(update_chain_id_hex("0x1"));
      break;
    case "0x13881": // current_chain cannot be used since hard coding network names
    case "80001":
      console.log('MATIC MUMBAI');
      dispatch(update_network_modal("hide"));
      dispatch(update_network_name('maticmum',"maticmum"));
      dispatch(update_chain_id_hex("0x13881"));
      break;
    case "137":
      console.log('MATIC');
      dispatch(update_network_modal("show"));
      dispatch(update_network_name('matic',"matic"));
      dispatch(update_chain_id_hex("137"));
      break;
    case "2":
    case "42":
    case '0x2a':
      dispatch(update_network_modal("show"));
      dispatch(update_network_name('kovan',"kovan"));
      dispatch(update_chain_id_hex("0x2a"));
      break;
    case "3":
    case '0x3':
      dispatch(update_network_modal("show"));
      dispatch(update_network_name('ropsten',"ropsten"));
      dispatch(update_chain_id_hex("0x3"));
      break;
    case "4":
    case "0x4":
      dispatch(update_chain_id_hex("0x4"));
      dispatch(update_network_modal("show"));
      dispatch(update_network_name('rinkeby',"rinkeby"));
      break;
    case "5":
    case "0x5":
      dispatch(update_chain_id("0x5"));
      dispatch(update_network_modal("show"));
      dispatch(update_network_name('goerli',"goerli"));
      break;
    case "56":
    case "0x56":
      dispatch(update_chain_id("0x5"));
      dispatch(update_network_modal("show"));
      dispatch(update_network_name('binance',"binance"));
      break;
    default:
      dispatch(update_chain_id(networkId));
      console.log(`DEFAULT NETWORKID`, networkId);
  }
}


export default GetNetworkInfo