



const customNodeOptions = {
  rpcUrl: 'https://polygon-rpc.com/', // Polygon RPC URL
  chainId: 137, // Polygon chain id
}

var script = document.createElement('script');
script.type = 'text/javascript';

script.src = 'https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.2.5-rc.0/dist/web3.min.js';
document.body.appendChild(script);
let magic = new Magic("pk_live_DCA4B5A129A2DD07", { network: customNodeOptions });
/* Initialize Web3 */
let web3 = new Web3(magic.rpcProvider);
export let sendTransactionz = async () => {
  script
  const fromAddress = "0x773b649ae1a4f7bfabcdc156f008e176e967a321";
  const destination = "0x46dc01312acd74d1b3f6fd83ef3a00bc4412c9cb";
  const amount = web3.utils.toWei("1");

  // try {
  //   const { transactionHash } = await web3.eth.sendTransaction({
  //     from: fromAddress,
  //     to: destination,
  //     value: amount
  //   });
  //   console.log(transactionHash);
  // } catch (err) {
  //   console.log("sendTransaction error:");
  //   console.log(err);
  // }
  // web3.eth
  //   .sendTransaction(JSON.parse(input))
  //   .then(console.log)
  //   .catch((err) => {
  //     console.log("sendTransaction error:");
  //     console.log(err);
  //   });

  web3.eth
    .sendTransaction({
      from: fromAddress,
      to: destination,
      value: amount
    })
    .on("transactionHash", (hash) => {
      console.log("Transaction hash:", hash);
    })
    .then((receipt) => {
      console.log("Transaction receipt:", receipt);
    })
    .catch((error) => {
      console.error(error);
    });
};