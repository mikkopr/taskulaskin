
import { useState } from "react";

const CalcButton = (props) => {
    return (
      <div>
        <button className="calc-button" onClick={() => props.calcButtonPressed(props.calcButton)} >{props.calcButton}</button>
      </div>
    );
};

export default CalcButton;
