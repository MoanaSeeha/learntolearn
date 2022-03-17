import React from "react";
import Moralis from "moralis";
import {update_learn_token_amount} from "../../state/learnTokenSlice";
import {update_lts_token_amount} from "../../state/tokens/ltsTokenSlice";


/**
 * Get tokens for this user
 * Assume already connected and on right network
 * @param provider_data
 * @returns {Promise<{status?: string, total?: number, page?: number, page_size?: number, result?: components["schemas"]["nftOwner"][]}>}
 * @constructor
 */
export async function GetUserTokens(dispatch, provider_data) {

  // let serverUrl = process.env.M_SERVER_URL
  // let appId =  process.env.M_APP_ID;
  //
  // Moralis.start({ serverUrl, appId });
  //
  // let user = Moralis.User.current();
  // if (!user) {
  //   //user = await Moralis.authenticate();
  //
  //   user = await Moralis.authenticate(
  //
  //   ).then(function (user) {
  //     console.log("Logginng user", user);
  //
  //   })
  // }

  //console.log("GET USER TOKEN: ", provider_data)
  //const provider = new ethers.providers.WebSocketProvider(process.env.M_MUMBAI_NODE_WS);

// provider is read-only get a signer for on-chain transactions
  const signer = provider_data.provider.getSigner();
  //const address = await provider._getAddress();

  //console.log("address", provider_data.user.get('ethAddress'))// returning account two
  //console.log("sessionStorage.getItem(\"address\")", sessionStorage.getItem("address"))// returning account two

  //console.log("current network", process.env.CURRENT_CHAIN)
  //console.log("current address", address)
  const options = {
    //chain: 'matic',
    // chain: 'mumbai',
    chain: process.env.CURRENT_CHAIN,
    address: provider_data.user.get('ethAddress'),
  };

  // problem is it gets ALL tokens
  //const balance = await Moralis.Web3API.account.getNativeBalance(options);
  //const balances = await Moralis.Web3API.account.getTokenBalances(options);

  const minABI = [
    // balanceOf
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "decimals", type: "uint8" }],
      type: "function",
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const web3 = await Moralis.enableWeb3();
  //const learnAddress = "0x51c9Ed7ce93C95e10B22F19d126e3C3E3f9e9B2A";
  const learnAddress = process.env.LEARN_ADDRESS;
  const learnContract = await new web3.eth.Contract(minABI, learnAddress)
  const learnBalance = await learnContract.methods.balanceOf(provider_data.user.get('ethAddress')).call();
  let learnValue =  Moralis.Units.FromWei(learnBalance, 0)


  const ltsAddress = process.env.LTS_ADDRESS;
  const ltsContract = await new web3.eth.Contract(minABI, ltsAddress)
  const ltsBalance = await ltsContract.methods.balanceOf(provider_data.user.get('ethAddress')).call();
  let ltsValue =  Moralis.Units.FromWei(ltsBalance, 18)


  // Uncaught (in promise) Error: Error: [number-to-bn] while converting number 1e-9 to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported. Given value: "1e-9"
  var bntokens = web3.utils.toBN(ltsBalance)

  //console.log("bntokens", bntokens.toString());
  // need to pass trings
  dispatch(update_learn_token_amount(learnValue.toString()));
  dispatch(update_lts_token_amount(ltsValue.toString()));
  //dispatch(update_chain_id(chainIdDec));



  return {
    "learn":learnValue,
    "lts":ltsValue,
    // "lts":245345,
  }

  // TODO: redo contracts with metadata
  // https://forum.openzeppelin.com/t/erc20-metadata-and-erc20detailed/6200/2
  // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/token/ERC20/ERC20Detailed.sol
  /*
  [
  {
    "address": "0x95052df172b5f493bddca19ff7d32f6413cf9597",
    "name": "",
    "symbol": "",
    "decimals": ""
  }
]
   */

  // error: 'Only read functions are allowed'
  /*
  const options2 = {
    chain: process.env.CURRENT_CHAIN,
    address: "0x51c9Ed7ce93C95e10B22F19d126e3C3E3f9e9B2A",
    function_name: "balanceOf",
    abi: minABI,
    params: {owner: provider_data.user.get('ethAddress')}
  };
  const allowance = await Moralis.Web3API.native.runContractFunction(options2);
*/

  // contract does not have function
  // const options2 = {
  //   chain: process.env.CURRENT_CHAIN,
  //   //address: "0x51c9Ed7ce93C95e10B22F19d126e3C3E3f9e9B2A",
  //   address: "0xcC10FD2a46f1eE311235B5fB234928D4cEEd3947",
  //   function_name: "balanceOf",
  //   abi: minABI,
  //   params: {owner: provider_data.user.get('ethAddress')}
  // };
  //
  // const allowance = await Moralis.executeFunction(options2);
  // console.log("allowance", allowance)
  // //console.log("balance", balances)
  //
  //
  // return allowance;

}

// export default MoralisGetNftToken

/*
amount: "1"
block_number: "18178015"
block_number_minted: "18178015"
contract_type: "ERC721"
frozen: 0
is_valid: 1
metadata: "{\"minted\":0,\"name\":\"Hot Genesis Purebred\",\"description\":\"Dragon Lord is an upcoming game where you can play with multiple NFT characters such as Dragons, Witches, Wizards, Elves and Dwarves. Your NFT characters will be able to wear NFT armor and weapons. Collect this Purebred Genesis Dragon and be the first to play the  upcoming game Dragon Lord.\",\"owner_address\":\"0xe14a9c71c71d3fa96f47037fb52775d6e1cd407d\",\"primary\":{\"color_r\":\"200\",\"color_g\":\"9\",\"color_b\":\"9\",\"color_a\":\"1\",\"color\":\"#C80909\"},\"secondary\":{\"color_r\":\"135\",\"color_g\":\"39\",\"color_b\":\"39\",\"color_a\":\"1\",\"color\":\"#872727\"},\"shadow\":{\"color_r\":\"66\",\"color_g\":\"33\",\"color_b\":\"11\",\"color_a\":\"1\",\"color\":\"#42210B\"},\"custom_colors\":{\"body_color\":\"#900e88\",\"body_stroke\":\"#6914a3\",\"face_stroke\":\"#ff124b\",\"eyes_shadow\":\"#7a15ce\",\"eyes_pupil\":\"#000000\",\"eyes_outer\":\"#FFFFFF\",\"main_belly\":\"#508727\",\"legs_primary\":\"#86127c\",\"legs_secondary\":\"#6a2880\",\"tail_outer_flame\":\"#43ff00\",\"tail_inner_flame\":\"#189cff\",\"tail_flame_stroke\":\"#305C84\",\"tail_spikes\":\"#6E251D\",\"tail_primary\":\"#900e88\",\"tail_secondary\":\"#872727\",\"horns\":\"#2d00ff\",\"spikes_primary\":\"#ff6060\",\"wings_flaps\":\"#0c0000\",\"wing_bones\":\"#872727\",\"arms\":\"#900e88\",\"arm_spikes\":\"#872727\"},\"seller_fee_basis_points\":300,\"fee_recipient\":\"0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d\",\"aura\":{\"id\":\"blessed\",\"name\":\"Blessed\",\"image_uri\":\"https://via.placeholder.com/50x50\",\"sign\":\"%\",\"number\":\"5\",\"type\":\"luck\",\"turn\":\"current\",\"element\":\"\",\"icon\":\"\",\"description\":\"5% More Luck\"},\"personality\":{\"id\":\"nurturing\",\"name\":\"Nurturing\",\"image_uri\":\"https://via.placeholder.com/50x50\",\"sign\":\"+\",\"number\":\"100\",\"type\":\"heal\",\"turn\":\"current\",\"element\":\"green\",\"icon\":\"\",\"description\":\"Heal Two Targets 100 HP\"},\"body_parts\":{\"head\":{\"type\":\"hot\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"id\":\"hot_hot_head\",\"part\":\"Head\",\"name\":\"Hot Head\",\"color\":{\"primary\":\"#ff0000\",\"secondary\":\"#ffff00\",\"stroke\":\"#ffff00\"},\"image_uri\":\"https://via.placeholder.com/50x50\",\"effects1\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"damage\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Fire Damage\"},\"effects2\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"damage\",\"turn\":\"next\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Fire Damage Next Turn\"}},\"breath\":{\"type\":\"hot\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"id\":\"hot_white_death\",\"part\":\"Breath\",\"name\":\"White Death\",\"color\":{\"c1\":\"#ff0000\",\"c2\":\"#ffff00\",\"c3\":\"#ffff00\",\"fill\":\"#872727\"},\"blah\":{\"fill\":\"#872727\"},\"image_uri\":\"https://via.placeholder.com/50x50\",\"effects1\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"damage\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Fire Damage\"},\"effects2\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"damage\",\"turn\":\"next\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Fire Damage Next Turn\"}},\"horns\":{\"type\":\"hot\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"id\":\"hot_boring_horns\",\"name\":\"Boring Horns\",\"style\":\".horns_stroke{fill:none;stroke:#000;stroke-miterlimit:10}.horns_stroke2{fill:#461D1A;stroke:#401D09;stroke-miterlimit:10}.horns_outer{fill:#461D1A;stroke:#2D1306;stroke-width:4;stroke-miterlimit:10}.horns_inner{fill:#6F251D}.horns_lines{fill:none;stroke:#2D1306;stroke-width:4;stroke-miterlimit:10}\",\"color\":{\"c1\":\"#ff0000\",\"c2\":\"#ffff00\",\"c3\":\"#ffff00\"},\"image_uri\":\"https://via.placeholder.com/50x50\",\"effects1\":{\"sign\":\"+\",\"number\":\"20\",\"type\":\"strength\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Defense\"},\"effects2\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"damage\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Fire Damage to Attackers\"}},\"arms\":{\"type\":\"hot\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"id\":\"hot_spiky_arms\",\"name\":\"Spiky Arms\",\"color\":{\"c1\":\"#ff0000\",\"c2\":\"#ffff00\",\"c3\":\"#ffff00\"},\"image_uri\":\"https://via.placeholder.com/50x50\",\"effects1\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"strength\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+30 Defense\"},\"effects2\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"damage\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Damage to Attackers\"}},\"legs\":{\"type\":\"hot\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"id\":\"hot_hot_legs\",\"name\":\"Hot Legs\",\"color\":{\"c1\":\"#ff0000\",\"c2\":\"#ffff00\",\"c3\":\"#ffff00\"},\"image_uri\":\"https://via.placeholder.com/50x50\",\"effects1\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"damage\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Fire Damage\"},\"effects2\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"speed\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Speed\"}},\"tail\":{\"id\":\"hot_hot_blue_methane\",\"name\":\"Hot Blue Methane\",\"type\":\"hot\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"style\":\".tail_line_1{fill:none;stroke:#441C0D;stroke-width:6;stroke-miterlimit:10}.tail_line_2{fill:#872727;stroke:#42210B;stroke-width:5;stroke-miterlimit:10}.tail_line_3{fill:#872727;stroke:#42210B;stroke-width:5;stroke-miterlimit:10}.tail_line_4{fill:#872727;stroke:#42210B;stroke-width:5;stroke-miterlimit:10}.tail_color{fill:#000}.tail_outer{fill:#6CB2E5}.tail_outer_stroke{fill:#305C84}.tail_inner{fill:#B2D8F5}.tail_line_ridge{fill:#B13334;stroke:#441C0D;stroke-width:5;stroke-miterlimit:10}.tail_ridge_lines1{fill:#461D19}.tail_ridge_lines2{fill:#461D19}.tail_ridge_lines3{fill:#461D19}.tail_ridge_lines4{fill:#461D19}.tail_primary{fill:#6E251D}.tail_secondary{fill:#872727;stroke:#441C0D;stroke-width:11;stroke-miterlimit:10}\",\"color\":{\"primary\":\"#B2D8F5\",\"secondary\":\"#6CB2E5\",\"stroke\":\"#305C84\"},\"image_uri\":\"https://via.placeholder.com/50x50\",\"effects1\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"strength\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+20 Defense\"},\"effects2\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"damage\",\"turn\":\"next\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+20 Damage to Attackers\"}},\"wings\":{\"type\":\"hot\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"id\":\"hot_vampire_blades\",\"name\":\"Vampire Blades\",\"color\":{\"c1\":\"#000000\",\"c2\":\"#832416\",\"c3\":\"#922614\"},\"image_uri\":\"https://via.placeholder.com/50x50\",\"effects1\":{\"sign\":\"+\",\"number\":\"20\",\"type\":\"damage\",\"turn\":\"current\",\"element\":\"dark\",\"icon\":\"eye-evil\",\"icon_library\":\"fad\",\"description\":\"+20 Dark Damage\"},\"effects2\":{\"sign\":\"+\",\"number\":\"20\",\"type\":\"speed\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"running-fast\",\"icon_library\":\"fad\",\"description\":\"+20 Speed\"}},\"spikes\":{\"type\":\"hot\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"id\":\"hot_methane_blue_spikes\",\"name\":\"Red Spikes\",\"style\":\".spikes_primary{fill:#6CB2E5;stroke:#274768;stroke-width:4;stroke-miterlimit:10}\",\"color\":{\"c1\":\"#ff0000\",\"c2\":\"#ffff00\",\"c3\":\"#ffff00\"},\"image_uri\":\"https://via.placeholder.com/50x50\",\"effects1\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"strength\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Defense\"},\"effects2\":{\"sign\":\"+\",\"number\":\"10\",\"type\":\"speed\",\"turn\":\"current\",\"element\":\"fire\",\"icon\":\"fire\",\"icon_library\":\"fad\",\"description\":\"+10 Speed\"}}},\"dna\":{\"D1\":{\"head\":{\"type\":\"hot\",\"id\":\"hot_hot_head\"},\"breath\":{\"type\":\"hot\",\"id\":\"hot_white_death\"},\"horns\":{\"type\":\"hot\",\"id\":\"hot_boring_horns\"},\"arms\":{\"type\":\"hot\",\"id\":\"hot_big_arms\"},\"legs\":{\"type\":\"hot\",\"id\":\"hot_tree_trunks\"},\"tail\":{\"type\":\"hot\",\"id\":\"hot_hot_blue_methane\"},\"wings\":{\"type\":\"hot\",\"id\":\"hot_glowing_red\"},\"spikes\":{\"type\":\"hot\",\"id\":\"hot_methane_blue_spikes\"}},\"R1\":{\"head\":{\"type\":\"hot\",\"id\":\"hot_hot_head\"},\"breath\":{\"type\":\"hot\",\"id\":\"hot_white_death\"},\"horns\":{\"type\":\"hot\",\"id\":\"hot_boring_horns\"},\"arms\":{\"type\":\"hot\",\"id\":\"hot_big_arms\"},\"legs\":{\"type\":\"hot\",\"id\":\"hot_tree_trunks\"},\"tail\":{\"type\":\"hot\",\"id\":\"hot_hot_blue_methane\"},\"wings\":{\"type\":\"hot\",\"id\":\"hot_glowing_red\"},\"spikes\":{\"type\":\"hot\",\"id\":\"hot_methane_blue_spikes\"}},\"R2\":{\"head\":{\"type\":\"hot\",\"id\":\"hot_hot_head\"},\"breath\":{\"type\":\"hot\",\"id\":\"hot_white_death\"},\"horns\":{\"type\":\"hot\",\"id\":\"hot_boring_horns\"},\"arms\":{\"type\":\"hot\",\"id\":\"hot_big_arms\"},\"legs\":{\"type\":\"hot\",\"id\":\"hot_tree_trunks\"},\"tail\":{\"type\":\"hot\",\"id\":\"hot_hot_blue_methane\"},\"wings\":{\"type\":\"hot\",\"id\":\"hot_glowing_red\"},\"spikes\":{\"type\":\"hot\",\"id\":\"hot_methane_blue_spikes\"}}},\"svg\":{},\"stats\":{\"power\":130,\"strength\":110,\"range\":100,\"speed\":130},\"type\":{\"name\":\"Speedster\",\"icon\":\"running\",\"image\":\"/assets/svg/speed.svg\",\"slug\":\"speed\"},\"breeding\":{\"bred\":0,\"bred_max\":10,\"parents\":{\"dragon_mom\":{\"birthday\":0},\"dragon_dad\":{\"birthday\":0}},\"purebred\":\"hot\",\"pureness\":100,\"origin_type\":\"Genesis\",\"gender\":\"male\"},\"attributes\":[{\"trait_type\":\"birthday\",\"value\":1629420180140,\"display_type\":\"date\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Genesis Defense\",\"value\":10,\"display_type\":\"boost_percentage\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Powerful Breath\",\"value\":3,\"display_type\":\"boost_percentage\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Purebred Damage\",\"value\":10,\"display_type\":\"boost_percentage\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Power\",\"value\":130,\"display_type\":\"number\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Strength\",\"value\":110,\"display_type\":\"number\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Speed\",\"value\":130,\"display_type\":\"number\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Range\",\"value\":100,\"display_type\":\"number\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Health\",\"value\":420,\"display_type\":\"number\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Blessed\",\"value\":\"5% More Luck\",\"max_value\":null,\"trait_count\":0,\"order\":null},{\"trait_type\":\"Nurturing\",\"value\":\"Heal Two Targets 100 HP\",\"max_value\":null,\"trait_count\":0,\"order\":null}],\"birthday\":\"1629420180140\",\"image\":\"ipfs://QmeUNtajYbQdN85MZVUPZPZm5nSiDZmWEjZxSGb4EiJkgH\"}"
name: "DragonLordNFT"
owner_of: "0xe14a9c71c71d3fa96f47037fb52775d6e1cd407d"
symbol: "DRAGON"
synced_at: "2021-11-23T23:06:07.706Z"
syncing: 2
token_address: "0xbdb2127b89225875cd7a579911a0d4d6f70f89ae"
token_id: "8"
token_uri: "https://ipfs.io/ipfs/QmUyDx8aeqZLHakGUPqsFdPmFEJtd81WEgg9qAVcFN27Lh/1629420180140.json"
 */