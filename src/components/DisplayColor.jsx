import React from "react";
import "../styles/DisplayColor.css";

export default function DisplayColor({ color }) {
  return (
    <div className="display-color" style={{ backgroundColor: color }}></div>
  );
}
