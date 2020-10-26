import React from "react"

export default class WaitingPlayer extends React.Component{
  
  render() {
    const classList = ["text-center", this.props.display ? "d-inline" : "d-none"];
    return (
      <h3 className={classList.join(" ")} id="waiting">Waiting for another player</h3>
    );
  }
}