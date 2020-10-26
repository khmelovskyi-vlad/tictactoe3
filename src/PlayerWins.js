import React from "react"
import Input from "./Input"
import PlayerMatchesElement from "./PlayerMatchesElement"

export default class PlayerWins extends React.Component{
  render() {
    const classList = ["row", "flex-column", "m-3", "p-3", this.props.display ? "d-inline" : "d-none"]
    let counter = 0;
    const playerMatchesElements = this.props.playerMatches === null ? [] : this.props.playerMatches.map(
      playerMatches => <PlayerMatchesElement
        playerName={playerMatches.name}
        playerWonGamesCount={playerMatches.gamesCount}
        playerGamesCount={playerMatches.wonGamesCount}
        key={counter++}/>);
    return (
      <div className={classList.join(" ")}>
        {playerMatchesElements}
        <Input type="submit" class="m-1" value="back" id="playersWinsBack" onClick={this.props.onClick}/>
      </div>
    )
  }
}