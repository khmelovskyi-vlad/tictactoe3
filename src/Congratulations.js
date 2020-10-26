import React from "react"
import DontTouch from "./DontTouch";
import PTextCenter from "./PTextCenter";

export default class Congratulations extends React.Component{
  render() {
    const classList = ["row", "flex-column", "congratulations", "m-3", "p-3", this.props.display ? "d-inline" : "d-none"]
    return (
      <div className={classList.join(" ")}
        style={{ border: "solid", borderRadius: "20px" }}>
        <PTextCenter value={`Player ${this.props.wonPlayerName} won`}/>
        <PTextCenter value="CONGRATULATIONS!!"/>
        <DontTouch onClickContinuePlay={this.props.onClickContinuePlay} onClickNewGame={this.props.onClickNewGame}/>
      </div>
    )
  }
}