import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useDispatch, useSelector} from "react-redux"

/**
 * If the network is not RINKEBY, then show modal
 * @param state
 * @param praise
 * @param points
 * @param network_name
 * @returns {JSX.Element}
 * @constructor
 */
const ModalTestnet = ({ full_modal: { network_modal, praise, points, network_name } }) => {

  const networkNameState = useSelector((state) => state.network_name.value)

  // console.log("ModalTestnet network_name", process.env.CURRENT_CHAIN);
  // console.log(" process.env.CURRENT_CHAIN", process.env.CURRENT_CHAIN);

  let current_chain = process.env.CURRENT_CHAIN
  let current_title = process.env.CURRENT_CHAIN_TITLE

  if(networkNameState === current_chain) {
    return (<span></span>);
  }
  else if(networkNameState !== current_chain && network_modal === 'show' && networkNameState !== '') {
    return (
      <div id="switch-testnet" className={'metamask-modal' + (network_name !== 'rinkeby' ? ' modal-enter' : '')}>
        <h2 className={`modal-h2`}>Wrong Network: {networkNameState}</h2>

        {/* TODO: get net work from env */}
        <span className={`modal-span`}>We are currently developing and testing our app and are using the <span className={"highlight"}>{current_title} Network</span>.</span>
        <span className={`modal-span`}>Follow the instructions on the page below to add {current_title} Network to Metamask.</span>

        <div className="pt-4">
          {/*<a href="#close" className="btn btn-details btn-bordered-white btn-modal-close" onClick={changeNetwork}> <FontAwesomeIcon size={`lg`} icon={["fa", "times"]} /><span className="px-1">CHANGE NETWORK</span></a>*/}
          <a href="https://docs.mobius.finance/resourses/testnet-guides-mumbai-network/connect-to-polygons-testnet" className="btn btn-details btn-bordered-white btn-modal-close" target="_blank" rel="noreferrer"> <FontAwesomeIcon size={`lg`} icon={["fa", "question"]} /><span className="px-1">INSTRUCTIONS</span></a>
        </div>

      </div>
    );
  }
  else if(networkNameState === '' && network_modal === 'show') {
    return (
      <div id="switch-testnet" className={'metamask-modal' + (network_name !== 'rinkeby' ? ' modal-enter' : '')}>
        <h2 className={`modal-h2`}>Use Metamask</h2>

        {/* TODO: get net work from env */}
        <span className={`modal-span`}>You must first log into the <span className={"highlight"}>Rinkeby Test Network</span> to take a test.</span>
        <span className={`modal-span`}>Follow the instructions on the page below to add {current_title} to Metamask.</span>

        <div className="pt-4">
          {/*<a href="#close" className="btn btn-details btn-bordered-white btn-modal-close" onClick={changeNetwork}> <FontAwesomeIcon size={`lg`} icon={["fa", "times"]} /><span className="px-1">CHANGE NETWORK</span></a>*/}
          <a href="https://gist.github.com/tschubotz/8047d13a2d2ac8b2a9faa3a74970c7ef" className="btn btn-details btn-bordered-white btn-modal-close" target="_blank" rel="noreferrer"> <FontAwesomeIcon size={`lg`} icon={["fa", "question"]} /><span className="px-1">INSTRUCTIONS</span></a>
        </div>

      </div>
    );
  }
  else {
    return (<span></span>);
  }


};

ModalTestnet.propTypes = {
  full_modal: PropTypes.shape({
    network_name: PropTypes.string,
    network_modal: PropTypes.string.isRequired,
    praise: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired
  })
};

export default ModalTestnet;
