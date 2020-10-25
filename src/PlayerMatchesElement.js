import React from "react"
import PTextCenter from "./PTextCenter"

export default class PlayerMatchesElement extends React.Component { 
  render() {
    return (
      <div
        className="row flex-column m-1"
        style={{border: "solid"}}
      >
        <PTextCenter value={this.props.playerName}/>
        <PTextCenter value={this.props.playerWonGamesCount}/>
        <PTextCenter value={this.props.playerGamesCount}/>
      </div>
    )
  }
}