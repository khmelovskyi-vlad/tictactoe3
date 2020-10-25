import React from "react"

export default class Board extends React.Component{
  // constructor(props) {
  //   super(props)
  // }
  render() {
    const classList = ["row", "m-0", "p-0", "w-100", "flex-column", "mainSection", this.props.display ? "d-inline" : "d-none"];
    return (
      <div className="collumn w-75">
        <div className={classList.join(" ")}>
        </div>
      </div>
    )
  }
}