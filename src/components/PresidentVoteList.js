import React from "react";
import President from "./President";

import "../Input.css";
const PresidentVoteList = ({ setPartyVotes, partyVotes }) => {
  const [inputValues, setInputValues] = React.useState([
    partyVotes[0],
    partyVotes[1],
    partyVotes[2],
    partyVotes[3],
  ]);
  const handleInput = () => {
    let tempArr = [...partyVotes];
    tempArr[0] = parseFloat(inputValues[0]);

    tempArr[1] = parseFloat(inputValues[1]);

    tempArr[2] = parseFloat(inputValues[2]);

    tempArr[3] = parseFloat(inputValues[3]);
    setPartyVotes(tempArr);
  };
  React.useEffect(() => {
    handleInput();
  }, [inputValues]);
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };
  return (
    <div>
      <div className="president--list--input">
        <div className="president--card--input">
          <President name={"Recep Tayyip Erdoğan"} photo={"rte"}></President>
          <input
            className="number-input"
            type="number"
            min="0"
            value={inputValues[0]}
            onChange={(event) => {
              let val = parseFloat(event.target.value);
              if (isNaN(val)) {
                let tempArr = [...inputValues];
                tempArr[0] = event.target.value;
                setInputValues(tempArr);
              } else {
                if (val !== NaN && val < 0) val = 0;
                let tempArr = [...inputValues];
                tempArr[0] = val;
                setInputValues(tempArr);
              }
            }}
          ></input>
        </div>

        <div className="president--card--input">
          <President name={"Kemal Kılıçdaroğlu"} photo={"kemal"}></President>
          <input
            className="number-input"
            type="number"
            min="0"
            value={inputValues[1]}
            onChange={(event) => {
              let val = parseFloat(event.target.value);
              if (isNaN(val)) {
                let tempArr = [...inputValues];
                tempArr[1] = event.target.value;
                setInputValues(tempArr);
              } else {
                if (val !== NaN && val < 0) val = 0;
                let tempArr = [...inputValues];
                tempArr[1] = val;
                setInputValues(tempArr);
              }
            }}
          ></input>
        </div>
        <div className="president--card--input">
          <President name={"Muharrem İnce"} photo={"ince"}></President>
          <input
            className="number-input"
            type="number"
            step="any"
            value={inputValues[2]}
            onChange={(event) => {
              let val = parseFloat(event.target.value);
              if (isNaN(val)) {
                let tempArr = [...inputValues];
                tempArr[2] = event.target.value;
                setInputValues(tempArr);
              } else {
                if (val !== NaN && val < 0) val = 0;
                let tempArr = [...inputValues];
                tempArr[2] = val;
                setInputValues(tempArr);
              }
            }}
          ></input>
        </div>
        <div className="president--card--input">
          <President name={"Sinan Oğan"} photo={"onan"}></President>
          <input
            className="number-input"
            type="number"
            min="0"
            onkeydown={preventMinus}
            value={inputValues[3]}
            onChange={(event) => {
              let val = parseFloat(event.target.value);
              if (isNaN(val)) {
                let tempArr = [...inputValues];
                tempArr[3] = event.target.value;
                setInputValues(tempArr);
              } else {
                if (val !== NaN && val < 0) val = 0;
                let tempArr = [...inputValues];
                tempArr[3] = val;
                setInputValues(tempArr);
              }
            }}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default PresidentVoteList;
