import React from "react"

export default class PlayerInformations extends React.Component{
  render() {
    return (
      <div>
        <p>{this.props.value}</p>
      </div>
    )
  }
}