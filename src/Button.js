import React from "react"

export default class Button extends React.Component {
  render() {
    return (
      <button
        id={this.props.buttonId}
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}