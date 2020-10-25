import React from "react"

export default class PTextCenter extends React.Component { 
  render() {
    return (
      <p className="text-center">
        {this.props.value}
      </p>
    )
  }
}