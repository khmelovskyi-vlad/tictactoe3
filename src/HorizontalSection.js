import React from "react"
import Square from "./Square"

export default class HorizontalSection extends React.Component{
  render() {
    const elements = Array();
    for (let j = 0; j < this.props.linesCount; j++) {
        elements.push(
          <Square sidePrecentLength={this.props.sidePrecentLength}
            i={this.props.i}
            j={j}
            onClick={this.props.onSquareClick}
            key={`${this.props.i}-${j}`}
            xoElement={this.props.horizontalArray[j]}
          />
        )
      }
    return (
      <div className="row w-100 m-0 p-0 flex-nowrap">
        {elements}
      </div>
    );
  };
}