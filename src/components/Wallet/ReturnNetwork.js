import {update_network_modal} from "../../state/networkModalSlice";

import { useDispatch } from "react-redux";

const ReturnNetwork = async (network_name, dispatch) => {
  //const dispatch = useDispatch()

  switch (network_name) {
    case process.env.CURRENT_NETWORK: // if matches current network, then proceed
      console.log('Matches current network');
      dispatch(update_network_modal("hide"));
      break
    case "main": // TODO: for now, give a warning about the wrong network, hide quiz
      console.log('This is mainnet');
      dispatch(update_network_modal("show"));
      break

    case "rinkeby": // if rinkeby chosen network then this won't hit
      dispatch(update_network_modal("hide"));
      console.log('387:  rinkeby')

      break
    default:
      dispatch(update_network_modal("show"));
      console.log('This is an unknown network.')
  }


}

export default ReturnNetwork;