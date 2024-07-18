import React from "react";

const PayoutGrid = ({
  cashPayout,
  totalGiftCardAmount,
  numberOfPlayers,
  payedPlayers,
}) => {
  // last player always gets the special cash payout value, so counts look off by 1
  const paysByPayedPlayerCount = {
    3: {
      1: 0.65,
      2: 0.35,
    },
    4: {
      1: 0.55,
      2: 0.3,
      3: 0.14,
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
  };

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
    if (place === payedPlayers) {
      return `${cashPayout}(cash)`;
    }

    const paysForCurrentCount = paysByPayedPlayerCountUpdated[payedPlayers];
    const scalingFactorForCurrentPlace = paysForCurrentCount[place];

    return (totalGiftCardAmount * scalingFactorForCurrentPlace).toFixed(2);
  };

  const placePayoutRows = [];
  console.log("payedPlayers => ", payedPlayers);
  for (let i = 1; i <= payedPlayers; i++) {
    placePayoutRows.push(
      <tr key={i} className={i % 2 === 0 ? "even-row" : "odd-row"}>
        <td>
          {i}
          {getOrdinal(i)}
        </td>
        <td>$ {getIndividualPayout(i)}</td>
      </tr>
    );
  }

  return (
    <div className="grid-container">
      <table className="place-payout-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Payout</th>
          </tr>
        </thead>
        <tbody>{placePayoutRows}</tbody>
      </table>
    </div>
  );
};

export default PayoutGrid;
