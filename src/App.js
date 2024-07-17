import React, { useState, useCallback } from "react";
import "./App.css";
import PayoutGrid from "./PayoutGrid";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(20);
  const [buyIn, setBuyIn] = useState(3);
  const [cashPayout, setCashPayout] = useState(3);
  const [fund28, setFund28] = useState(8);

  const handleChangeNumberOfPlayers = (event) => {
    setNumberOfPlayers(Number(event.target.valueAsNumber));
  };

  const handleChangeBuyIn = (event) => {
    setBuyIn(Number(event.target.valueAsNumber));
  };

  const handleChangeCashPayout = (event) => {
    setCashPayout(Number(event.target.valueAsNumber));
  };

  const handleChangeFund28 = (event) => {
    setFund28(Number(event.target.valueAsNumber));
  };

  const getNumberOfPayedPlayers = useCallback((totalPlayerCount) => {
    return Math.max(Math.min(Math.floor(totalPlayerCount / 5), 10), 3);
  }, []);

  const totalEntryFees = numberOfPlayers * buyIn;
  const raffleFund = numberOfPlayers * 0.25;
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
              max={50}
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
            Cash Payout ($):
            <input
              type="number"
              inputmode="decimal"
              value={cashPayout}
              onChange={handleChangeCashPayout}
            />
          </label>
          <label>
            28/29 Fund ($):
            <input
              type="number"
              inputmode="decimal"
              value={fund28}
              onChange={handleChangeFund28}
            />
          </label>
        </div>
        <div className="totalAmounts">
          <div>Total Entry Fees: ${totalEntryFees}</div>
          <div>Raffle Fund: ${raffleFund}</div>
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
