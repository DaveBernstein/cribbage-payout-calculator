import React, { useState, useCallback } from "react";
import "./App.css";
import PayoutGrid from "./PayoutGrid";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(20);
  const [buyIn, setBuyIn] = useState(3);
  const [cashPayout, setCashPayout] = useState(3);
  const [fund28, setFund28] = useState(8);
  const [rafflePct, setRafflePct] = useState(0.25);
  const [presetDay, setPresetDay] = useState("none");
  const [roundPayouts, setRoundPayouts] = useState(false);

  const MAX_PAYS = 12;
  const MIN_PAYS = 3;

  const handleChangeNumberOfPlayers = (event) => {
    setNumberOfPlayers(Number(event.target.valueAsNumber));
  };

  const handleChangeBuyIn = (event) => {
    setBuyIn(Number(event.target.valueAsNumber));
    setCashPayout(Number(event.target.valueAsNumber));
  };

  const handleChangeFund28 = (event) => {
    setFund28(Number(event.target.valueAsNumber));
  };

  const handleChangeRafflePct = (event) => {
    setRafflePct(Number(event.target.valueAsNumber));
  };

  const handleChangeRoundPayouts = (event) => {
    setRoundPayouts(event.target.checked);
  };

  const handleChangePresetDay = (event) => {
    setPresetDay(event.target.value);
    if (event.target.value === "friday") {
      setBuyIn(5);
      setRafflePct(0.25);
    }
    if (event.target.value === "monday") {
      setBuyIn(3);
      setRafflePct(0.2);
    }
  };

  const getNumberOfPayedPlayers = useCallback((totalPlayerCount) => {
    return Math.max(
      Math.min(Math.floor(totalPlayerCount / 4) + 1, MAX_PAYS),
      MIN_PAYS
    );
  }, []);

  const totalEntryFees = numberOfPlayers * buyIn;
  const raffleFund = Math.round(numberOfPlayers * rafflePct);
  const totalGiftCardAmount = totalEntryFees - cashPayout - raffleFund - fund28;

  return (
    <div className="App">
      <div className="main-content">
        <h1>Cribbage Payout Calculator</h1>
        <div className="inputContainer">
          <div className="inputs">
            <label>
              Number of Players:
              <input
                type="number"
                inputMode="decimal"
                value={numberOfPlayers}
                onChange={handleChangeNumberOfPlayers}
                max={51}
                min={6}
              />
            </label>
            <label>
              Buy-In ($):
              <input
                type="number"
                inputMode="decimal"
                value={buyIn}
                onChange={handleChangeBuyIn}
              />
            </label>
            <label>
              24/28/29 Fund ($):
              <input
                type="number"
                inputMode="decimal"
                value={fund28}
                onChange={handleChangeFund28}
              />
            </label>
            <label>
              Raffle cut (%):
              <input
                type="number"
                inputMode="decimal"
                value={rafflePct}
                onChange={handleChangeRafflePct}
                step=".01"
              />
            </label>
          </div>
          <div className="presets">
            <label>
              Round payouts:
              <input
                type="checkbox"
                value={roundPayouts}
                onChange={handleChangeRoundPayouts}
              ></input>
            </label>
            <label>
              Presets:
              <select value={presetDay} onChange={handleChangePresetDay}>
                <option name="none">none</option>
                <option name="monday">monday</option>
                <option name="friday">friday</option>
              </select>
            </label>
            <div>
              <img src="cool-spot-waving.gif" height={140} width={200}></img>
            </div>
          </div>
        </div>
        <div className="totalAmounts">
          <div>Total Entry Fees: ${totalEntryFees}</div>
          <div>Raffle Fund: ${raffleFund}</div>
          <div>Cash Payout: ${cashPayout}</div>
          <div>Total Gift Card Amount: ${totalGiftCardAmount}</div>
          <div>
            Players Payed Out: {getNumberOfPayedPlayers(numberOfPlayers)}
          </div>
        </div>
        <PayoutGrid
          cashPayout={cashPayout}
          totalGiftCardAmount={totalGiftCardAmount}
          numberOfPlayers={numberOfPlayers}
          payedPlayers={getNumberOfPayedPlayers(numberOfPlayers)}
          roundPayouts={roundPayouts}
        />
      </div>
    </div>
  );
}

export default App;
