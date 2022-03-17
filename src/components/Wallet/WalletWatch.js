import {update_chain_id} from "../../state/chainIdSlice";
import {update_network_name} from "../../state/networkNameSlice";
import Web3Modal from "web3modal";
import Web3 from "web3";

// TODO: index.js:43 Uncaught (in promise) TypeError: https.Agent is not a constructor

const WalletWatch = async () => {

    const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
    const tokenSymbol = 'TUT';
    const tokenDecimals = 18;
    const tokenImage = 'http://placekitten.com/200/300';


    // const web3Modal = new Web3Modal({
    //     //network: "mainnet", // optional
    //     cacheProvider: false, // optional
    //     providerOptions // required
    // });
    //
    // let hasProvider;
    // let provider;
    // let web3
    // try {
    //     provider = await web3Modal.connect()
    //     hasProvider = true;
    //     console.log("provider: ", provider)
    //     web3 = new Web3(provider);
    // } catch ( err ) {
    //     //await this.resetApp()
    //
    //     console.log("try catch on provider: ", provider)
    //     hasProvider = false;
    // }

    // // TODO: index.js:43 Uncaught (in promise) TypeError: https.Agent is not a constructor
    var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));
    try {

        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await new web3.eth.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}

export default WalletWatch;