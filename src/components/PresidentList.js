import React from "react";
import President from "./President";

const PresidentList = ({ setLeader, voteLeader, setOpenPopup }) => {
  const [selected, setSelected] = React.useState(null);

  const handleSelect = (value) => {
    setLeader(() => {
      return value;
    });
    setSelected(value);
    voteLeader(value);
    setOpenPopup(false);
  };
  return (
    <div className="president--list">
      <div onClick={() => handleSelect("rte")}>
        <President
          cssName={"rte"}
          setLeader={setLeader}
          name={"Recep Tayyip Erdoğan"}
          photo={"rte"}
          onClick={() => handleSelect("rte")}
          value={selected}
        ></President>
      </div>

      <div onClick={() => handleSelect("kemal")}>
        <President
          cssName={"kemal"}
          name={"Kemal Kılıçdaroğlu"}
          setLeader={setLeader}
          photo={"kemal"}
          value={selected}
        ></President>
      </div>

      <div onClick={() => handleSelect("ince")}>
        <President
          cssName={"ince"}
          setLeader={setLeader}
          name={"Muharrem İnce"}
          value={selected}
          photo={"ince"}
        ></President>
      </div>

      <div onClick={() => handleSelect("onan")}>
        <President
          cssName={"onan"}
          setLeader={setLeader}
          name={"Sinan Oğan"}
          value={selected}
          photo={"onan"}
        ></President>
      </div>
    </div>
  );
};
export default PresidentList;
