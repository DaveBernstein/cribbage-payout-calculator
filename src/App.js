import React, { useState, useCallback } from "react";
import "./App.css";
import PayoutGrid from "./PayoutGrid";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(20);
  const [buyIn, setBuyIn] = useState(3);
  const [cashPayout, setCashPayout] = useState(3);
  const [fund28, setFund28] = useState(8);
  const [rafflePct, setRafflePct] = useState(0.25);

  const MAX_PAYS = 12;

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

  const getNumberOfPayedPlayers = useCallback((totalPlayerCount) => {
    return Math.max(Math.min(Math.floor(totalPlayerCount / 4) + 1, 13), 3);
  }, []);

  const totalEntryFees = numberOfPlayers * buyIn;
  const raffleFund = Math.round(numberOfPlayers * rafflePct);
  const totalGiftCardAmount = totalEntryFees - cashPayout - raffleFund - fund28;

  return (
    <div className="App">
      <div className="main-content">
        <h1>Cribbage Payout Calculator</h1>
        <div className="inputs">
          <label>
            Number of Players:
            <input
              type="number"
              inputmode="decimal"
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
              inputmode="decimal"
              value={buyIn}
              onChange={handleChangeBuyIn}
            />
          </label>
          <label>
            24/28/29 Fund ($):
            <input
              type="number"
              inputmode="decimal"
              value={fund28}
              onChange={handleChangeFund28}
            />
          </label>
          <label>
            Raffle cut (%):
            <input
              type="number"
              inputmode="decimal"
              value={rafflePct}
              onChange={handleChangeRafflePct}
              step=".01"
            />
          </label>
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
        />
      </div>
    </div>
  );
}

export default App;
