import "../President.css";
import { useState } from "react";
const President = ({ name, color, photo, setLeader, cssName, value }) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`president${
        value === cssName ? " " + cssName + "--selected" : ""
      } ${hovered ? cssName : ""}`}
    >
      <img src={`/${photo}.png`}></img>
      <h4>{name}</h4>
    </div>
  );
};
export default President;
