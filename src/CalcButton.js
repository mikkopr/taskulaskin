
import { useState } from "react";

const CalcButton = (props) => {
    return (
      <div className={props.className}>
        <button className={props.className} onClick={() => props.calcButtonPressed(props.calcButton)} >{props.calcButton}</button>
      </div>
    );
};

export default CalcButton;
