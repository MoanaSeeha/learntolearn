import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import LoadingSvg from "../../svg/loading.svg";
// import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import history from '../../routers/history'
import {useSelector} from "react-redux";
import {update_modal_title} from "../../state/genericModalSlice";

// const handleClose = async (props) => {
//   const [closemodal, setClosemodal] = useState(1);
//   console.log("handleClose")
//   setState({ setClosemodal: 0 })
//
// }
// const handleClose = async () => {
//
//   console.log("handleClose")
//   setState({ setClosemodal: 0 })
//
// }

const handleActivity = async () => {

  // TODO: use reacct router 6 and useNavigate, but having issues with react router 6
  console.log("handleActvity")
  //return <Redirect to='/activity'  />
  // TODO: cannot get react router version 6 to work
  history.push('/activity', {from: "AllTests"})
  window.location.href = "/activity";

}

const handleTransaction = async (trans_hash) => {

  console.log("handleTransaction")
  //window.open(process.env.BLOCK_EXPLORER + `tx/${trans_hash}`, '_blank')
  window.open(trans_hash, '_blank')

}


const switchNetwork = async () => {
  let switch_network

  // switch_network = await window.ethereum.request({
  //   method: 'wallet_switchEthereumChain',
  //   params: [{ chainId: process.env.CURRENT_CHAIN_ID_HEX }],
  // });
  try {
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: process.env.CURRENT_CHAIN_ID_HEX }]
    });


    let child1 = document.getElementById("generic-modal")
    let parent = child1.parentNode
    parent.classList.remove("show");
    let elems = document.getElementsByClassName('modal-backdrop');

    [].forEach.call(elems, function(el) {
      el.classList.remove("show");
    });

    // to make things easier, just refresh page
    location.reload();
  } catch (error) {
    let modal_desc = document.getElementById('modal-desc');
    modal_desc.innerText = error.message
  }

}

// TODO: SHOW NEEDS TO COME FROM STATE, NOT PROPS AT ALL
const GenericModalBootstrap = ({dispatch,  modal: { error, title, link, message, btn_text, btn_action, loader, close, trans_hash } }) => {
  console.log("GenericModalBootstrap")
  const [closemodal, setClosemodal] = useState(1);

  console.log('btn_action', btn_action)

  let final_message
  if(link) {
    final_message = <a href={link} target="_blank" rel="noreferrer">View Transaction</a>
  } else {
    final_message = message
  }

  console.log("link", link)

  let final_button
  // handle button
  switch (btn_action) {
    case 'handleClose':
      //final_button = <Button id="modal-button" variant="secondary" onClick={function(){setClosemodal(0)}}>{btn_text}</Button>
      final_button = <Button id="modal-button" variant="secondary" onClick={function(){
        dispatch(update_modal_title({error: 0, show: 0}));
      }
      }>{btn_text}</Button>
      console.log('handleClose');
      break;
    case 'handleTransaction':
      final_button = <Button id="modal-button" variant="secondary" onClick={() => handleTransaction(trans_hash)}>{btn_text}</Button>
      console.log('handleActivity');
      break;
    case 'handleActivity':
      final_button = <Button id="modal-button" variant="secondary" onClick={handleActivity}>{btn_text}</Button>
      console.log('handleActivity');
      break;
    case 'switchNetwork':
      final_button = <Button id="modal-button" variant="secondary" onClick={switchNetwork}>{btn_text}</Button>
      console.log('switchNetwork');
      // expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    default:

  }
  const generic_modal = useSelector((state) => state.generic_modal.value)


  console.log("generic_modal", generic_modal)

  return (
    <Modal
      id="generic-modal"
      //show={show} // TODO: MUST BE LINKED TO STATE
      show={generic_modal.show}
      onHide={function(){
        dispatch(update_modal_title({error: 0, show: 0}));
      }}
      backdrop="static"
      keyboard={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={close}>
        <Modal.Title id="modal-title">{title}</Modal.Title>
      </Modal.Header>

      {loader
        ? <div className="modal-spinner vertical-center"><img src={loader} width={70} /> </div>
        : <Modal.Body>{final_message}</Modal.Body>
      }
      {/*must be removed and put into Body*/}
      <div id="modal-desc"></div>
      {btn_text
        ? <Modal.Footer>{final_button}</Modal.Footer>
        : <></>
      }

    </Modal>
  );
};

GenericModalBootstrap.propTypes = {
  dispatch: PropTypes.func,
  modal: PropTypes.shape({
    error: PropTypes.number,
    title: PropTypes.string,
    link: PropTypes.string,
    message: PropTypes.string,
    btn_text: PropTypes.string,
    btn_action: PropTypes.string,
    loader: PropTypes.string,
    close: PropTypes.bool,
    trans_hash: PropTypes.string,
  },

  )
};

export default GenericModalBootstrap


