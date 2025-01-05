import React from "react";

const PayoutGrid = ({
  cashPayout,
  totalGiftCardAmount,
  payedPlayers,
  roundPayouts,
  teamsMode,
  runningPct,
  offsetPct,
  cashOnly,
  firstPayMultiplier,
  firstPayAdjustment,
  cardMinimumPay,
  configuredStartingPct,
}) => {
  const calculatedPayMap = {};

  // last player always gets the special cash payout value, so counts look off by 1
  const paysByPayedPlayerCountUpdated = {
    3: {
      1: 0.65,
      2: 0.35,
    },
    4: {
      1: 0.55,
      2: 0.3,
      3: 0.15,
    },
    5: {
      1: 0.48,
      2: 0.27,
      3: 0.15,
      4: 0.1,
    },
    6: {
      1: 0.4,
      2: 0.26,
      3: 0.15,
      4: 0.12,
      5: 0.07,
    },
    7: {
      1: 0.34,
      2: 0.24,
      3: 0.15,
      4: 0.12,
      5: 0.09,
      6: 0.06,
    },
    8: {
      1: 0.29,
      2: 0.22,
      3: 0.15,
      4: 0.12,
      5: 0.09,
      6: 0.08,
      7: 0.05,
    },
    9: {
      1: 0.25,
      2: 0.2,
      3: 0.14,
      4: 0.12,
      5: 0.09,
      6: 0.08,
      7: 0.07,
      8: 0.05,
    },
    10: {
      1: 0.23,
      2: 0.19,
      3: 0.14,
      4: 0.11,
      5: 0.09,
      6: 0.08,
      7: 0.07,
      8: 0.06,
      9: 0.03,
    },
    11: {
      1: 0.22,
      2: 0.19,
      3: 0.14,
      4: 0.11,
      5: 0.09,
      6: 0.08,
      7: 0.07,
      8: 0.06,
      9: 0.03,
      10: 0.02,
    },
    12: {
      1: 0.22,
      2: 0.19,
      3: 0.14,
      4: 0.11,
      5: 0.09,
      6: 0.08,
      7: 0.07,
      8: 0.06,
      9: 0.03,
      10: 0.02,
      11: 0.01,
    },
    13: {
      1: 0.22,
      2: 0.19,
      3: 0.14,
      4: 0.11,
      5: 0.09,
      6: 0.08,
      7: 0.07,
      8: 0.06,
      9: 0.03,
      10: 0.02,
      11: 0.01,
      12: 0.01,
    },
  };

  const getOrdinal = (number) => {
    if (number === 1) {
      return "st";
    }
    if (number === 2) {
      return "nd";
    }
    if (number === 3) {
      return "rd";
    }
    return "th";
  };

  const getIndividualPayout = (place) => {
    const pay = getSidePayout(place);
    if (teamsMode) {
      return pay / 2;
    }
    return pay;
  };

  const calculateDynamicPayouts = () => {
    // const MIN_STARTING_PCT = 0.2;
    const MIN_STARTING_PCT = 0.2;

    // let runningPct = 0.4;
    let runningTotal = totalGiftCardAmount;
    // let offsetPct = 0.02;
    let totalPayed = 0;
    // offsetPct = 0.0;

    let startingPct = MIN_STARTING_PCT;

    if (payedPlayers < 10) {
      startingPct =
        firstPayMultiplier * payedPlayers * payedPlayers -
        firstPayAdjustment * payedPlayers +
        1;
    }

    console.log("startingPct => ", startingPct);
    runningPct = Math.max(startingPct, MIN_STARTING_PCT);

    for (let i = 1; i < payedPlayers; i++) {
      let currentPay = Math.max(runningPct * runningTotal, cardMinimumPay);
      if (roundPayouts) {
        currentPay = Math.round(currentPay.toFixed(2));
      }
      runningTotal = runningTotal - currentPay;
      totalPayed = totalPayed + currentPay;

      calculatedPayMap[i] = currentPay;
      runningPct = runningPct - offsetPct;
    }

    const remainder = totalGiftCardAmount - totalPayed;

    // if we are rounding payouts and the remainder is odd, need to adjust the .50
    // split the remainder between 1st and 2nd?

    const firstRemainderToAdd = Math.round((remainder * 0.66).toFixed(2));
    const secondRemainderToAdd = remainder - firstRemainderToAdd;

    calculatedPayMap[1] = calculatedPayMap[1] + firstRemainderToAdd;
    calculatedPayMap[2] = calculatedPayMap[2] + secondRemainderToAdd;
  };

  const getSidePayout = (place) => {
    if (place === payedPlayers) {
      return cardMinimumPay;
    }

    const paysForCurrentCount = paysByPayedPlayerCountUpdated[payedPlayers];
    if (paysForCurrentCount === undefined) {
      return "error";
    }
    const scalingFactorForCurrentPlace = paysForCurrentCount[place];

    if (roundPayouts) {
      return Math.round(
        (totalGiftCardAmount * scalingFactorForCurrentPlace).toFixed(2)
      );
    }
    // round to nearest dime for teamsmode to split gift cards easier
    return teamsMode
      ? (totalGiftCardAmount * scalingFactorForCurrentPlace).toFixed(1)
      : (totalGiftCardAmount * scalingFactorForCurrentPlace).toFixed(2);
  };

  calculateDynamicPayouts();

  const placePayoutRows = [];
  for (let i = 1; i <= payedPlayers; i++) {
    const sidePayout = getSidePayout(i);
    const calculatedPayoutDisplay =
      calculatedPayMap[i] !== undefined
        ? calculatedPayMap[i].toFixed(2)
        : cashPayout.toFixed(2);

    placePayoutRows.push(
      <tr key={i} className={i % 2 === 0 ? "even-row" : "odd-row"}>
        <td>
          {i}
          {getOrdinal(i)}
        </td>
        <td>
          $ {Number(sidePayout).toFixed(2)}
          {payedPlayers === i && !cashOnly && " (cash)"}
        </td>
        <td>
          $ {calculatedPayoutDisplay}
          {payedPlayers === i && !cashOnly && " (cash)"}
        </td>
        {teamsMode && (
          <td>
            $ {getIndividualPayout(i)}
            {payedPlayers === i && !cashOnly && " (cash)"}
          </td>
        )}
      </tr>
    );
  }

  return (
    <div className="grid-container">
      <table className="place-payout-table">
        <thead>
          <tr>
            <th>Place {teamsMode && "(Team)"}</th>
            <th>Payout {teamsMode && "Per Team"}</th>
            <th>Dynamic Payout</th>
            {teamsMode && <th>Payout Per Player</th>}
          </tr>
        </thead>
        <tbody>{placePayoutRows}</tbody>
      </table>
    </div>
  );
};

export default PayoutGrid;
