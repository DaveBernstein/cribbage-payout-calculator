import React, { useState, useCallback } from "react";
import "./App.css";
import PayoutGrid from "./PayoutGrid";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(20);
  const [buyIn, setBuyIn] = useState(3);
  const [fund28, setFund28] = useState(8);
  const [rafflePct, setRafflePct] = useState(0.25);
  const [presetDay, setPresetDay] = useState("none");
  const [roundPayouts, setRoundPayouts] = useState(false);
  const [teamsMode, setTeamsMode] = useState(false);
  const [specialHandCount, setSpecialHandCount] = useState(0);

  const MAX_PAYS = 12;
  const MIN_PAYS = 3;
  const TEAM_SIZE = 2;
  const SPECIAL_HAND_PAY = 5;

  const handleChangeNumberOfPlayers = (event) => {
    setNumberOfPlayers(Number(event.target.valueAsNumber));
  };

  const handleChangeBuyIn = (event) => {
    setBuyIn(Number(event.target.valueAsNumber));
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

  const handleChangeTeamsMode = (event) => {
    setTeamsMode(event.target.checked);
  };

  const handleChangeSpecialHandCount = (event) => {
    setSpecialHandCount(Number(event.target.valueAsNumber));
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

  const getNumberOfPayedSides = useCallback(() => {
    let payedPlayers = Math.max(
      Math.min(Math.floor(numberOfPlayers / 4) + 1, MAX_PAYS),
      MIN_PAYS
    );
    if (teamsMode) {
      const roundToEvenPlayers = 2 * Math.round(payedPlayers / 2);
      return roundToEvenPlayers / TEAM_SIZE;
    }
    return payedPlayers;
  }, [numberOfPlayers, teamsMode]);

  const totalEntryFees = numberOfPlayers * buyIn;
  const raffleFund = Math.round(numberOfPlayers * rafflePct);
  const cashPayout = teamsMode ? buyIn * TEAM_SIZE : buyIn;
  const specialHandPayout = specialHandCount * SPECIAL_HAND_PAY;
  const totalGiftCardAmount =
    totalEntryFees - cashPayout - raffleFund - fund28 - specialHandPayout;

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
              Teams?:
              <input
                type="checkbox"
                value={teamsMode}
                onChange={handleChangeTeamsMode}
              ></input>
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
            <label>
              Special $5 Hands Payed:
              <input
                type="number"
                inputMode="decimal"
                value={specialHandCount}
                onChange={handleChangeSpecialHandCount}
                step="1"
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
              <img
                src="bill-and-dave-adventure.png"
                height={70}
                width={150}
                className="logo"
                alt="logo"
              />
            </div>
          </div>
        </div>
        <div className="totalAmounts">
          <div>Total Entry Fees: ${totalEntryFees}</div>
          <div>Raffle Fund: ${raffleFund}</div>
          <div>
            Special Hands Payed: {specialHandCount} ($
            {specialHandPayout})
          </div>
          <div>Cash Payout: ${cashPayout}</div>
          <div>Total Gift Card Amount: ${totalGiftCardAmount}</div>
          <div>
            {teamsMode
              ? `Teams Payed Out: ${getNumberOfPayedSides()} (${
                  getNumberOfPayedSides() * TEAM_SIZE
                } individual players)`
              : `Players Payed Out:  ${getNumberOfPayedSides()}`}
          </div>
        </div>
        <PayoutGrid
          cashPayout={cashPayout}
          totalGiftCardAmount={totalGiftCardAmount}
          numberOfPlayers={numberOfPlayers}
          payedPlayers={getNumberOfPayedSides()}
          roundPayouts={roundPayouts}
          teamsMode={teamsMode}
        />
      </div>
    </div>
  );
}

export default App;
