import React, { useState, useCallback } from "react";
import "./App.css";
import PayoutGrid from "./PayoutGrid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(20);
  const [buyIn, setBuyIn] = useState(3);
  const [fund28, setFund28] = useState(8);
  const [rafflePct, setRafflePct] = useState(0.25);
  const [presetDay, setPresetDay] = useState("none");
  const [roundPayouts, setRoundPayouts] = useState(false);
  const [teamsMode, setTeamsMode] = useState(false);
  const [specialHandCount, setSpecialHandCount] = useState(0);
  // const [runningPct, setRunningPct] = useState(0.4);
  // const [offsetPct, setOffsetPct] = useState(0.02);

  const runningPct = 0.4;
  const offsetPct = 0.02;

  const MAX_PAYS = 32;
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

  // const handleChangeRunningPct = (event) => {
  //   setRunningPct(Number(event.target.valueAsNumber));
  // };

  // const handleChangeOffsetPct = (event) => {
  //   setOffsetPct(Number(event.target.valueAsNumber));
  // };

  const handleChangePresetDay = (event) => {
    setPresetDay(event.target.value);
    if (event.target.value === "Wednesday") {
      setBuyIn(5);
      setRafflePct(0.25);
    }
    if (event.target.value === "Monday") {
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
        <div>
          <img
            src="bill-and-dave-adventure.png"
            height={105}
            width={225}
            className="logo"
            alt="logo"
          />
        </div>
        <div className="inputContainer">
          <div className="inputs">
            <TextField
              inputMode="decimal"
              label="Number of Players"
              margin="dense"
              max={500}
              min={6}
              onChange={handleChangeNumberOfPlayers}
              size="small"
              type="number"
              value={numberOfPlayers}
              variant="outlined"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputMode="decimal"
              label="Buy-In"
              margin="dense"
              onChange={handleChangeBuyIn}
              size="small"
              type="number"
              value={buyIn}
              variant="outlined"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputMode="decimal"
              label="24/28/29 Fund"
              margin="dense"
              onChange={handleChangeFund28}
              size="small"
              type="number"
              value={fund28}
              variant="outlined"
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
              inputMode="decimal"
              label="Raffle Cut"
              margin="dense"
              onChange={handleChangeRafflePct}
              size="small"
              inputProps={{
                step: 0.01,
              }}
              type="number"
              value={rafflePct}
              variant="outlined"
            />
          </div>

          <div className="presets">
            <FormControl>
              <InputLabel id="day-preset-label">Day Preset</InputLabel>
              <Select
                labelId="day-preset-label"
                value={presetDay}
                label="Day Preset"
                onChange={handleChangePresetDay}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
              </Select>
            </FormControl>

            <FormGroup row className="switchFormGroup">
              <FormControlLabel
                control={
                  <Switch
                    value={roundPayouts}
                    onChange={handleChangeRoundPayouts}
                  />
                }
                label="Round $1.00"
                labelPlacement="start"
                size="small"
              />
            </FormGroup>

            <FormGroup row className="switchFormGroup">
              <FormControlLabel
                control={
                  <Switch value={teamsMode} onChange={handleChangeTeamsMode} />
                }
                label="Teams"
                labelPlacement="start"
              />
            </FormGroup>
            <TextField
              inputMode="decimal"
              label="Special $5 Hands Payed"
              margin="dense"
              onChange={handleChangeSpecialHandCount}
              size="small"
              type="number"
              value={specialHandCount}
              variant="outlined"
            />
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
          payedPlayers={getNumberOfPayedSides()}
          roundPayouts={roundPayouts}
          teamsMode={teamsMode}
          runningPct={runningPct}
          offsetPct={offsetPct}
        />
      </div>
    </div>
  );
}

export default App;
