import React from "react"
import HorizontalSection from "./HorizontalSection";
import PlayersInformations from "./PlayersInformation";

export default class Board extends React.Component{
  // constructor(props) {
  //   super(props)
  // }
  render() {
    const classList = ["row", "m-0", "p-0", "w-100", "flex-column", "mainSection", this.props.display ? "d-inline" : "d-none"];
    const sidePrecentLength = 100 / this.props.linesCount;
    const elements = Array();
    for (let i = 0; i < this.props.linesCount; i++) {
      elements.push(<HorizontalSection
        linesCount={this.props.linesCount}
        i={i}
        sidePrecentLength={sidePrecentLength}
        onSquareClick={this.props.onSquareClick}
        horizontalArray={this.props.boardArray[i]}
        key={`section-${i}`}
      />)
    }
    return (
      <div className="collumn w-75">
        <div className={classList.join(" ")}>
          <PlayersInformations
            // display={this.state.displayPlayersInformation}
            player1Name={this.props.player1Name}
            player2Name={this.props.player2Name}
          />
          {elements}
        </div>
      </div>
    )
  }
}