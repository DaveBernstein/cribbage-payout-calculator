import React, { useState, useCallback, useEffect } from "react";
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
  const [rafflePct, setRafflePct] = useState(0.25);
  const [presetDay, setPresetDay] = useState("none");
  const [roundPayouts, setRoundPayouts] = useState(true);
  const [teamsMode, setTeamsMode] = useState(false);
  const [cashOnlyMode, setCashOnlyMode] = useState(false);

  const [minimumPay, setCardMinimumPay] = useState(5);
  const [cashMinimum, setCashMinimum] = useState(0);

  const [offsetPct] = useState(0.0);
  const [firstPayMultiplier] = useState(0.006);
  const [firstPayAdjustment] = useState(0.14);

  const [skim, setSkim] = useState(5);

  // const [startingPct, setStartingPct] = useState(0.2);

  const runningPct = 0.4;
  // const offsetPct = 0.02;

  const MAX_PAYS = 32;
  const MIN_PAYS = 3;
  const TEAM_SIZE = 2;

  // const handleChangeStartingPct = (event) => {
  //   setStartingPct(Number(event.target.valueAsNumber));
  // };

  const handleChangeNumberOfPlayers = (event) => {
    setNumberOfPlayers(Number(event.target.valueAsNumber));
  };

  const handleChangeBuyIn = (event) => {
    setBuyIn(Number(event.target.valueAsNumber));
  };

  const handleChangeSkim = (event) => {
    setSkim(Number(event.target.valueAsNumber));
  };

  const handleChangeRafflePct = (event) => {
    setRafflePct(Number(event.target.valueAsNumber));
  };

  // const handleChangeRoundPayouts = (event) => {
  //   setRoundPayouts(event.target.checked);
  // };

  const handleChangeTeamsMode = (event) => {
    setTeamsMode(event.target.checked);
  };

  const handleChangeCashOnlyMode = (event) => {
    setCashOnlyMode(event.target.checked);
  };

  const handleChangeCardMinimumPay = (event) => {
    setCardMinimumPay(Number(event.target.valueAsNumber));
  };

  const updateMinimumDefaults = useCallback(() => {
    if (cashOnlyMode) {
      setCardMinimumPay(0);
      setCashMinimum(buyIn);
    } else {
      setCardMinimumPay(buyIn + 3);
      setCashMinimum(buyIn);
    }
  }, [cashOnlyMode, buyIn]);

  useEffect(() => {
    updateMinimumDefaults();
  }, [buyIn, updateMinimumDefaults]);

  useEffect(() => {
    updateMinimumDefaults();
  }, [cashOnlyMode, updateMinimumDefaults]);

  const handleChangePresetDay = (event) => {
    setPresetDay(event.target.value);
    if (event.target.value === "ACC") {
      setBuyIn(15);
      setRafflePct(0);
      setRoundPayouts(true);
      setCashOnlyMode(true);
    }
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
    if (cashOnlyMode) {
      payedPlayers = payedPlayers - 1;
    }

    if (teamsMode) {
      const roundToEvenPlayers = 2 * Math.round(payedPlayers / 2);
      return roundToEvenPlayers / TEAM_SIZE;
    }
    return payedPlayers;
  }, [numberOfPlayers, teamsMode, cashOnlyMode]);

  const totalEntryFees = numberOfPlayers * buyIn;
  const raffleFund = Math.round(numberOfPlayers * rafflePct);
  const cashPayout = teamsMode ? cashMinimum * TEAM_SIZE : cashMinimum;
  const totalGiftCardAmount = totalEntryFees - cashPayout - raffleFund - skim;
  const totalPayout = totalEntryFees - raffleFund - skim;

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
              label="Skim"
              margin="dense"
              onChange={handleChangeSkim}
              size="small"
              type="number"
              value={skim}
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
            {!cashOnlyMode && (
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                inputMode="decimal"
                label="Minimum Payout (card)"
                margin="dense"
                onChange={handleChangeCardMinimumPay}
                size="small"
                inputProps={{
                  step: 1,
                }}
                type="number"
                value={minimumPay}
                variant="outlined"
              />
            )}
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
                <MenuItem value="ACC">ACC</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
              </Select>
            </FormControl>

            {/* <FormGroup row className="switchFormGroup">
              <FormControlLabel
                control={
                  <Switch
                    checked={roundPayouts}
                    value={roundPayouts}
                    onChange={handleChangeRoundPayouts}
                  />
                }
                label="Round $1.00"
                labelPlacement="start"
                size="small"
              />
            </FormGroup> */}

            <FormGroup row className="switchFormGroup">
              <FormControlLabel
                control={
                  <Switch value={teamsMode} onChange={handleChangeTeamsMode} />
                }
                label="Teams"
                labelPlacement="start"
              />
            </FormGroup>

            <FormGroup row className="switchFormGroup">
              <FormControlLabel
                control={
                  <Switch
                    checked={cashOnlyMode}
                    value={cashOnlyMode}
                    onChange={handleChangeCashOnlyMode}
                  />
                }
                label="Cash Only"
                labelPlacement="start"
              />
            </FormGroup>
            {/* <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
              inputMode="decimal"
              label="StartingPct"
              margin="dense"
              onChange={handleChangeStartingPct}
              size="small"
              inputProps={{
                step: 0.01,
              }}
              type="number"
              value={startingPct}
              variant="outlined"
            /> */}
          </div>
        </div>
        <div className="totalAmounts">
          <div>Total Entry Fees: ${totalEntryFees}</div>
          <div>Raffle Fund: ${raffleFund}</div>
          <div>Skim: ${skim}</div>
          <div>Total Payout: ${totalPayout}</div>
          {!cashOnlyMode && <div>Cash Payout: ${cashPayout}</div>}
          {!cashOnlyMode && (
            <>
              <div>Total Gift Card Amount: ${totalGiftCardAmount}</div>
            </>
          )}
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
          cashOnly={cashOnlyMode}
          firstPayMultiplier={firstPayMultiplier}
          firstPayAdjustment={firstPayAdjustment}
          cardMinimumPay={minimumPay}
          // configuredStartingPct={startingPct}
        />
      </div>
    </div>
  );
}

export default App;
