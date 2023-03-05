import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import { magicEthereum } from "../magic";
import companyLogo from './sb.png';

export default function SendTransaction({ web3, network, publicAddress, fetchBalance }) {
  const [toAddress, setToAddress] = useState('');
  let [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txnHash, setTxnHash] = useState();

  const sendTxBtnRef = useRef();

  const checker = async () => {
    console.log("Reached checker atleast")
    if (amount >= Number(window.bal)) {
      alert("Might want to put some money in pal!")
    }
    else {
      sendTransaction()
    }
  }

  const sendTransaction = async () => {
    let aamount = parseFloat(amount) / 0.92;
    amount = aamount.toString();

    let timerInterval;
    console.log("clicked");
    Swal.fire({
      title: 'This will not take long',
      html: 'Sending your sweet cash.',
      timer: 15000,
      timerProgressBar: false,
      imageUrl: 'https://media.tenor.com/IEtIGKsz-KUAAAAC/money-cash.gif',
      imageWidth: 300,
      imageHeight: 200,
      didOpen: () => {
        Swal.showLoading()


      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
        enableForm()
      }
    })





    const receipt = await web3.eth.sendTransaction({
      from: publicAddress,
      to: toAddress,
      value: web3.utils.toWei(amount)
    });
    console.log("lol hope it stays")

    setTxnHash(receipt.transactionHash);
    enableForm()
  }

  const buyCoffee = async () => {

    const receipt = await web3.eth.sendTransaction({
      from: publicAddress,
      to: '0x46dc01312acd74d1b3f6fd83ef3a00bc4412c9cb',
      value: web3.utils.toWei('0.1')
    });
    setTxnHash(receipt.on("transactionHash", (hash) => {
      console.log("Transaction hash:", hash);
      alert("Hello! I am an alert box!");
    }));
    enableForm()
  }


  // Disable input form while the transaction is being confirmed
  const disableForm = () => {
    setTxnHash();
    setDisabled(true);
    sendTxBtnRef.current.innerText = 'Submitted...';
  }

  // Re-enable input form once the transaction is confirmed
  const enableForm = () => {
    setDisabled(false);
    setToAddress('');
    setAmount('');
    fetchBalance(publicAddress);
    sendTxBtnRef.current.innerText = 'Send Transaction';
  }


  return (
    <div className="containerSend">
      <h1>Wallet ID</h1>
      <div className="infobalancer">{window.lol}</div>
      <br></br>
      <input type="text" disabled={disabled} value={toAddress} onChange={(e) => setToAddress(e.target.value)} className="full-width" placeholder="To Address" />
      <input type="text" disabled={disabled} value={amount} onChange={(e) => setAmount(e.target.value)} className="full-width" placeholder="Amount" />

      <button disabled={disabled} ref={sendTxBtnRef} onClick={checker}>Send Transaction</button>
      <br></br>
      <br></br>

      <div>
        <div>
          <img src="https://media.tenor.com/BFTKJDgOwP0AAAAC/bitcoin-cheers.gif" alt="this slowpoke moves" width="150" />
        </div>
        <div>

          <a href="https://garagesale-new.buibui69.repl.co/"><h1>Baibhav's Garage Sale<br></br> [[NOT MADE YET]]</h1></a>
        </div>
      </div>
      {
        txnHash &&
        <div className="info">
          <a href={network === "ethereum" ? `https://goerli.etherscan.io/tx/${txnHash}` : `https://mumbai.polygonscan.com/address/0x46dc01312acd74d1b3f6fd83ef3a00bc4412c9cb`} target="_blank">
            <h2>Nice, you just transacted, let's see if you won!</h2>
          </a>
        </div>
      }
      <p id="price" value='0'></p>
      <br></br>
      <div><a href="https://faucet.matic.network/" target="_blank">Get Test MATIC</a></div>
    </div >
  )
}