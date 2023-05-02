import React from "react";
import "../ProgressBar.css";

const PartyVotesProgressBar = ({ props }) => {
  console.log(props, "props");

  const sumOverHundred = props[0] + props[1] + props[2] + props[3] > 100;
  console.log(sumOverHundred);
  let party1Votes = props[0] ? props[0] : 0;

  let party2Votes = props[1] ? props[1] : 0;

  let party3Votes = props[2] ? props[2] : 0;

  let party4Votes = props[3] ? props[3] : 0;
  let party5Votes = null;
  let party5Percentage = null;
  let totalVotes = party1Votes + party2Votes + party3Votes + party4Votes;
  if (totalVotes < 100) {
    party5Votes = 100 - parseFloat(totalVotes);

    party5Percentage = (party5Votes / totalVotes) * 100;
  }
  let party1Percentage = (party1Votes / totalVotes) * 100;
  let party2Percentage = (party2Votes / totalVotes) * 100;
  let party3Percentage = (party3Votes / totalVotes) * 100;
  let party4Percentage = (party4Votes / totalVotes) * 100;
  return (
    <div>
      {!sumOverHundred ? (
        <div className="progress-bar">
          {party1Votes ? (
            <div
              className="progress-bar__bar progress-bar--party1"
              style={{ width: `${party1Percentage}%` }}
            >
              {party1Votes % 1 != 0 ? party1Votes.toFixed(2) : party1Votes}%
            </div>
          ) : (
            ""
          )}
          {party2Votes ? (
            <div
              className="progress-bar__bar progress-bar--party2"
              style={{ width: `${party2Percentage}%` }}
            >
              {party2Votes % 1 != 0 ? party2Votes.toFixed(2) : party2Votes}%
            </div>
          ) : (
            ""
          )}
          {party3Votes ? (
            <div
              className="progress-bar__bar progress-bar--party3"
              style={{ width: `${party3Percentage}%` }}
            >
              {party3Votes % 1 != 0 ? party3Votes.toFixed(2) : party3Votes}%
            </div>
          ) : (
            ""
          )}
          {party4Votes ? (
            <div
              className="progress-bar__bar progress-bar--party4"
              style={{ width: `${party4Percentage}%` }}
            >
              {party4Votes % 1 != 0 ? party4Votes.toFixed(2) : party4Votes}%
            </div>
          ) : (
            ""
          )}

          {party5Votes ? (
            <div
              className="progress-bar__bar progress-bar--party5"
              style={{ width: `${party5Percentage}%` }}
            >
              {party5Votes % 1 != 0 ? party5Votes.toFixed(2) : party5Votes}%
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <p>Toplam 100'ü geçmemeli!</p>
      )}
    </div>
  );
};

export default PartyVotesProgressBar;
