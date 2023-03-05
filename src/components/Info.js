import React, { useCallback } from "react";
import { useHistory } from "react-router";

export default function Info({ user, magic, handleChangeNetwork, balance }) {
  window.lol = user.publicAddress;
  window.bal = balance;
  let matic = 0;
  const history = useHistory();

  const getBtcData = async () => {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
      .then(response => response.json())
      .then(data => {

        document.getElementById("price").value = data.USD;
      });
  }
  getBtcData()
  matic = document.getElementById("price");
  console.log("lol" + matic)
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      history.push("/login");
    })
  }, [history]);

  return (
    <>
      <div className="container1">




        <h1>Available Balance</h1>
        <div id="balance" className="info"><h2>{((balance * 0.81).toString().substring(0, 6))} {magic.network === 'matic' ? 'USD' : 'MATIC'}</h2></div>
        <div className="info" >
          <select className="infobalance" name="network" onChange={(e) => handleChangeNetwork(e)}>

            <option value="matic">Matic Main(Real money)</option>
            <option value="ethereum">Matic Testnet(Not real money)</option>

          </select>
        </div >






      </div>

    </>
  )
}