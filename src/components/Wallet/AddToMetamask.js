import detectEthereumProvider from "@metamask/detect-provider";


const AddtoMetamask = async (tokenAddress, tokenSymbol, tokenDecimals, tokenImage) => {
  const provider = await detectEthereumProvider()
  console.log("detecting provider",provider )
  provider.sendAsync({
    method: 'metamask_watchAsset',
    params: {
      "type": "ERC20",
      "options": {
        "address": tokenAddress,
        "symbol": tokenSymbol,
        "decimals": tokenDecimals,
        "image": tokenImage,
      },
    },
    id: Math.round(Math.random() * 100000),
  }, (err, added) => {
    console.log('provider returned', err, added)
    if (err || 'error' in added) {
      // this.setState({
      //   errorMessage: 'There was a problem adding the token.',
      //   message: '',
      // })
      console.log("error", err);
      return
    }
    else {
      console.log("added", added);
    }
    // alert("Added LEARN Token to metamask!")
    // this.setState({
    //   message: 'Token added!',
    //   errorMessage: '',
    // })
  })
}

export default AddtoMetamask