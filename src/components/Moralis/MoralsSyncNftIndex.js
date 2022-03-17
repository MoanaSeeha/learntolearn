import Moralis from "moralis";
import {ethers} from "ethers";
import React from "react";

/**
 * Get ALL NFT's for address
 * ​/{address}​/nft​/{token_address}
 * @returns {Promise<{status?: string, total?: number, page?: number, page_size?: number, result?: components["schemas"]["nftOwner"][]}>}
 * @constructor
 */
export async function MoralisGetNft() {

  let serverUrl = process.env.M_SERVER_URL
  let appId =  process.env.M_APP_ID;

  Moralis.start({ serverUrl, appId });

  let user = Moralis.User.current();
  if (!user) {
    //user = await Moralis.authenticate();

    user = await Moralis.authenticate().then(function (user) {

      console.log("Logginng user", user);


    })
    // user = await Moralis.authenticate(
    //   {
    //   provider: "walletconnect",
    //     chainId: 56
    //   }
    // )


  }
  console.log("lmoralis ogged in user:", user);

  console.log("address", user.get('ethAddress'))



  // const NODE_URL = "YOUR SPEEDY NODE URL HERE";
  // const provider = new Web3.providers.HttpProvider(NODE_URL);
  // const web3 = new Web3(provider);
  // oplygon websocket mainnet wss://speedy-nodes-nyc.moralis.io/731dd88c0bcb15d3c87c159d/polygon/mainnet/ws

  // const NODE_URL = "wss://speedy-nodes-nyc.moralis.io/731dd88c0bcb15d3c87c159d/polygon/mumbai/ws";
  const provider = new ethers.providers.WebSocketProvider(process.env.M_MUMBAI_NODE_WS);

// provider is read-only get a signer for on-chain transactions
  const signer = provider.getSigner();

  console.log("provider", provider)

  const options = { chain: 'matic', address: sessionStorage.getItem("address") };
  const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);


  console.log("polygonNFTs", polygonNFTs)

  return polygonNFTs;

  // return (
  //   <Row className="m-3 items explore-items">
  //     {tempTests.map((item, idx) => {
  //       return (
  //
  //         <TestBox key={idx} item={item} idx={idx} />
  //       );
  //     })}
  //
  //     {/*MoralisGetNft*/}
  //   </Row>
  // )
  //return polygonNFTs;

}


//export default MoralisGetNft
