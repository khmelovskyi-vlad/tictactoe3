import React from "react"

export default class XOImg extends React.Component{
  render() {
    return (
      <img
        src={this.props.src}
        style={{ width: "100%" }}
      >

      </img>
    );
  };
}