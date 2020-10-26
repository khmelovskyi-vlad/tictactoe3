import React from "react"
import PlayerInformations from "./PlayerInformations"

export default class PlayersInformations extends React.Component{
  render() {
    const classList = ["row", "flex-column", "playersInformation", "m-3", "p-3"]
    return (
      <div className={classList.join(" ")}
        style={{ border: "solid", borderRadius: "20px" }}>
        <PlayerInformations value={`Player1 name: ${this.props.player1Name}`}/>
        <PlayerInformations value={`Player2 name: ${this.props.player2Name}`}/>
      </div>
    )
  }
}