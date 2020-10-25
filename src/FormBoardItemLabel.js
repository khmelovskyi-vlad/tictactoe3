import React from "react"

export default class FormBoardItemLabel extends React.Component{
  render() {
    return (
      <label htmlFor={this.props.for}>
        {this.props.value}
      </label>
    );
  }
}