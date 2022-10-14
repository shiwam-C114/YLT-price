// import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import {
  Fetcher,
  Route,
  Trade,
  TokenAmount,
  TradeType,
} from "pancakeswap-v2-testnet-sdk";
import { useState } from "react";

export default function App() {
  const [USDTvalue, setUSDTvalue] = useState(0)
  const [YLTyouWillGet, setYLTyouWillGet] = useState(0)
  // const Moralis = useMoralis()
  // console.log(Moralis)

  const basicQuery = async () => {
    // const results = await fetch();
    // alert("Successfully retrieved " + results.length + " monsters.");
    // // Do something with the returned Moralis.Object values
    // for (let i = 0; i < results.length; i++) {
    //   const object = results[i];
    //   alert(object.id + " - " + object.get("ownerName"));
    // }
    const chainId = 97;
    const provider = new ethers.providers.JsonRpcProvider(
      "https://bsctestapi.terminet.io/rpc",
      { name: "binance", chainId: chainId }
    );

    const YLTtokenAddress = "0x8e0B7Ced8867D512C75335883805cD564c343cB9";
    const USDTtokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
    const YLT = await Fetcher.fetchTokenData(
      chainId,
      YLTtokenAddress,
      provider
    );
    const USDT = await Fetcher.fetchTokenData(
      chainId,
      USDTtokenAddress,
      provider
    );
    const pair = await Fetcher.fetchPairData(YLT, USDT, provider);
    const route = new Route([pair], USDT);
    const trade = new Trade(
      route,
      new TokenAmount(USDT, 10e17 * USDTvalue),
      TradeType.EXACT_INPUT
    );
    console.log("current approx mid price: for one USDT to YLT ", route.midPrice.toSignificant(6))
    console.log(`exchange value you will get if you trade for ${USDTvalue} USDT: `, trade.executionPrice.toSignificant(6))
    setYLTyouWillGet(trade.executionPrice.toSignificant(6))
  };

  return (
    <>
      <input onChange={(e)=>{setUSDTvalue(e.target.value)}} />
      <label > Enter amount of USDT you want to spend to get YLT token. USDT {USDTvalue} </label>
      <button onClick={basicQuery}>Get the exchange rate</button>
      <div>wait for 10 sec after pressing the button, check console for more detail.</div>
      <div>YLT you will get {YLTyouWillGet}</div>
    </>
  );
}