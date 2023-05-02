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
  React.useEffect(() => {
    handleInput();
  }, [inputValues]);
  const handleInput = () => {
    console.log(partyVotes, "partyVotes baj??");

    let tempArr = [...partyVotes];
    tempArr[0] = parseFloat(inputValues[0]);

    tempArr[1] = parseFloat(inputValues[1]);

    tempArr[2] = parseFloat(inputValues[2]);

    tempArr[3] = parseFloat(inputValues[3]);
    setPartyVotes(tempArr);
  };

  return (
    <div>
      <div className="president--list--input">
        <div className="president--card--input">
          <President name={"Recep Tayyip Erdoğan"} photo={"rte"}></President>
          <input
            className="number-input"
            type="number"
            value={inputValues[0]}
            onChange={(event) => {
              let tempArr = [...inputValues];
              tempArr[0] = event.target.value;
              setInputValues(tempArr);
            }}
          ></input>
        </div>

        <div className="president--card--input">
          <President name={"Kemal Kılıçdaroğlu"} photo={"kemal"}></President>
          <input
            className="number-input"
            type="number"
            value={inputValues[1]}
            onChange={(event) => {
              console.log(event.target.value, "event.target.value baj");
              let tempArr = [...inputValues];
              tempArr[1] = event.target.value;
              setInputValues(tempArr);
              console.log(inputValues, "inputValues baj");
            }}
          ></input>
        </div>
        <div className="president--card--input">
          <President name={"Sinan Oğan"} photo={"onan"}></President>
          <input
            className="number-input"
            type="number"
            value={inputValues[2]}
            onChange={(event) => {
              let tempArr = [...inputValues];
              tempArr[2] = event.target.value;
              setInputValues(tempArr);
            }}
          ></input>
        </div>
        <div className="president--card--input">
          <President name={"Muharrem İnce"} photo={"ince"}></President>
          <input
            className="number-input"
            type="number"
            value={inputValues[3]}
            onChange={(event) => {
              let tempArr = [...inputValues];
              tempArr[3] = event.target.value;
              setInputValues(tempArr);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default PresidentVoteList;
