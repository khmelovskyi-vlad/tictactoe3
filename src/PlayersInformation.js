import React from "react"

export default class PlayersInformations extends React.Component{
  render() {
    const classList = ["row", "flex-column", "playersInformation", "m-3", "p-3", this.props.display ? "d-inline" : "d-none"]
    return (
      <div className={classList.join(" ")}
        style={{ border: "solid", borderRadius: "20px" }}>
      </div>
    )
  }
}